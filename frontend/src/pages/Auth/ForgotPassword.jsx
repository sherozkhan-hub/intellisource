import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("irfgaehgerg");
        try {
            const response = await fetch('/api/auth/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data);
            } else {
                setMessage(data.message || 'Something went wrong');
            }
        } catch (error) {
            setMessage('Network error');
        }
    };

    return (
        <>

            <div className="wrap-content  text-gray-500  bg-[#f7f8fa] ">
                <div className="container   mx-auto py-2 px-4">
                    <div className="content flex text-xs ">
                        <Link className="hover:text-blue-600 mr-2" to={'/'}>Home </Link>
                        <p> / Account / Reset account</p>
                    </div>
                </div>
            </div>

            <div className="wrapper ">
                <div className="container p-2 mx-auto">
                    <div className="heading my-4 mb-8 text-3xl font-semibold text-center  p-2">
                        FORGET PASSWORD ?
                    </div>
                    <div className="login block md:flex md:justify-between  p-2">
                        <div className="left w-full md:w-[50%] mr-4 mb-4 border py-6 px-8 ">
                            <h3 className="font-semibold text-xl mb-3">NEW CUSTOMER</h3>
                            <p className="font-semibold text-sm text-gray-600 mb-6 pr-3">By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</p>
                            <button className="border-2 border-blue-700 px-6 py-2 text-sm text-blue-700 rounded-lg
                                hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-500">
                                <Link to={'/sign-up'}>CREATE AN ACCOUNT</Link>
                            </button>
                        </div>
                        <div className="right w-full md:w-[50%] mr-2 mb-4 border py-6 px-8">
                            <h3 className="font-semibold text-xl mb-3">RESET PASSWORD</h3>
                            <p className="font-semibold text-sm text-gray-600 mb-4 ">We will send you an email to reset your passord.</p>

                            <form onSubmit={handleSubmit}>
                                <div className="label mb-1 flex justify-between ">
                                    <label className="font-semibold" htmlFor="email" > E-MAIL *</label>
                                    <p className="text-sm text-gray-600">* Required Fields</p>
                                </div>
                                <input className="bg-gray-100 px-4 py-2 w-full rounded-lg mb-4" required type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />


                                <div className="login-btn py-2 block sm:flex sm:justify-between">
                                   <input className="border-2 border-blue-700 px-6 py-2 mb-2 text-sm text-blue-700 rounded-lg
                                    hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-500" type="submit" value="SUBMIT" />
                                    <Link className="text-blue-700 text-sm flex items-center" to={'/login'}>or Cancel</Link>
                                </div>
                            </form>
                            {message && <><p>{message}</p>
                            <p>Please check you Email</p></>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword