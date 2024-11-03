import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <div className="left w-72 p-4">
        <div className="text-xl font-semibold  ">
          {currentUser.role === "admin" && (
            <>
              <Link
                className="flex items-center p-2 py-3 rounded-lg mb-3 bg-slate-300"
                to="/dashboard"
              >
                <span className="icon-user px-4"></span>
                <div className="link text-lg ">Dashboard</div>
              </Link>
              <Link
                className="flex items-center p-2 py-3 rounded-lg mb-3 bg-slate-300"
                to="/users"
              >
                <span className="icon-user px-4"></span>
                <div className="link text-lg">Users</div>
              </Link>
            </>
          )}

          <Link
            className="flex items-center p-2 py-3 rounded-lg mb-3 bg-slate-300"
            to="/profile"
          >
            <span className="icon-user px-4"></span>
            <div className="link text-lg">Profile</div>
          </Link>

          <Link
            className="flex items-center p-2 py-3 rounded-lg mb-3 bg-slate-300"
            to="/comments"
          >
            <span className="icon-user px-4"></span>
            <div className="link text-lg">Comments</div>
          </Link>
          <Link
            className="flex items-center p-2 py-3 rounded-lg mb-3 bg-slate-300"
            to="/create-post"
          >
            <span className="icon-user px-4"></span>
            <div className="link text-lg">Posts</div>
          </Link>
          <Link
            className="flex items-center p-2 py-3 rounded-lg mb-3 bg-slate-300"
            to="/all-post"
          >
            <span className="icon-user px-4"></span>
            <div className="link text-lg">All Posts</div>
          </Link>
          {/* <Link
            className="flex items-center p-2 py-3 rounded-lg mb-3 bg-red-600 text-white"
            to="/"
          >
            <span className="icon-user px-4"></span>
            <div className="link text-lg">Sign Out</div>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
