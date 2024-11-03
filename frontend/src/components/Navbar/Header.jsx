import React from "react";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Avatar, TextInput } from "flowbite-react";
import { signoutStart, signoutSuccess } from "../../redux/user/userSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleSignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        // Redirect to login after successful signout
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="sidebar-open p-2 fixed top-0 left-[-270px]  transition-all duration-700 bottom-0 w-[270px] h-[100vh]  bg-white z-20">
        <div className="container 0 p-2 ">
          <div className="close flex items-center cursor-pointer border-b hover:text-blue-600 pb-3  p-1">
            <i className="icon-cross "></i>
            <h1 className="mx-2 font-semibold">Close</h1>
          </div>
          <div className="menu  border-b px-2 mb-4 py-3">
            <Link
              className="flex hover:text-blue-600 text-sm  p-2 justify-between"
              href="#"
            >
              <ul>
                <li>HOME</li>
              </ul>
              <i className="icon-arrow-right2 flex items-center justify-center"></i>
            </Link>
            <Link
              className="flex hover:text-blue-600 text-sm p-2 justify-between"
              href="./shop.html"
            >
              <ul>
                <li>SHOP</li>
              </ul>
              <i className="icon-arrow-right2 flex items-center justify-center"></i>
            </Link>
            <Link
              className="flex hover:text-blue-600 text-sm p-2 justify-between"
              href=""
            >
              <ul>
                <li>PAGES</li>
              </ul>
              <i className="icon-arrow-right2 flex items-center justify-center"></i>
            </Link>
            <Link
              className="flex hover:text-blue-600 text-sm p-2 justify-between"
              href=""
            >
              <ul>
                <li>PORTFOLIO</li>
              </ul>
              <i className="icon-arrow-right2 flex items-center justify-center"></i>
            </Link>
            <Link
              className="flex hover:text-blue-600 text-sm p-2 justify-between"
              href=""
            >
              <ul>
                <li>BLOGS</li>
              </ul>
              <i className="icon-arrow-right2 flex items-center justify-center"></i>
            </Link>
            <Link
              className="flex hover:text-blue-600 text-sm p-2 justify-between"
              href=""
            >
              <ul>
                <li>MALE</li>
              </ul>
              <i className="icon-arrow-right2 flex items-center justify-center"></i>
            </Link>
            <Link
              className="flex hover:text-blue-600 text-sm p-2 justify-between"
              href=""
            >
              <ul>
                <li>FEMALE</li>
              </ul>
              <i className="icon-arrow-right2 flex items-center justify-center"></i>
            </Link>
            <Link
              className="flex hover:text-blue-600 text-sm p-2 justify-between"
              href=""
            >
              <ul>
                <li>BUY THEME!</li>
              </ul>
              <i className="icon-arrow-right2 flex items-center justify-center"></i>
            </Link>
          </div>
          <div className="items border-b  p-2">
            <Link className="flex hover:text-blue-600 text-sm p-2 " href="">
              <i className="icon-enter text-[20px]"></i>
              <ul className="link ml-4">
                <li>Sign-In</li>
              </ul>
            </Link>
            <Link className="flex hover:text-blue-600 text-sm p-2" href="">
              <i className="icon-profile text-[20px]"></i>
              <ul className="link ml-4">
                <li>Register</li>
              </ul>
            </Link>
            <Link className="flex hover:text-blue-600 text-sm p-2" href="">
              <i className="icon-cart text-[20px]"></i>
              <ul className="link ml-4">
                <li>View Card</li>
              </ul>
            </Link>
            <Link className="flex hover:text-blue-600 text-sm p-2" href="">
              <i className="icon-heart text-[20px]"></i>
              <ul className="link ml-4">
                <li>Wishlist</li>
              </ul>
            </Link>
            <Link className="flex hover:text-blue-600 text-sm p-2" href="">
              <i className="icon-stats-bars text-[20px]"></i>
              <ul className="link ml-4">
                <li>Compare</li>
              </ul>
            </Link>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="lg:container flex justify-between items-center p-2 mx-auto">
          <div className="logo py-1 px-2">
            {/* <img src="/assets/images/logo.png" alt="logo" /> */}
            <h1 className="text-3xl font-semibold">IntelliSource</h1>
          </div>
          <div className="links gap-2 flex justify-between item-center p-2">
            <ul className="lg:flex hidden gap-2 p-2 justify-between item-center font-semibold">
              <li>
                <Link className="bg-slate-100 px-6 py-3 rounded-full" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:bg-slate-100 px-6 py-3 rounded-full"
                  to="/about"
                >
                  About
                </Link>
              </li>
              {/* <li>
                <Link
                  className="hover:bg-slate-100 px-6 py-3 rounded-full"
                  to="/contact"
                >
                  Contact
                </Link>
              </li> */}
              <li>
                <Link
                  className="hover:bg-slate-100 px-6 py-3 rounded-full"
                  to="/all-category"
                >
                  Explore
                </Link>
              </li>
            </ul>
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <TextInput
                  type="text"
                  placeholder="Search..."
                  rightIcon={AiOutlineSearch}
                  className="hidden sm:inline w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>
          </div>

          <div className="accounts flex justify-between gap-2 text-xl p-2">
            <div className="side-menu my-auto lg:hidden  px-2 py-4  cursor-pointer">
              <Link
                href="#"
                className="hamburger-section w-[50px] h-[50px] bg-yellow-300  "
              >
                <div className="hamburger relative bg-black w-[30px] h-[4px]"></div>
              </Link>
            </div>

            <div className="account relative">
              {currentUser ? (
                <>
                  <div className="flex gap-2">
                    <div className="gap-2 flex justify-between item-center my-auto pt-3">
                      <Link to={"/create-post"}>
                        <button
                          type="button"
                          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Write a Post
                        </button>
                      </Link>
                    </div>
                    <Dropdown
                      arrowIcon={false}
                      label={
                        currentUser.profilePicture ? (
                          <img
                            alt="user-img"
                            src={currentUser.profilePicture}
                            className="rounded-full w-10 h-10 object-cover"
                          />
                        ) : (
                          <Avatar
                            alt="default-avatar"
                            src="/default-avatar.jpg"
                            rounded
                          />
                        )
                      }
                    >
                      <Dropdown.Header>
                        <span className="block text-sm">
                          {currentUser.username}
                        </span>
                        <span className="block text-sm font-medium truncate">
                          {currentUser.email}
                        </span>
                      </Dropdown.Header>
                      <Dropdown.Item>
                        <Link to="/profile">Profile</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to="/saved-posts">Saved Posts</Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link to={`/auther-account/${currentUser._id}`}>
                          Notifications
                        </Link>
                      </Dropdown.Item>
                      {currentUser.role === "admin" && (
                        <Dropdown.Item>
                          <Link to="/dashboard">Dashboard</Link>
                        </Dropdown.Item>
                      )}
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <button onClick={handleSignout}>Sign Out</button>
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </>
              ) : (
                <Link to="/login">
                  <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Sign In
                    </span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
