import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

const Trending = () => {
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=9`);
        const data = await res.json();
        if (res.ok) {
          // Fetch author details for each post
          const postsWithAuthors = await Promise.all(data.posts.map(async (post) => {
            const authorRes = await fetch(`/api/user/${post.userId}`);
            const authorData = await authorRes.json();
            post.author = authorData;
            return post;
          }));
          setRecentPosts(postsWithAuthors);
        }
      } catch (error) {
        console.log('Error fetching recent posts:', error.message);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <>
      <div className="w-full mb-5 max-w-sm p-4 bg-[#e5e7eb] rounded-xl shadow sm:p-4 sm:py-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="heading flex justify-between">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            Recent topics
          </h5>
          {/* <Link className="text-blue-700 font-bold" to="/">
            View all
          </Link> */}
        </div>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Connect with one of our available wallet providers or create a new
          one.
        </p>
        <ul className="my-4 space-y-3">
          {recentPosts &&
            recentPosts.map((post) =>
              <li>
                <Link
                  to={`/post-page/${post._id}`}
                  className="flex items-center p-2 text-base font-bold text-gray-900 rounded-xl bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <div>
                    <img className="w-20 h-16 rounded-xl" src={post.image || post.postId.image} alt="images" />
                  </div>
                  <div className="flex-1 ms-3 line-clamp-2">
                    <p></p>
                    <p>{post.title}</p>
                    <p className="text-sm font-normal">{post.category || post.postId.category}</p>
                  </div>
                  <div className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                    {new Date(post.createdAt || post.postId.createdAt).toLocaleDateString()}
                  </div>
                </Link>
              </li>
            )}


        </ul>
        <div>
          <a
            href="#"
            className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
          >
            <svg
              className="w-3 h-3 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Why do I need to connect with my wallet?
          </a>
        </div>
      </div>
    </>
  );
};

export default Trending;
