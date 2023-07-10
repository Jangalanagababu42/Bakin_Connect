import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

import Searchbar from "./Searchbar";
import { useUser } from "../contexts/UserContext";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { filterAuthUser } = useUser();
  return (
    <div className=" flex flex-row w-full h-20   p-3 justify-between  sticky top-0 z-40 shadow-xl bg-white ">
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
        <Searchbar />
      </div>
      <div className="flex flex-row  gap-8 ">
        <div className="flex relative">
          <FontAwesomeIcon
            icon={faMoon}
            size="lg"
            className=" flex  justify-center absolute top-5 cursor-pointer "
          />
        </div>
        <Link to={`/profile/${filterAuthUser?.username}`}>
          <img
            className="  h-10 w-10 rounded-full object-cover m-2 "
            src={filterAuthUser?.avatarUrl}
            alt="avatar"
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
