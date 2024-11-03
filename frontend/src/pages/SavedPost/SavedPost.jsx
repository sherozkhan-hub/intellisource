import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostCard from "../../components/BlogCard/PostCard";

const SavedPost = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/user/getSavedPosts?userId=${currentUser._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
               // console.log(data[0].postId);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [currentUser._id]);

    return (
        <>
            <div className="wrap-content text-gray-500 bg-[#f7f8fa]">
                <div className="container mx-auto py-2 px-4">
                    <div className="content flex text-xs">
                        <Link className="hover:text-blue-600 mr-2" to={'/'}>Home</Link>
                        <p> / Saved Posts</p>
                    </div>
                </div>
            </div>

            <div className="wrapper">
                <div className="container p-2 mx-auto">
                    <div className="heading my-4 mb-8 text-3xl font-semibold text-center p-2">
                        LIST OF SAVED POST
                    </div>
                    <div className="container border-2 border-black p-4 mx-auto">
                        {error && <p className="text-red-500">{error}</p>}
                        {loading ? (
                            <p>Loading posts...</p>
                        ) : (
                            <div className="articles flex justify-between gap-8 flex-wrap py-6">
                                {posts.map((post) => (
                                    <PostCard key={post._id} post={post.postId} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SavedPost;
