import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function Postcard({ $id, title, featuredImage }) {
    
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full max-w-sm mx-auto bg-white rounded-2xl p-1 py-2 h-60'>
                <div className='relative w-full h-36 overflow-hidden rounded-lg shadow-md'>
                    <img src={service.getFilePreview(featuredImage)} alt="" className='w-full h-full object-cover' />
                </div>
                 <h2 className='mt-4 text-center text-lg font-medium text-gray-800 line-clamp-2'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default Postcard