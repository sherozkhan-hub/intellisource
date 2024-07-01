import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { userId, token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/auth/resetPassword/${userId}/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
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
      <div className='flex justify-center items-center p-10'>
        <div className="right w-full md:w-[50%] mr-2 mb-4 border py-6 px-8">
          <h3 className="font-semibold text-xl mb-3">ENTER NEW PASSWORD</h3>
          <p className="font-semibold text-sm text-gray-600 mb-4 ">We will send you an email to reset your passord.</p>

          <form onSubmit={handleSubmit}>
            <div className="label mb-1 flex justify-between ">
              <label className="font-semibold" htmlFor="password" > New Password *</label>
              <p className="text-sm text-gray-600">* Required Fields</p>
            </div>
            <input
              className="bg-gray-100 px-4 py-2 w-full rounded-lg mb-4" required
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="login-btn py-2 block sm:flex sm:justify-between">
              <button className="border-2 border-blue-700 px-6 py-2 mb-2 text-sm text-blue-700 rounded-lg
           hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-500" type="submit">Reset Password</button>
              <Link className="text-blue-700 text-sm flex items-center" to={'/login'}>Go To Login</Link>
            </div>

          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
