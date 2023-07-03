import { faFaceSmile, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { usePost } from "../../contexts/PostContext";
import { useUser } from "../../contexts/UserContext";

function CreatePost({ editpost }) {
  const { setOpenModal, setEditOpenModal } = usePost();
  console.log(editpost, "editpost");
  const [content, setContent] = useState(editpost ? editpost.content : "");
  const { addPostHandler, editPostHandler } = usePost();
  const { filterAuthUser } = useUser();
  const [disable, setDisable] = useState(true);

  const handlePost = (e) => {
    setContent(e.target.value);
    if (content !== "") {
      setDisable(false);
    }
  };
  const addPost = (e) => {
    e.preventDefault();
    if (content !== "" && content.length > 0) {
      if (editpost) {
        editPostHandler(content, editpost._id);

        e.stopPropagation();
        setEditOpenModal(false);
      } else {
        addPostHandler(content);
        setOpenModal(false);
      }
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
          src={filterAuthUser?.avatarUrl}
          alt="avatar"
        />
        <textarea
          name=""
          id=""
          cols="50"
          rows="5"
          value={content}
          onChange={(e) => handlePost(e)}
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
          className="absolute right-0 bottom-3 py-1 px-5 my-1 mx-3 text-white bg-primary border-solid border-2 border-white rounded-2xl cursor-pointer"
          onClick={(e) => addPost(e)}
          disabled={disable}
        >
          {editpost ? "Update" : "Post"}
        </button>
      </ul>
    </div>
  );
}

export default CreatePost;
