import React, { useEffect, useState } from "react";
import { Alert } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
      fetchUsers(searchTermFromUrl);
    } else {
      fetchUsers();
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${searchQuery}`
    );
    fetchUsers(searchTerm);
  };

  // const fetchUsers = async (searchTerm = '') => {
  //     try {
  //         const res = await fetch(`/api/user/users?username=${searchTerm}`);
  //         const data = await res.json();
  //         console.log(data);
  //         if (res.ok) {
  //             let filteredUsers = data.users;
  //             if (searchTerm.trim() !== '') {
  //                 const regex = new RegExp(searchTerm, 'i');
  //                 filteredUsers = data.users.filter(user => regex.test(user.username));
  //             }
  //             setUsers(filteredUsers);
  //             if (filteredUsers.length < 9) {
  //                 setShowMore(false);
  //             }
  //         }
  //     } catch (error) {
  //         console.log(error.message);
  //     }
  // };

  const fetchUsers = async (searchTerm = "") => {
    try {
      const res = await fetch(`/api/user/users?username=${searchTerm}`);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        let filteredUsers = data.users;
        if (searchTerm.trim() !== "") {
          const regex = new RegExp(`.*${searchTerm}.*`, "i");
          filteredUsers = data.users.filter((user) =>
            regex.test(user.username)
          );
        }
        setUsers(filteredUsers);
        if (filteredUsers.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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

  return (
    <>
      <h2 className="text-4xl font-semibold text-center mb-6">All Users</h2>
      <div className=" flex justify-center  p-4">
        <div className="w-[40%] rounded-xl p-1  px-6 flex gap-2 justify-center itrems-center">
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-full p-2 px-6"
              type="text"
              id="fname"
              name="fname"
              placeholder="Search any User you want .."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>
      {message && (
        <Alert color="success" className="mb-4">
          {message}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mb-4">
          {error}
        </Alert>
      )}
      <div className="container p-2 mx-auto flex flex-wrap justify-between">
        {users.length > 0 ? (
          <>
            {users.map((user) => (
              <Link to={`/auther-account/${user._id}`}>
                <div
                  key={user._id}
                  className="trending shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white mx-1 mb-8 rounded-xl py-6 p-4 w-[230px]"
                >
                  <div className="topic-pic mb-2 flex justify-center">
                    <img
                      className="rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-4 border-white h-28 w-28"
                      src={user.profilePicture}
                      alt={user.username}
                    />
                  </div>
                  <div className="content">
                    <h2 className="text-xl text-center font-semibold mb-2">
                      {user.username}
                    </h2>
                    <p className="text-center">
                      <span>Role: </span>
                      {user.role}
                    </p>
                    <p className="text-center">
                      <span>Followers: </span>
                      {user.numberOfFollowers}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <p>You have no users yet!</p>
        )}
      </div>
      <div className="p-4 mb-10">
        {showMore && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleShowMore}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AllUsers;
