import './App.css'
import {useDispatch} from 'react-redux'
import authService from "./appwrite/auth"
import { useEffect, useState } from 'react';
import { login, logout } from './store/authSlice';
import {Footer, Header} from './components'
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}));
        }
        else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false))
      }, []);

  return !loading ? 
  (
    <div className='min-h-screen flex flex-wrap content-between bg-[#7A918D]'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) 
  : 
  (
    <div className='min-h-screen flex flex-wrap content-between bg-[#7A918D]'>
    </div>
  )
}

export default App
