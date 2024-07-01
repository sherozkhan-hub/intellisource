import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Oauth from '../../components/GoogleAuth/Oauth';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '', errors: {} });
    const { loading, error: errorMessage } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            default:
                break;
        }

        setFormData({ ...formData, [id]: value, errors });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password })
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
            } else if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/recommend');
            } else {
                dispatch(signInFailure('Login failed'));
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <>
            <div className="wrap-content text-gray-500 bg-[#f7f8fa]">
                <div className="container mx-auto py-2 px-4">
                    <div className="content flex text-xs">
                        <Link className="hover:text-blue-600 mr-2" to={'/'}>Home </Link>
                        <p> / Account / Login</p>
                    </div>
                </div>
            </div>

            <div className="wrapper">
                <div className="container p-2 mx-auto">
                    <div className="heading my-4 mb-8 text-3xl font-semibold text-center p-2">
                        ALREADY REGISTERED?
                    </div>
                    <div className="login block md:flex md:justify-between p-2">
                        <div className="left w-full md:w-[50%] mr-4 mb-4 border py-6 px-8">
                            <h3 className="font-semibold text-xl mb-3">NEW CUSTOMER</h3>
                            <p className="font-semibold text-sm text-gray-600 mb-6 pr-3">
                                By creating an account with our store, you will be able to move through the checkout process faster,
                                store multiple shipping addresses, view and track your orders in your account and more.
                            </p>
                            <button className="border-2 border-blue-700 px-6 py-2 text-sm text-blue-700 rounded-lg
                              hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-500">
                                <Link to={'/sign-up'}>CREATE AN ACCOUNT</Link>
                            </button>
                        </div>
                        <div className="right w-full md:w-[50%] mr-2 mb-4 border py-6 px-8">
                            <h3 className="font-semibold text-xl mb-3">LOGIN</h3>
                            <p className="font-semibold text-sm text-gray-600 mb-4">
                                If you have an account with us, please log in.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="label mb-1 flex justify-between">
                                    <label className="font-semibold" htmlFor="email">E-MAIL *</label>
                                    <p className="text-sm text-gray-600">* Required Fields</p>
                                </div>
                                <input
                                    className="bg-gray-100 px-4 py-2 w-full rounded-lg mb-4"
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Enter E-mail"
                                    required
                                    onChange={handleChange}
                                />
                                {formData.errors.email && <p className="text-red-500">{formData.errors.email}</p>}

                                <div className="label mb-1 flex justify-start">
                                    <label className="font-semibold" htmlFor="password">PASSWORD *</label>
                                </div>
                                <input
                                    className="bg-gray-100 px-4 py-2 w-full rounded-lg mb-6"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    required
                                    onChange={handleChange}
                                />
                                {formData.errors.password && <p className="text-red-500">{formData.errors.password}</p>}

                                <div className="login-btn py-2 block sm:flex sm:justify-between">
                                    <input
                                        className="border-2 border-blue-700 px-6 py-2 mb-2 text-sm text-blue-700 rounded-lg
                                      hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-500 cursor-pointer"
                                        type="submit"
                                        value="LOGIN"
                                    />
                                    <Oauth />
                                </div>
                                <Link className="text-blue-700 text-sm flex items-center" to={'/forgotpassword'}>
                                    Lost your password?
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
