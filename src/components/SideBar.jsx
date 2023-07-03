import {
  faBookmark,
  faCompass,
  faHeart,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PostModal from "../features/home/PostModal";
import { usePost } from "../contexts/PostContext";

const ActiveStyle = ({ isActive }) =>
  isActive
    ? { backgroundColor: "yellow", color: "black" }
    : { backgroundColor: "transparent", color: "black" };
const getNavItem = (iconName, text) => (
  <div className="block  m-6  ">
    <FontAwesomeIcon icon={iconName} />
    <span className="inline-block ml-3 text-xl items-start">{text}</span>
  </div>
);
function SideBar() {
  const { openModal, setOpenModal } = usePost();
  return (
    <div className="grid col-span-2 bg-slate-200 h-screen ">
      <div className="ml-5  ">
        <NavLink to="/" style={ActiveStyle}>
          {getNavItem(faHouse, "Home")}
        </NavLink>
        <NavLink to="/explore" style={ActiveStyle}>
          {getNavItem(faCompass, "Explore")}
        </NavLink>
        <NavLink to="/bookmarks" style={ActiveStyle}>
          {getNavItem(faBookmark, "Bookmark")}
        </NavLink>
        <NavLink to="/likedposts" style={ActiveStyle}>
          {getNavItem(faHeart, "LikedPosts")}
        </NavLink>
        <button
          className=" bg-primary	 w-3/4	 border-solid border-2 border-white rounded-2xl text-white	"
          onClick={() => setOpenModal(true)}
        >
          Post
        </button>
        {openModal && <PostModal closeModal={setOpenModal} />}
      </div>
    </div>
  );
}

export default SideBar;
