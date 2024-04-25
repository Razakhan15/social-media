import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate()
  const [show, setShow] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:5000/api/posts",
        config
      );
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/posts/like/${postId}`,
        config
      );
      const updatedPosts = posts.map((post) =>
        post._id === postId ? data : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async (postId, commentText) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/posts/comment/${postId}`,
        { text: commentText },
        config
      );
      const updatedPosts = posts.map((post) =>
        post._id === postId ? data : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const handelLogout = () =>{
    localStorage.clear()
    nav('/')
  }

  return (
    <div className="">
      <div className="bg-blue-500 p-2 fixed top-0 w-full text-white flex justify-center gap-5">
        <Link to={"/create"}>Create Post</Link>
        <button onClick={handelLogout}>Logout</button>
      </div>
      <div className="max-w-sm m-auto mt-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-5 max-w-md md:max-w-2xl "
          >
            <div className="flex items-start px-4 py-6">
              <img
                className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt="avatar"
              />
              <div className="">
                <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                  {post?.name}
                </h2>

                <p className="text-gray-700">{post.title}</p>
                <p className="mt-3 text-gray-700 text-sm">{post.content}</p>
                <div className="mt-4 flex items-center">
                  <div className="flex mr-2 text-gray-700 text-sm ">
                    <button onClick={() => handleLike(post._id)}>
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                    <span>{post.likes}</span>
                  </div>
                  <button
                    onClick={() => setShow(!show)}
                    className="flex mr-2 text-gray-700 text-sm "
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-4 h-4 mr-1"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                    <span>{post.comments.length}</span>
                  </button>
                </div>
                {show && (
                  <div>
                    <div className="flex gap-5 mt-5 mb-5">
                      <input
                        className="border-2 border-black rounded-lg p-1"
                        type="text"
                        placeholder="Add a comment"
                        onChange={(e) => setCommentInput(e.target.value)}
                      />
                      <button
                        onClick={() => handleAddComment(post._id, commentInput)}
                        className="bg-blue-500 text-white font-bold rounded-lg p-1"
                      >
                        Add Comment
                      </button>
                    </div>
                    <ul>
                      {post.comments.map((comment, index) => (
                        <li className="m-2" key={index}>
                          {comment.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
