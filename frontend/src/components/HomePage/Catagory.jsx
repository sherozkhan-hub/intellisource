import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Catagory = () => {

  return (
    <>
      <div className="w-full mb-5 max-w-sm p-4 bg-[#e5e7eb] rounded-xl shadow sm:p-4 sm:py-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="heading flex justify-between">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            Categories
          </h5>
          <Link to={`/all-category`} className="text-blue-700 font-bold" >
            View all
          </Link>
        </div>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Connect with one of our available wallet providers or create a new
          one.
        </p>
        <div className=" mt-6 mx-[4px] flex justify-between flex-wrap">
          <Link
            className="px-4 py-3 rounded-xl hover:bg-gray-100 bg-white text-sm font-semibold mb-4"
            to={`/category/Life`}
          >
            Life
          </Link>
          <Link
            className="px-4 py-3 rounded-xl hover:bg-gray-100 bg-white text-sm font-semibold mb-4"
            to="/category/Work"
          >
            Work
          </Link>
          <Link
            className="px-4 py-3 rounded-xl hover:bg-gray-100 bg-white text-sm font-semibold mb-4"
            to={`/category/Technology`}
          >
            Technology
          </Link>
          <Link
            className="px-4 py-3 rounded-xl hover:bg-gray-100 bg-white text-sm font-semibold mb-4"
            to={`/category/Media`}
          >
            Media
          </Link>
          <Link
            className="px-4 py-3 rounded-xl hover:bg-gray-100 bg-white text-sm font-semibold mb-4"
            to="/category/Society"
          >
            Society
          </Link>
          <Link
            className="px-4 py-3 rounded-xl hover:bg-gray-100 bg-white text-sm font-semibold mb-4"
            to="/category/Culture"
          >
            Culture
          </Link>
          <Link
            className="px-4 py-3 rounded-xl hover:bg-gray-100 bg-white text-sm font-semibold mb-4"
            to="/category/World"
          >
            World
          </Link>
          <Link
            className="px-4 py-3 rounded-xl hover:bg-gray-100 bg-white text-sm font-semibold mb-4"
            to="/category/Art"
          >
            Art
          </Link>
          <Link
            className="px-4 py-3 rounded-xl hover:bg-gray-100 bg-white text-sm font-semibold mb-4"
            to={`/category/Self Improvement`}
          >
            Self Improvement
          </Link>
          <Link
            className="px-4 py-3 rounded-xl hover:bg-gray-100 bg-white text-sm font-semibold mb-4"
            to="/category/Marketing"
          >
            Marketing
          </Link>
          
        </div>
      </div>
    </>
  );
};

export default Catagory;
