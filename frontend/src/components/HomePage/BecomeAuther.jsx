import React from "react";
import { Link } from "react-router-dom";

const BecomeAuther = () => {
  return (
    <>
      <div className="wrapper flex px-4">
        <div className="info flex justify-center items-center  p-2 w-full">
          <div className="content px-14">
            <p className="text-lg font-semibold text-gray-500 mb-3">
              SUPPER CHANGE YOUR PLANNING POWERS
            </p>
            <h2 className="text-4xl mb-5 font-semibold">
              Become an author and share your great stories
            </h2>
            <p className="font-semibold text-gray-500 mb-5">
              Become an author you can earn extra income by writing articles.
              Read and share new perspectives on just about any topic.
              Everyone’s welcome.
            </p>
            <div className="button py-8">
              <Link
                to={"/LOGIN"}
                className="bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold text-white"
              >
                Become an auther
              </Link>
            </div>
          </div>
        </div>
        <div className="image  p-2 w-full">
          <img
            className="w-full"
            src="/assets/images/auther-vector.webp"
            alt="home-img"
          />
        </div>
      </div>
    </>
  );
};

export default BecomeAuther;
