import React from 'react'

const TrendingTopic = () => {
    return (
        <>
            <div className="trending relative bg-white mx-1 mb-8 rounded-xl py-6 p-4 w-[260px]">
                <div className="tpoic-pic mb-2 flex justify-center">
                    <img className='rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-4 border-white h-28 w-28' src="/assets/images/topic.webp" alt="home-img" />
                </div>
                <div className="content ">
                    <h2 className='text-xl text-center font-semibold mb-2'>Automotive</h2>
                    <p className='text-center'>134 Articles</p>
                </div>
                <span className='text-blue-700 bg-gray-100 font-semibold px-3 py-2 rounded-xl absolute top-2 left-2'>#1</span>
            </div>
        </>
    )
}

export default TrendingTopic