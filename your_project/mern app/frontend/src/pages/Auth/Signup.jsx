import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase'; // Adjust this import to match your firebase configuration

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        let errors = { ...formData.errors };
    
        switch (id) {
            case 'email':
                errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
                break;
            case 'password':
                errors.password = value.length >= 6 ? '' : 'Password must be at least 6 characters long';
                break;
            case 'username':
                errors.username = value.length >= 4 ? '' : 'Username must be at least 4 characters long';
                break;
            default:
                break;
        }
    
        setFormData({ ...formData, [id]: value, errors });
    }

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
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErrorMessage(null);
            setSuccessMessage(null);

            if (!formData.image) {
                setErrorMessage('Please upload an image');
                return;
            }

            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success === false) {
                return setErrorMessage(data.message);
            }


            // if (res.ok) {
            //     const updateRoleRes = await fetch('/api/user/updateRole', {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify({ userId: data.userId, role: 'registered' })
            //     });

            //     const updateRoleData = await updateRoleRes.json();
            //     if (updateRoleData.success === false) {
            //         return setErrorMessage(updateRoleData.message);
            //     }

            //     if (updateRoleRes.ok) {
            //         setSuccessMessage('Account created successfully! Redirecting to sign in...');
            //         setTimeout(() => {
            //             navigate('/login');
            //         }, 3000); // Redirect after 3 seconds
            //     } else {
            //         setErrorMessage('Failed to update user role');
            //     }
            // }

            setSuccessMessage('Account created successfully! Redirecting to sign in...');
            setTimeout(() => {
                navigate('/login');
            }, 3000); // Redirect after 3 seconds
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <>
            <div className="wrap-content text-gray-500 bg-[#f7f8fa]">
                <div className="container mx-auto py-2 px-4">
                    <div className="content flex text-xs">
                        <Link className="hover:text-blue-600 mr-2" to="/">Home </Link>
                        <p> / Account / Create account</p>
                    </div>
                </div>
            </div>

            <div className="wrapper">
                <div className="container p-2 mx-auto">
                    <div className="heading my-4 mb-8 text-3xl font-semibold text-center p-2">
                        CREATE AN ACCOUNT
                    </div>
                    <div className="information flex justify-center py-2">
                        <div className="right w-full lg:w-[45%] mr-2 mb-4 border py-6 px-9">
                            <h3 className="font-semibold text-xl mb-4">Sign Up</h3>
                            <form onSubmit={handleSubmit}>

                                <div className="label mb-1 flex justify-between ">
                                    <label className="font-semibold text-sm" htmlFor="username">User Name *</label>
                                    <p className="text-sm text-gray-600">* Required Fields</p>
                                </div>
                                <input
                                    className="bg-gray-100 px-4 py-2 w-full rounded-lg mb-4"
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Enter User Name"
                                  
                                    onChange={handleChange}
                                />
                                {formData.errors && formData.errors.username && <p className="text-red-500">{formData.errors.username}</p>}


                                <div className="label mb-1 flex justify-between">
                                    <label className="font-semibold text-sm" htmlFor="email">Email *</label>
                                </div>
                                <input
                                    className="bg-gray-100 px-4 py-2 w-full rounded-lg mb-4"
                                    type="text"
                                    id="email"
                                    name="email"
                                    
                                    placeholder="Enter E-mail"
                                    
                                    onChange={handleChange}
                                />
                                {formData.errors && formData.errors.email && <p className="text-red-500">{formData.errors.email}</p>}


                                <div className="label mb-1 flex justify-between">
                                    <label className="font-semibold text-sm" htmlFor="profile">Profile Picture *</label>
                                </div>
                                <input
                                    className="bg-gray-100 px-4 py-2 w-full rounded-lg mb-4"
                                    type="file"
                                    id="profile"
                                    name="profile"
                                   
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                {formData.errors && formData.errors.password && <p className="text-red-500">{formData.errors.password}</p>}

                                <button
                                    type="button"
                                    onClick={handleUploadImage}
                                    disabled={imageUploadProgress !== null}
                                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
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

                                <div className="label mb-1 flex justify-start">
                                    <label className="font-semibold text-sm" htmlFor="password">PASSWORD *</label>
                                </div>
                                <input
                                    className="bg-gray-100 px-4 py-2 w-full rounded-lg mb-6"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                 
                                    onChange={handleChange}
                                />
                                 {formData.errors && formData.errors.password && <p className="text-red-500">{formData.errors.password}</p>}


                                <div className="login-btn py-2 block sm:flex sm:justify-between">
                                    <input
                                        className="border-2 border-blue-700 px-6 py-2 mb-2 text-sm text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-500"
                                        type="submit"
                                        value="CREATE"
                                    />
                                    <Link className="text-blue-700 font-semibold flex items-center" to={"/login"}>Sign In</Link>
                                </div>
                                {errorMessage && <Alert color='failure'>{errorMessage}</Alert>}
                                {successMessage && <Alert color='success'>{successMessage}</Alert>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;
