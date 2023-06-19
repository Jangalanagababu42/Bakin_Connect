import {
  faBookmark,
  faCompass,
  faHeart,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

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
        <button className=" bg-primary	 w-3/4	 border-solid border-2 border-white rounded-2xl text-white	">
          Post
        </button>
      </div>
      <div></div>
      {/* <ul className=" px-20">
        <li>
          <div className=" flex items-center">
            <FontAwesomeIcon icon={faHouse} />
            <NavLink className="ml-2" to="/">
              Home
            </NavLink>
          </div>
        </li>
        <li>
          <div>
            <FontAwesomeIcon icon={faCompass} />
            <NavLink to="/explore">Explore</NavLink>
          </div>
        </li>
        <li>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
            <NavLink to="/bookmarks">BookMark</NavLink>
          </div>
        </li>
        <li>
          <div>
            <FontAwesomeIcon icon={faHeart} />
            <NavLink to="/likedposts">LikedPosts</NavLink>
          </div>
        </li>
      </ul> */}
    </div>
  );
}

export default SideBar;
