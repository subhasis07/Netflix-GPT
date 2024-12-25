import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video absolute pt-[20%] px-28 text-white bg-gradient-to-r from-gray-950'>
        <h1 className='font-bold text-5xl'>{title}</h1>
        <p className='py-6 text-lg w-1/4'>{overview}</p>

        <div>
            <button className='bg-white text-black p-4 px-12 text-xl hover:bg-opacity-50 rounded-lg'>
                ▶Play
            </button>

            <button className='bg-gray-500 text-white mx-2 p-4 px-12 text-xl bg-opacity-50 rounded-lg'>
                ℹ More Info
            </button>
        </div>
    </div>
  )
}

export default VideoTitle