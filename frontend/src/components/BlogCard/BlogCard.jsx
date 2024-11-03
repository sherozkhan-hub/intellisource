import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  console.log(post);
  return (
    <>
      <div className="w-80 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="relative">
          <Link href="#">
            <div>
              <img
                className="rounded-t-lg "
                src="/assets/images/lady.webp"
                alt="images"
              />
              <span className="p-2 bg-white text-black font-semibold text-xs rounded-xl absolute top-2 left-2">
                Industrial
              </span>
            </div>
          </Link>
        </div>
        <div className="p-2 rounded-xl border-2 border-red-600">
          <div className="about-auther mb-1 flex gap-3 items-center border-2 border-black">
            <div className="picture w-10">
              <img
                className="rounded-full"
                src="/assets/images/auther-img.webp"
                alt=""
              />
            </div>
            <div>
              <p className="item-center font-semibold ">Umar Farooq Amanat</p>
              <p className="text-gray-500 text-sm">May 20, 2024</p>
            </div>
          </div>
          <Link href="#">
            <h5 className="mb-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Lenovo’s smarter devices stoke professional passions
            </h5>
          </Link>
          {/* <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
          <div className="info flex justify-between border-2 border-black mb-2">
            <div className="likes flex gap-2">
              <span className="icon-search font-semibold cursor-pointer  bg-slate-300 px-3 py-2.5 text-sm rounded-xl">
                <span className="mx-1">34</span>
              </span>
              <span className="icon-bell font-semibold cursor-pointer bg-slate-300 px-3 py-2.5 text-sm rounded-xl">
                <span className="mx-1">123</span>
              </span>
            </div>
            <div className="notify p-2 relative">
              <span className="icon-bell font-semibold cursor-pointer bg-slate-300 px-3 py-3 text-sm rounded-xl"></span>
              <div className="notify-down hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] absolute bg-white rounded text-sm px-2 py-[3px] left-[-5px] bottom-[-40px]">
                Notification
              </div>
            </div>
          </div>
          {/* <Link href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link> */}
        </div>
      </div>
    </>
  );
};

export default BlogCard;
