import React from 'react'
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function LogoutBtn({
  className = 'inline-block px-6 py-2 duration-200 hover:bg-[#C5EDAC] rounded-full'
}) {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate('/signup')

    })
  }
  return (
    <button className={className}
      onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn