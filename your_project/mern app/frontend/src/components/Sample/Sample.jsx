<div className="w-80 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
  <div className="relative">
    <Link to={`/post/${post._id}`}>
      <div className="">
        <img
          className="w-80 h-52 rounded-t-lg"
          src={post.image}
          alt={post.title}
        />
        <span className="p-2 bg-white text-black font-semibold text-xs rounded-xl absolute top-2 left-2">
          {post.category}
        </span>
      </div>
    </Link>
  </div>
  <div className="p-3 rounded-xl ">
    <div className="about-auther mb-1 flex gap-3 items-center ">
      <div className="picture w-10">
        <img
          className="rounded-full"
          src={post.author.profilePicture}
          alt={post.author.username}
        />
      </div>
      <div>
        <p className="font-semibold">{post.author.username}</p>
        <p className="text-gray-500 text-sm">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
    <Link to={`/post-page/${post._id}`}>
      <h5 className="mb-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">
        {post.title}
      </h5>
    </Link>
    <Link
      to={`/post-page/${post._id}`}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Read more
      <svg
        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </Link>
  </div>
</div>;
