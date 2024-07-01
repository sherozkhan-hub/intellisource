import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../../components/BlogCard/BlogCard";
import BecomeAuther from "../../components/HomePage/BecomeAuther";
import TrendingTopic from "../../components/HomePage/TrendingTopic";
import PostCard from "../../components/BlogCard/PostCard";

const Category = () => {
  const { Category } = useParams();
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/post/getposts?category=${Category}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch posts");
        }

        setCategory(data.posts);
        setPostCount(data.posts.length);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.log("Error fetching posts:", error.message);
      }
    };

    fetchCategory();
  }, [Category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="banner-image relative">
        <img
          className="h-[60vh] w-full "
          src="/assets/images/tech-banner.webp"
          alt="banner-pic"
        />
        <div className="heading absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center  p-4">
          <div className="after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-black after:opacity-35">
            <h1 className="relative z-10 text-white font-semibold text-7xl mb-5 text-center">
              {Category}
            </h1>
            <p className="relative z-10 text-white font-semibold text-lg mb-2 text-center">
              {postCount} Articles
            </p>
          </div>
        </div>
      </div>
      <div className="blog-list bg-gray-100 py-4">
        <div className="container  p-8 mb-16 mx-auto">
          {/* <div className="buttons px-12 py-4 mb-3 flex justify-between border-2 border-black ">
            <div className="btn">
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-xl  px-6 py-2.5 text-lg text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Articles</button>
              <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-xl  px-6 py-2.5 text-lg me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Favourite</button>
              <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-xl px-6 py-2.5 text-lg text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Saved</button>
            </div>
            <div className="dropdown">
              <button type="button" className="text-white bg-gray-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-xl  px-6 py-2.5 text-lg text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">Most Recents</button>
            </div>
          </div> */}
          <div className="articles flex justify-center gap-8 flex-wrap ">
            {category.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <BecomeAuther />
      </div>
    </>
  );
};

export default Category;
