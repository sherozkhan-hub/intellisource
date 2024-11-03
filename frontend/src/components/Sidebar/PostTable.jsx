import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';


const PostTable = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
                console.log(res);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                    console.log(data.posts);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser) {
            fetchPosts();
        }
    }, [currentUser]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(
                `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
            );
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(
                `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
                {
                    method: 'DELETE',
                }
            );
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) =>
                    prev.filter((post) => post._id !== postIdToDelete)
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container mx-auto my-4">
            <h2 className="text-4xl font-semibold text-center mb-6">All Posts</h2>
            {userPosts.length > 0 ? (
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr >
                                <th scope="col" class="p-6">
                                    Title
                                </th>
                                <th scope="col" class="p-6">
                                    Catagory
                                </th>
                                <th scope="col" class="p-6">
                                    Image
                                </th>
                                <th scope="col" class="p-6">
                                    Tags
                                </th>
                                <th scope="col" class="p-6">
                                    Created At
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPosts.map((post) => (
                                <tr key={post._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {post.title}
                                    </th>
                                    <td class="px-6 py-1">
                                        {post.category}
                                    </td>
                                    <td class="px-6 py-1">
                                        <img src={post.image} alt={post.title} className="w-16 rounded-full h-16 object-cover" />
                                    </td>
                                    <td class="px-6 py-1">
                                        {post.tags.join(', ')}
                                    </td>
                                    <td class="px-6 py-1">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td class="px-6 py-1">
                                        <Link to={`/post-page/${post._id}`}>
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Show</button>
                                        </Link>
                                        <Link to={`/update-post/${post._id}`}>
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                        </Link>
                                        <button onClick={() => {
                                            setShowModal(true);
                                            setPostIdToDelete(post._id);
                                        }} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            ) : (
                <p>No posts found.</p>
            )}
            {showMore && (
                <div className='p-4 flex justify-center'>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
                        onClick={handleShowMore}
                    >
                        Show More
                    </button>
                </div>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this post?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeletePost}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default PostTable;
