import React, { useEffect, useState } from "react";
import PostCard from "../../components/BlogCard/PostCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Recommend = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/recommend?userId=${currentUser._id}`);
        const data = await res.json();
        console.log(data, "recommend");

        if (res.ok) {
          // Fetch author details for each post
          const postsWithAuthors = await Promise.all(
            data.map(async (post) => {
              const authorRes = await fetch(`/api/user/${post.userId}`);
              const authorData = await authorRes.json();
              post.author = authorData;
              return post;
            })
          );
          console.log(postsWithAuthors, "recommend posts");
          setPosts(postsWithAuthors);
        } else {
          throw new Error(data.message || "Failed to fetch posts");
        }
      } catch (error) {
        setError(error.message);
        console.log("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && currentUser._id) {
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <>
      <div className="homepage flex justify-center bg-gray-100">
        <div className="lg:container mx-auto py-8 p-2">
          {/* recommd articles */}
          <div className="latest-articles py-10 flex justify-between">
            <div className="left w-full py-4 p-2">
              <h2 className="text-5xl font-bold mb-3">Recommended articles</h2>
              <p className="text-gray-600 font-semibold text-lg mb-5">
                Discover over 100 topics
              </p>
              {error && <p className="text-red-500">{error}</p>}
              {loading ? (
                <p>Loading posts...</p>
              ) : (
                <div className="articles flex gap-8 flex-wrap py-6">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="w-80  bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="relative">
                        <Link to={`/post/${post._id}`}>
                          <div className="">
                            <img
                              className="w-80 h-52 rounded-t-lg"
                              src={post.image}
                              alt={post.title}
                            />
                            {/* <span className="p-2 bg-white text-black font-semibold text-xs rounded-xl absolute top-2 left-2">
                              {post.category}
                            </span> */}
                          </div>
                        </Link>
                      </div>
                      <div className="p-3 rounded-xl ">
                        <div className="about-auther mb-1 flex gap-3 items-center ">
                          <div className="picture w-10">
                            <img
                              className="rounded-full"
                              src={post.author.profilePicture}
                              alt={post.author.username}
                            />
                          </div>
                          <div>
                            <p className="font-semibold">
                              {post.author.username}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Link to={`/post-page/${post._id}`}>
                          <h5 className="mb-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                            {post.title}
                          </h5>
                        </Link>
                        <Link
                          to={`/post-page/${post._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Read more
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommend;
