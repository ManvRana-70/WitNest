import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components'
import { useSelector } from 'react-redux'
import { signupPrompt, nothingFound } from '../assets'


function Home() {
    const authStatus = useSelector((state) => state.auth.status);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (authStatus) {
            service.getPosts().then((posts) => {
                if (posts) setPosts(posts.documents)
            })
        }
    }, [])

    if (!authStatus) {
        return (
            <div className='wfull py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full flex flex-wrap justify-center justify-items-center'>
                            <div className='text-left w-1/2'>
                                <h1 className='text-6xl font-bold'>
                                    Unlock the Good Stuff
                                </h1>
                                <p className='text-xl items-start py-4'>
                                    Looks like you’ve landed in a spot that’s brimming with great content, but there’s one tiny catch — you need an account to unlock the full experience. Signing up is quick, easy, and totally worth it. Think of it as getting the VIP pass to all the wit, wisdom, and stories we’ve carefully crafted just for you.

                                    Already part of the journey? Awesome! Just log in to keep diving deep into the blogs and enjoy every bit of the adventure. Your seat’s saved, and the good stuff is waiting right where you left off.


                                </p>
                            </div>
                            <img src={signupPrompt} alt="signup" />
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else if (posts.length <= 0) {
        return (
            <div className=''>
                <Container>
                    <div className='flex flex-wrap justify-center'>
                        <img src={nothingFound} alt="" className='w-200px' />
                        <div className='text-left w-1/2 inline-block align-middle' >
                            <h1 className='text-6xl font-bold'>Oops!</h1>
                            <p className='text-xl p-4'>
                                We do not have any content to show you at the moment! Engineers are working to fix this problem. meanwhile go ahead and make some of your own content. because why not ?
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <Container>
            <div className='flex flex-wrap w-full py-8'>
                {posts.map((post) => (
                    <div key={post.$id} className='w-1/4 p-2'>
                        <Postcard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default Home