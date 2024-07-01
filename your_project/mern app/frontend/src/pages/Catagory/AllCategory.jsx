import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllCategory = () => {

  return (
    <>
      <div className="wrap-content  text-gray-500  bg-[#f7f8fa] ">
        <div className="container   mx-auto py-2 px-4">
          <div className="content flex text-xs ">
            <Link className="hover:text-blue-600 mr-2" to={'/'}>Home </Link>
            <p> / Collections</p>
          </div>
        </div>
      </div>

      <div className="wrapper p-2">
        <div className="container   mx-auto">
          <div className="down flex flex-wrap  lg:flex-wrap  justify-evenly mb-8  p-2">
            <Link to={`/category/Life`} className="shirts cursor-pointer md:w-[45%] md:h-[45%] lg:w-[30%]  lg:h-[30%] mb-4 overflow-hidden relative">
              <img className="w-full  h-[49vh] hover:scale-110 duration-1000 ease-in-out" src="/assets/images/card1.webp" width={300} height={200} alt="shirts" />
              <div className="info  bg-white absolute rounded-lg 
                         left-0 top-0 bottom-0 right-0 m-auto w-[180px] h-[50px] flex justify-center items-center p-2">
                <h1 className="px-6 py-2 font-semibold">Life</h1>
              </div>
            </Link>
            <Link to={`/category/Work`} className="dress cursor-pointer md:w-[45%]  md:h-[45%] lg:w-[30%]  lg:h-[30%]  mb-4 overflow-hidden relative  ">
              <img className="w-full h-[49vh] hover:scale-110 duration-1000 ease-in-out" src="/assets/images/work1.jpeg" width={300} height={200} alt="dress" />
              <div className="info bg-white absolute rounded-lg 
                         left-0 top-0 bottom-0 right-0 m-auto w-[180px] h-[50px] flex justify-center items-center p-2">
                <h1 className="px-6 py-2 font-semibold">Work</h1>
              </div>
            </Link>
            <Link to={`/category/Technology`} className="dress cursor-pointer md:w-[45%] md:h-[45%] lg:w-[30%]  lg:h-[30%] mb-4 overflow-hidden relative  ">
              <img className="w-full h-[49vh] hover:scale-110 duration-1000 ease-in-out" src="/assets/images/technology.jpg" width={300} height={200} alt="dress" />
              <div className="info  bg-white absolute rounded-lg 
                         left-0 top-0 bottom-0 right-0 m-auto w-[180px] h-[50px] flex justify-center items-center p-2">
                <h1 className="px-6 py-2 font-semibold">Technology</h1>
              </div>
            </Link>
            <Link to={`/category/Media`} className="shirts cursor-pointer md:w-[45%] md:h-[45%] lg:w-[30%]  lg:h-[30%] mb-4 overflow-hidden relative ">
              <img className="w-full h-[49vh] hover:scale-110 duration-1000 ease-in-out" src="/assets/images/media.jpg" width={300} height={200} alt="shits" />
              <div className="info  bg-white absolute rounded-lg 
                         left-0 top-0 bottom-0 right-0 m-auto w-[180px] h-[50px] flex justify-center items-center p-2">
                <h1 className="px-6 py-2 font-semibold">Media</h1>
              </div>
            </Link>
            <Link to={`/category/Society`} className="dress cursor-pointer md:w-[45%] md:h-[45%] lg:w-[30%]  lg:h-[30%] mb-4  overflow-hidden relative ">
              <img className="w-full h-[49vh] hover:scale-110 duration-1000 ease-in-out" src="/assets/images/society.webp" width={300} height={200} alt="dress" />
              <div className="info  bg-white absolute rounded-lg 
                         left-0 top-0 bottom-0 right-0 m-auto w-[180px] h-[50px] flex justify-center items-center p-2">
                <h1 className="px-6 py-2 font-semibold">Society</h1>
              </div>
            </Link>
            <Link to={`/category/Culture`} className="dress cursor-pointer md:w-[45%] md:h-[45%] lg:w-[30%]  lg:h-[30%]  mb-4 overflow-hidden relative  ">
              <img className="w-full h-[49vh] hover:scale-110 duration-1000 ease-in-out" src="/assets/images/culture.jpeg" width={300} height={200} alt="dress" />
              <div className="info bg-white  absolute rounded-lg 
                         left-0 top-0 bottom-0 right-0 m-auto w-[180px] h-[50px] flex justify-center items-center p-2">
                <h1 className="px-6 py-2 font-semibold">Culture</h1>
              </div>
            </Link>
            <Link to={`/category/World`} className="dress cursor-pointer md:w-[45%] md:h-[45%] lg:w-[30%]  lg:h-[30%] mb-4  overflow-hidden relative ">
              <img className="w-full h-[49vh] hover:scale-110 duration-1000 ease-in-out" src="/assets/images/world.jpg" width={300} height={200} alt="dress" />
              <div className="info  bg-white absolute rounded-lg 
                         left-0 top-0 bottom-0 right-0 m-auto w-[180px] h-[50px] flex justify-center items-center p-2">
                <h1 className="px-6 py-2 font-semibold">World</h1>
              </div>
            </Link>
           
            <Link to={`/category/Marketing`} className="dress cursor-pointer md:w-[45%] md:h-[45%] lg:w-[30%]  lg:h-[30%] mb-4  overflow-hidden relative ">
              <img className="w-full h-[49vh] hover:scale-110 duration-1000 ease-in-out" src="/assets/images/marketing.jpeg" width={300} height={200} alt="dress" />
              <div className="info  bg-white absolute rounded-lg 
                         left-0 top-0 bottom-0 right-0 m-auto w-[180px] h-[50px] flex justify-center items-center p-2">
                <h1 className="px-6 py-2 font-semibold">Marketing</h1>
              </div>
            </Link>
            <Link to={`/category/Art`} className="dress cursor-pointer md:w-[45%] md:h-[45%] lg:w-[30%]  lg:h-[30%]  mb-4 overflow-hidden relative  ">
              <img className="w-full h-[49vh] hover:scale-110 duration-1000 ease-in-out" src="/assets/images/art1.jpeg" width={300} height={200} alt="dress" />
              <div className="info bg-white  absolute rounded-lg 
                         left-0 top-0 bottom-0 right-0 m-auto w-[180px] h-[50px] flex justify-center items-center p-2">
                <h1 className="px-6 py-2 font-semibold">Art</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCategory;