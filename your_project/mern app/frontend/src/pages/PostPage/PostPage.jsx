import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../../components/Comments/CommentSection";
import PostCard from "../../components/BlogCard/PostCard";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export default function PostPage() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch(`/api/post/getpost/${postId}`);
  //       const data = await res.json();
  //       if (!res.ok) {
  //         throw new Error(data.message || 'Failed to fetch post');
  //       }

  //       setPost(data.post);
  //       setError(false);
  //     } catch (error) {
  //       console.error('Error fetching post:', error);
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPost();
  // }, [postId]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getpost/${postId}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch post");
        }

        const respon = await fetch(
          `/api/post/getViews?userId=${currentUser._id}&postId=${postId}`
        );

        const data1 = await respon.json();

        console.log(data1);

        setPost(data.post);
        setError(false);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    // Calculate the time spent when the component unmounts
  }, [postId]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=4`);
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
          setRecentPosts(postsWithAuthors);
        }
      } catch (error) {
        console.log("Error fetching recent posts:", error.message);
      }
    };

    fetchRecentPosts();
  }, []);

  useEffect(() => {
    if (post && post.userId) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`/api/user/${post.userId._id}`);
          const data = await res.json();
          console.log(data);
          if (!res.ok) {
            throw new Error(data.message || "Failed to fetch user");
          }
          setUser(data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();
    }
  }, [post]);

  const handleSavePost = async () => {
    if (!user || !post) {
      console.log("User or post not loaded yet.");
      return;
    }

    try {
      const res = await fetch("/api/user/savedPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post._id,
        }),
      });
      console.log(post._id);
      const data = await res.json();
      // console.log(data.postId);
      if (!res.ok) {
        console.log(data.message);
      } else {
        console.log("Post saved successfully:", data);
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>
          <p className="text-5xl font-semibold">
            Please Login in to see the post
          </p>
          <div className="p-5 flex justify-center text-2xl font-semibold text-blue-700">
            <Link to={"/login"}>Login Now</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No post found. Please try a different post.</p>
      </div>
    );
  }

  return (
    <main className="pb-3 border-2 border-black flex flex-col">
      {showNotification && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50">
          Post saved successfully
        </div>
      )}

      <img
        src={post.image}
        alt={post.title}
        className=" mb-4 max-h-[600px] w-full object-cover"
      />
      <div className="mx-auto w-full max-w-5xl">
        <div className="border-2 border-black mb-3 flex justify-between items-center ">
          <div>
            <Button color="gray" pill size="lg">
              {post.category}
            </Button>
          </div>
          <div className=" text-center text-sm">
            {user ? (
              <div className="">
                <p>By: {user.username}</p>
                <p>Published on: {new Date(post.createdAt).toLocaleString()}</p>
              </div>
            ) : (
              <p>Loading author details...</p>
            )}
          </div>
          <div>
            <Button
              onClick={handleSavePost}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Save Post
            </Button>
          </div>
        </div>
        <h1 className="text-3xl font-bold p-2 text-center font-serif lg:text-5xl">
          {post.title}
        </h1>
      </div>
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-5xl mb-3 text-xs">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className="p-3 max-w-5xl mb-6 mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="bg-gray-100 mb-6 py-10">
        <CommentSection postId={post._id} />
      </div>
      <div className="flex flex-col justify-center items-center mb-10">
        <h1 className="text-4xl mt-5 py-5 font-semibold">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
