import React from 'react'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Header from './components/Navbar/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import "../public/assets/fonts/icons.css";
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Dashboard/Profile'
import Users from './pages/Dashboard/Users'
import Comments from './pages/Dashboard/Comments'
import AutherAccount from './pages/AutherPage/AutherAccount'
import Catagory from './pages/Catagory/Catagory'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import PrivateRoute from './components/Private/PrivateRoute'
import CreatePost from './pages/Dashboard/CreatePost'
import UpdatePost from './pages/Dashboard/UpdatePost'
import AllPost from './pages/Dashboard/AllPost'
import PostPage from './pages/PostPage/PostPage'
import SavedPost from './pages/SavedPost/SavedPost'
import Notification from './pages/Notification/Notification'
import SearchPage from './pages/Search/SearchPage'
import AllCategory from './pages/Catagory/AllCategory'
import Recommend from './pages/Prefer/Recommend'
import AllUsers from './pages/AllUsers/AllUsers'




function App() {

  const Layout = () => {
    return (
      <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    )
  }


  const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element: <Home />
        },
        {
          path:"/about",
          element: <About />
        },
        {
          path:"/category/:Category",
          element: <Catagory />
        },
        {
          path:"/all-category",
          element: <AllCategory />
        },
        {
          path:"/contact",
          element: <Contact />
        },
        {
          element: <PrivateRoute />,
          children: [
            {
              path:"/dashboard",
              element: <Dashboard />
            }
          ]
        },
        {
          path:"/profile",
          element: <Profile />
        },
        {
          path:"/users",
          element: <Users />
        },
        {
          path:"/create-post",
          element: <CreatePost />
        },
        {
          path:"/update-post/:postId",
          element: <UpdatePost />
        },
        {
          path:"/all-post",
          element: <AllPost />
        },
        {
          path:"/comments",
          element: <Comments />
        },
        {
          path:"/auther-account/:userId",
          element: <AutherAccount />
        },
        {
          path:"/sign-up",
          element: <Signup />
        },
        {
          path:"/login",
          element: <Login />
        },
        {
          path:"/forgotpassword",
          element: <ForgotPassword />
        },
        {
          path:"/resetPassword/:userId/:token",
          element: <ResetPassword />
        },
        {
          path:"/post-page/:postId",
          element: <PostPage />
        },
        {
          path:"/saved-posts",
          element: <SavedPost />
        },
        {
          path:"/notification",
          element: <Notification />
        },
        {
          path:"/search",
          element: <SearchPage />
        },
        {
          path:"/recommend",
          element: <Recommend />
        },
        {
          path:"/all-users",
          element: <AllUsers />
        },
      ]
    },
  ])

  return (
    <>
       <RouterProvider router={router} />
    </>
  )
}

export default App
