import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdatePost = () => {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const { postId } = useParams();

    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if (res.ok) {
                    setPublishError(null);
                    setFormData(data.posts[0]);
                    setTags(data.posts[0].tags || []);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchPost();
    }, [postId]);

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    };

    const handleAddTag = (e) => {
        e.preventDefault();
        if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, tags }), // Include tags in the request body
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            if (res.ok) {
                setPublishError(null);
                navigate('/all-post');
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };


    return (
        <>
            <div className="wrap-content text-gray-500 bg-[#f7f8fa]">
                <div className="container mx-auto py-2 px-4">
                    <div className="content flex text-xs">
                        <Link className="hover:text-blue-600 mr-2" to={'/'}>
                            Home
                        </Link>
                        <p> / Update Post</p>
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <div className="container p-4 mx-auto">
                    <div className="heading my-4 mb-8 text-3xl font-semibold text-center p-2">
                        Update A POST
                    </div>

                    {publishError && (
                        <Alert className='mt-5' color='failure'>
                            {publishError}
                        </Alert>
                    )}

                    <div className="information flex justify-center py-2">
                        <div className="right w-full lg:w-[60%] mr-2 mb-4 border py-6 px-9">
                            <h3 className="font-semibold text-xl mb-6">WRITE INFORMATION</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="title flex justify-between gap-5">
                                    <div className="label mb-1 w-full">
                                        <label className="font-semibold mb-2 text-sm" htmlFor="title">
                                            Write a Title *
                                        </label>
                                        <input
                                            className="bg-gray-100 px-4 py-2 mt-1 w-full rounded-lg mb-4"
                                            type="text"
                                            id="title"
                                            name="title"
                                            placeholder="Enter your blog title .."
                                            onChange={(e) =>
                                                setFormData({ ...formData, title: e.target.value })
                                            }
                                            value={formData.title || ''}
                                            required
                                        />
                                    </div>

                                </div>

                                <div className="label mb-1 flex justify-between">
                                    <label className="font-semibold text-sm" htmlFor="category">
                                        Select a Category
                                    </label>
                                </div>
                                <select value={formData.category || ''} onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                } className="bg-gray-100 px-4 py-2 w-full rounded-lg mb-4" name="category" id="category">
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="mercedes">Mercedes</option>
                                    <option value="audi">Audi</option>
                                </select>

                                <div className="label mb-1 flex justify-between">
                                    <label className="font-semibold text-sm" htmlFor="profile">
                                        Profile Picture *
                                    </label>
                                </div>
                                <div className="flex justify-between items-center">
                                    <input
                                        className="bg-gray-100 px-4 py-2 rounded-lg mb-4"
                                        type="file"
                                        id="profile"
                                        name="profile"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    <button
                                        type="button" onClick={handleUploadImage}
                                        disabled={imageUploadProgress !== null}
                                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                    >
                                        {imageUploadProgress ? (
                                            <div className='w-16 h-16'>
                                                <CircularProgressbar
                                                    value={imageUploadProgress}
                                                    text={`${imageUploadProgress || 0}%`}
                                                />
                                            </div>
                                        ) : (
                                            'Upload Image'
                                        )}
                                    </button>
                                </div>
                                <div>
                                    {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                                    {formData.image && (
                                        <img
                                            src={formData.image}
                                            alt='upload'
                                            className='w-full h-72 object-cover'
                                        />
                                    )}
                                </div>

                                <div className="editor py-2 mb-4">
                                    <ReactQuill value={formData.content || ''} onChange={(value) => {
                                        setFormData({ ...formData, content: value });
                                    }} theme="snow" placeholder="Write your blog content here ...." className="h-60 mb-12" />
                                </div>

                                <div className="label mb-1 w-full">
                                    <label className="font-semibold mb-2 text-sm" htmlFor="tags">
                                        Tags
                                    </label>
                                    <div className="flex justify-between items-center gap-5  mb-4">
                                        <input
                                            className="bg-gray-100 px-4 py-2 mt-1 w-full rounded-lg"
                                            type="text"
                                            id="tags"
                                            name="tags"
                                            placeholder="Enter tags .."
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                            onClick={handleAddTag}
                                        >
                                            Add Tag
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, index) => (
                                            <div key={index} className="flex items-center bg-blue-200 px-2 py-1 rounded-lg">
                                                <span>{tag}</span>
                                                <button
                                                    type="button"
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                    onClick={() => handleRemoveTag(tag)}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="login-btn py-2 block sm:flex sm:justify-center">
                                    <input
                                        className="border-2 border-blue-700 px-6 py-2 mb-2 text-sm text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-500"
                                        type="submit"
                                        value="Update Post"
                                    />
                                </div>
                                {publishError && (
                                    <Alert className='mt-5' color='failure'>
                                        {publishError}
                                    </Alert>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdatePost;
