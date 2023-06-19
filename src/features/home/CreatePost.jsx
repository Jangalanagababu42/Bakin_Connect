import { faFaceSmile, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { usePost } from "../../contexts/PostContext";

function CreatePost() {
  const [content, setContent] = useState();
  const { addPostHandler } = usePost();
  const addPost = (e) => {
    e.preventDefault();
    //////console.log(content, "content");
    if (content !== "") {
      addPostHandler(content);
      setContent("");
    } else {
      alert("Please enter a post");
    }
  };

  return (
    <div className=" flex flex-col justify-center gap-4 rounded-lg	 shadow-md">
      <div className=" flex flex-row">
        <img
          className="  h-14 w-14 rounded-full object-cover m-2"
          src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
          alt="avatar"
        />
        <textarea
          name=""
          id=""
          cols="50"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write Something.."
          className="outline-none mt-4 pt-4"
        ></textarea>
      </div>
      <hr />
      <ul className="flex flex-row relative">
        <li className="p-4 m-2">
          <FontAwesomeIcon icon={faImage} size="lg" />
        </li>
        <li className="p-4 m-2">
          <FontAwesomeIcon icon={faFaceSmile} size="lg" />
        </li>
        <button
          className="absolute right-0 bottom-3 py-1 px-5 my-1 mx-3 text-white bg-primary border-solid border-2 border-white rounded-2xl"
          onClick={(e) => addPost(e)}
        >
          post
        </button>
      </ul>
    </div>
  );
}

export default CreatePost;
