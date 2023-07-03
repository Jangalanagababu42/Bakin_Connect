import React from "react";
import CreatePost from "./CreatePost";
import "./PostModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { usePost } from "../../contexts/PostContext";
{
}

function PostModal() {
  const { setOpenModal } = usePost();
  return (
    <div className="fixed p-4 left-0 top-0 right-0 h-screen z-50 flex justify-center items-center bg-backgrounddim">
      <div className="w-2/5 md:w-2/6 sm:w-full flex flex-col bg-white rounded-lg ">
        <div className=" flex  justify-between">
          <p className=" font-semibold  text-xl ml-5 mt-2 p-2">Create post</p>

          <button
            onClick={() => setOpenModal(false)}
            className="mr-5 mt-2 p-2  text-2xl"
          >
            <FontAwesomeIcon icon={faXmark} style={{ color: "red" }} />
          </button>
        </div>
        <div>
          <CreatePost />
        </div>
      </div>
    </div>
  );
}

export default PostModal;
