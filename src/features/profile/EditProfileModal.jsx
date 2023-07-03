import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { BsCameraFill } from "react-icons/bs";

import { usePost } from "../../contexts/PostContext";
import { useUser } from "../../contexts/UserContext";

function EditProfileModal({ profile }) {
  const [profileData, setProfileData] = useState(profile);
  const { editUser } = useUser();
  const { setprofileModal } = useUser();
  const onChangeHandler = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const ProfileUpdateHandler = (e) => {
    e.stopPropagation();
    editUser(profileData);
    setprofileModal(false);
  };
  console.log(profile);
  return (
    <div className="fixed p-4 left-0 top-0 right-0 h-screen z-50 flex justify-center items-center bg-backgrounddim ">
      <div className="w-2/5 md:w-2/6 sm:w-full flex flex-col bg-white rounded-lg  ">
        <div className=" flex  justify-between">
          <p className=" font-semibold  text-xl ml-5 mt-2 p-2">Edit Profile</p>

          <button
            className="mr-5 mt-2 p-2  text-2xl"
            onClick={(e) => {
              e.stopPropagation();
              setprofileModal(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} style={{ color: "red" }} />
          </button>
        </div>
        <div className="m-5 p-2">
          <div className="flex flex-row gap-10">
            <div className="flex  justify-between">
              <p className=" font-semibold m-2 text-lg text-gray">Avatar</p>
            </div>
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt="im"
                className=" h-14 w-14  rounded-full"
              />
              <BsCameraFill className=" absolute bottom-0 right-0 text-lg" />
            </div>
          </div>
          <div className="flex flex-row gap-10">
            <div className="flex  justify-between">
              <p className=" font-semibold m-2 text-lg text-gray ">Name</p>
            </div>
            <div>
              <p className=" mt-3 text-sm ">
                {profile.firstName} {profile.lastName}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex  justify-between">
              <p className=" font-semibold m-2 text-lg text-gray ">Username</p>
            </div>
            <div>
              <p className=" mt-3 text-sm ">@{profile.username}</p>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex  justify-between">
              <label
                for="bio"
                className=" font-semibold m-2 text-lg text-gray "
              >
                Bio
              </label>
              <input
                type="text"
                id="bio"
                name="bio"
                size="39"
                value={profileData.bio}
                onChange={(e) => onChangeHandler(e)}
                className="border-gray rounded-sm outline h-6 py-2 my-2 ml-16 mr-2"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex  justify-between">
              <label
                for="website"
                className=" font-semibold m-2 text-lg text-gray "
              >
                Website
              </label>
              <input
                type="text"
                id="website"
                name="website"
                size="39"
                value={profileData.website}
                onChange={(e) => onChangeHandler(e)}
                className="border-gray rounded-sm outline h-6 py-2 my-2 ml-6 mr-2"
              />
            </div>
          </div>
        </div>
        <button
          className="w-1/4 bottom-3 py-1 px-2 my-1 mx-2 text-white bg-primary border-solid border-2 border-white rounded-xl cursor-pointer  text-lg  self-end"
          onClick={(e) => ProfileUpdateHandler(e)}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default EditProfileModal;
