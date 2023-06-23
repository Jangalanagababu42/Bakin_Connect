import React from "react";
import CreatePost from "./CreatePost";
import "./PostModal.css";

function PostModal({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="title">
          <h1>New Post</h1>
        </div>
        <div className="body">
          <CreatePost />
        </div>
      </div>
    </div>
  );
}

export default PostModal;
