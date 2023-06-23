import { faMagnifyingGlass, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { authUser } = useAuth();

  return (
    <div className=" flex flex-row w-full h-20   p-3 justify-between  sticky top-0 z-40 shadow-xl bg-white">
      <div
        className="h-16 w-16 flex col-span 
       "
      >
        {/* <Link to="/"> */}
        <img
          className="flex justify-center "
          src="https://res.cloudinary.com/dzy0bigtz/image/upload/v1686311847/cake_icon_khhwjc.jpg"
          alt="logo"
        />
        {/* </Link> */}

        <Link to="/">
          <span className="flex justify-center	">
            <span className="text-primary font-semibold ">Bakin</span>{" "}
            <span className="text-primary font-semibold pl-2">Connect</span>
          </span>
        </Link>
      </div>
      <div className="flex  justify-center h-8 relative pt-3  ">
        <input
          type="search"
          placeholder="Search for User.."
          className=" border-solid border-2 border-primary rounded-2xl p-4 outline-none"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute top-2 right-2 flex justify-center pt-3 "
        />
      </div>
      <div className="flex flex-row  gap-8 ">
        <div className="flex relative">
          <FontAwesomeIcon
            icon={faMoon}
            size="lg"
            className=" flex  justify-center absolute top-5 cursor-pointer "
          />
        </div>
        <Link to={`/profile/${authUser?.username}`}>
          <img
            className="  h-10 w-10 rounded-full object-cover m-2 "
            src={
              authUser?.avatarUrl
                ? authUser?.avatarUrl
                : `https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png`
            }
            alt="avatar"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
