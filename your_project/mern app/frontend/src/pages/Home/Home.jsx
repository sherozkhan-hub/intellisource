import React, { useEffect, useState } from "react";
import Slider from "../../components/HomePage/Slider";
import PostCard from "../../components/BlogCard/PostCard";
import Trending from "../../components/HomePage/Trending";
import Catagory from "../../components/HomePage/Catagory";
import Authers from "../../components/HomePage/Authers";
import BecomeAuther from "../../components/HomePage/BecomeAuther";
import { useSelector } from "react-redux";
import Recommend from "../../components/Recommend/Recommend";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interests, setInterests] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [userError, setUserError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        if (res.ok) {
          // Fetch author details for each post
          const postsWithAuthors = await Promise.all(
            data.posts.map(async (post) => {
              const authorRes = await fetch(`/api/user/${post.userId}`);
              const authorData = await authorRes.json();
              post.author = authorData;
              return post;
            })
          );
          setPosts(postsWithAuthors);
        }
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch posts");
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.log("Error fetching posts:", error.message);
      }
    };

    const fetchUserInterests = async () => {
      try {
        const res = await fetch(`/api/user/${currentUser._id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch user interests");
        }
        setInterests(data.interests || []);
        setUserLoading(false);
      } catch (error) {
        setUserError(error.message);
        setUserLoading(false);
        console.log("Error fetching user interests:", error.message);
      }
    };

    fetchPosts();
    fetchUserInterests();
  }, [currentUser]);

  return (
    <>
      <Slider />
      <div className="homepage bg-gray-100">
        <div className="lg:container mx-auto py-8 p-2">
          {/* User interests */}
          {currentUser ? (
            <div className="user-interests mb-10">
              <h2 className="text-3xl font-bold mb-3">Your Interests</h2>
              {userError && <p className="text-red-500">{userError}</p>}
              {userLoading ? (
                <p>Loading interests...</p>
              ) : (
                <div className="interests flex gap-4 flex-wrap">
                  {interests.length > 0 ? (
                    interests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full"
                      >
                        {interest}
                      </span>
                    ))
                  ) : (
                    <p>You have no interests listed.</p>
                  )}
                </div>
              )}
              <div>{currentUser ? <Recommend /> : null}</div>
            </div>
          ) : null}

          {/* Latest articles */}
          <div className="latest-articles py-10 flex justify-between">
            <div className="left  w-full py-4 p-2">
              <h2 className="text-5xl font-bold mb-3">Latest articles</h2>
              <p className="text-gray-600 font-semibold text-lg mb-5">
                Discover over 100 topics
              </p>
              {error && <p className="text-red-500">{error}</p>}
              {loading ? (
                <p>Loading posts...</p>
              ) : (
                <div className="articles flex gap-8 flex-wrap py-6">
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              )}
            </div>
            <div className="right  w-96 py-4 p-2">
              <Catagory />
              <Trending />
              <Authers />
            </div>
          </div>
          {/* Become an author */}
          <BecomeAuther />
        </div>
      </div>
    </>
  );
};

export default Home;
