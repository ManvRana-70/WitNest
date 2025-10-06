import React, { useEffect, useState } from 'react'
import { Container, Postcard } from '../components'
import service from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        service.getPosts().then((cards) => {
            if (cards) {
                setPosts(cards.documents)
            }
        })
    }, [])



    return (
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default AllPosts