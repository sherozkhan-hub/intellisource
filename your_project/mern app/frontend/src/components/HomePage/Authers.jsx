
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

const Authers = () => {
  const { userId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [notification, setNotification] = useState('');

  const checkIfFollowing = async () => {
    try {
      const res = await fetch(`/api/user/following/${userId}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to check follow status');
      }

      const isFollowingStored = localStorage.getItem('isFollowing');
      setIsFollowing(isFollowingStored === 'true');
      // setIsFollowing(data.isFollowing);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const handleFollow = async () => {
    if (!users) {
      console.log('User not loaded yet.');
      return;
    }

    try {
      const res = await fetch(`/api/user/follow/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: users._id,
        }),
      });
      localStorage.setItem('isFollowing', true);

      const data = await res.json();

      if (!res.ok) {
        console.log('Error:', data.message);
      } else {
        setIsFollowing(true); // Update state to reflect following status
        setNotification('Followed successfully');
        setTimeout(() => {
          setNotification('');
        }, 5000);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const handleUnfollow = async () => {
    if (!users) {
      console.log('User not loaded yet.');
      return;
    }

    try {
      const res = await fetch(`/api/user/unfollow/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: users._id,
        }),
      });
      localStorage.removeItem('isFollowing');

      const data = await res.json();

      if (!res.ok) {
        console.log('Error:', data.message);
      } else {
        setIsFollowing(false); // Update state to reflect unfollowing status
        setNotification('Unfollowed successfully');
        setTimeout(() => {
          setNotification('');
        }, 5000);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/users`);
        const data = await res.json();
        console.log(data);
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
  }, [currentUser]);

  return (
    <>
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-2 rounded">
          {notification}
        </div>
      )}
      <div className="w-full mb-5 max-w-sm p-4 bg-[#e5e7eb] rounded-xl shadow sm:p-4 sm:py-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="heading flex justify-between">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
            Discover Authors
          </h5>
          <Link className="text-blue-700 font-bold" to="/all-users">
            View all
          </Link>
        </div>
        <ul className="my-4 space-y-3">
          {users.map((user) => (
            <li className=''>
              <Link
                to={`/auther-account/${user._id}`}
                className="flex items-center p-3 text-base font-bold text-gray-900 rounded-xl bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                <div>
                  <img className="w-14 h-14 rounded-full" src={user.profilePicture}
                    alt="not found" />
                </div>
                <div className="flex-1 ms-3 whitespace-nowrap">
                  <p></p>
                  <p>{user.username}</p>
                  <p className="text-sm font-normal">{user.email}</p>
                </div>
                <div>
                  {/* <div className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                    {new Date(user.createdAt || user.userId.createdAt).toLocaleDateString()}
                  </div> */}
                </div>
              </Link>
              <div className='hidden'>
                <div className="div p-1 border-2 border-red-800 flex justify-end ">
                  {isFollowing ? (
                    <button onClick={handleUnfollow} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Following</button>
                  ) : (
                    <button onClick={handleFollow} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Follow</button>
                  )}
                </div>
              </div>
            </li>
          ))}

        </ul>
      </div>
    </>
  )
}

export default Authers