import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import PostCard from "../../components/BlogCard/PostCard";

const AutherAccount = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [notification, setNotification] = useState("");

  const checkIfFollowing = async () => {
    try {
      const res = await fetch(`/api/user/following/${userId}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to check follow status");
      }

      const isFollowingStored = localStorage.getItem("isFollowing");
      setIsFollowing(isFollowingStored === "true");
      // setIsFollowing(data.isFollowing);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleFollow = async () => {
    if (!user) {
      console.log("User not loaded yet.");
      return;
    }

    try {
      const res = await fetch(`/api/user/follow/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      });
      localStorage.setItem("isFollowing", true);

      const data = await res.json();

      if (!res.ok) {
        console.log("Error:", data.message);
      } else {
        setIsFollowing(true); // Update state to reflect following status
        setNotification("Followed successfully");
        setTimeout(() => {
          setNotification("");
        }, 5000);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleUnfollow = async () => {
    if (!user) {
      console.log("User not loaded yet.");
      return;
    }

    try {
      const res = await fetch(`/api/user/unfollow/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      });
      localStorage.removeItem("isFollowing");

      const data = await res.json();

      if (!res.ok) {
        console.log("Error:", data.message);
      } else {
        setIsFollowing(false); // Update state to reflect unfollowing status
        setNotification("Unfollowed successfully");
        setTimeout(() => {
          setNotification("");
        }, 5000);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await fetch(`/api/user/${userId}`);
        const userData = await userRes.json();
        if (!userRes.ok) {
          throw new Error(userData.message || "Failed to fetch user data");
        }
        setUser(userData);

        const postsRes = await fetch(`/api/post/getposts?userId=${userId}`);
        const postsData = await postsRes.json();
        // console.log(postsData);
        if (!postsRes.ok) {
          throw new Error(postsData.message || "Failed to fetch user posts");
        }
        setPosts(postsData.posts);

        await checkIfFollowing(); // Check if the user is following
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

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
        <p>Failed to load user data. Please try again later.</p>
      </div>
    );
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <>
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded">
          {notification}
        </div>
      )}
      <div className="account mb-10">
        <div className="banner-image">
          <img
            className="h-[50vh] w-full"
            src="/assets/images/account-banner.webp"
            alt="banner-pic"
          />
        </div>
        <div className="container relative -top-32  px-8 mx-auto">
          <div className="auther-info shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white flex justify-between gap-5 p-4 rounded-xl">
            <div className="profile-img  p-2">
              <img
                className="rounded-full w-80 h-52  border-4 border-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                src={user.profilePicture}
                alt="profile-pic"
              />
            </div>
            <div className="description flex flex-col justify-center p-2">
              <h2 className="text-4xl font-bold mb-2">{user.username}</h2>
              <p className="text-gray-600">
                {user.bio ||
                  `${user.username}is a passionate blogger who writes about lifestyle, travel, and personal growth. With a knack for storytelling and a love for sharing experiences, she inspires her readers to find beauty in everyday moments. When she is not writing, Jane enjoys exploring new places and savoring time with friends and family.`}
              </p>
              <Link
                to={user.website || "https://example.com/me"}
                className="font-semibold text-blue-700"
              >
                {user.email}
              </Link>
              <div className="flex social-icons gap-2 py-4">
                <div className="div p-1  flex justify-end ">
                  {isFollowing ? (
                    <button
                      onClick={handleUnfollow}
                      type="button"
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      onClick={handleFollow}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Follow
                    </button>
                  )}
                  <Link to={"/notification"}>
                    <div className="notify p-2 relative">
                      <span className="icon-bell cursor-pointer hover:bg-blue-700 hover:text-white bg-slate-200 px-3 py-3 rounded-xl"></span>
                      <div className="notify-down hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] absolute bg-white rounded text-sm px-2 py-[3px] left-[-5px] bottom-[-40px]">
                        Notification
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className="additional w-96 border-2 border-black p-2">
                            <div className="div p-1 border-2 border-red-800 flex justify-end ">
                                {isFollowing ? (
                                    <button onClick={handleUnfollow} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Following</button>
                                ) : (
                                    <button onClick={handleFollow} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Follow</button>
                                )}
                                <Link to={'/notification'}>
                                    <div className="notify p-2 relative">
                                        <span className="icon-bell cursor-pointer hover:bg-blue-700 hover:text-white bg-slate-200 px-3 py-3 rounded-xl"></span>
                                        <div className="notify-down hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] absolute bg-white rounded text-sm px-2 py-[3px] left-[-5px] bottom-[-40px]">
                                            Notification
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
      <div className="blog-list">
        <div className="container relative -top-32  px-8 mx-auto">
          {/* <div className="buttons px-12 py-4 mb-3 flex justify-between border-2 border-black">
                        <div className="btn">
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-xl px-6 py-2.5 text-lg text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Articles</button>
                            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-xl px-6 py-2.5 text-lg me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Favourite</button>
                            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-xl px-6 py-2.5 text-lg text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Saved</button>
                        </div>
                        <div className="dropdown">
                            <button type="button" className="text-white bg-gray-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-xl px-6 py-2.5 text-lg text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">Most Recents</button>
                        </div>
                    </div> */}
          <div className="articles flex justify-center gap-8 flex-wrap ">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AutherAccount;
