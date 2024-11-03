import { Modal, Button, Alert } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function UserTable() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/users`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/users?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    setMessage('');
    setError('');
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setMessage('User deleted successfully.');
      } else {
        setError(data.message || 'An error occurred while deleting the user.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while deleting the user.');
    }
  };

  return (
    <>
      <div className='p-6 w-full'>
        <h2 className="text-4xl font-semibold text-center mb-6">All Users</h2>
        {message && <Alert color="success" className="mb-4">{message}</Alert>}
        {error && <Alert color="failure" className="mb-4">{error}</Alert>}
        {users.length > 0 ? (
          <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-6">
                    Date created
                  </th>
                  <th scope="col" className="p-6">
                    User image
                  </th>
                  <th scope="col" className="p-6">
                    Username
                  </th>
                  <th scope="col" className="p-6">
                    Email
                  </th>
                  <th scope="col" className="p-6">
                    Admin
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </th>
                    <td className="px-6 py-1">
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className='w-14 h-14 object-cover bg-gray-500 rounded-full'
                      />
                    </td>
                    <td className="px-6 py-1">
                      {user.username}
                    </td>
                    <td className="px-6 py-1">
                      {user.email}
                    </td>
                    <td className="px-6 py-1">
                      {user.admin ? (
                        <FaCheck className='text-green-500' />
                      ) : (
                        <FaTimes className='text-red-500' />
                      )}
                    </td>
                    <td className="px-6 py-1">
                      <div className='flex justify-center'>
                        <Link to={`/auther-account/${user._id}`}>
                          <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Show</button>
                        </Link>
                        <button onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>You have no users yet!</p>
        )}
        {showMore && (
          <div className="flex justify-center mt-4">
            <button onClick={handleShowMore} className="bg-blue-500 text-white px-4 py-2 rounded">Show More</button>
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
                Are you sure you want to delete this user?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteUser}>
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
    </>
  );
}
