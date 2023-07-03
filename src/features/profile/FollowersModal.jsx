import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function FollowersModal({ followerData }) {
  const navigate = useNavigate();
  const { setFollowerModal } = useUser();
  return (
    <div className="fixed p-4 left-0 top-0 right-0 h-screen z-50 flex justify-center items-center bg-backgrounddim ">
      <div className="w-2/5 md:w-2/6 sm:w-full flex flex-col bg-white rounded-lg  ">
        <div className=" flex  justify-between">
          <p className=" font-semibold  text-xl ml-5 mt-2 p-2">Followers</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setFollowerModal(false);
            }}
            className="mr-5 mt-2 p-2  text-2xl"
          >
            <FontAwesomeIcon icon={faXmark} style={{ color: "red" }} />
          </button>
        </div>
        <div className="flex w-full flex-col gap-4   max-h-96 z-50 overflow-y-visible rounded-lg   bg-white 		">
          {followerData.length === 0 ? (
            <p className="text-center text-lg m-1 font-medium   ">
              No Followers to show
            </p>
          ) : (
            followerData.map((user) => {
              return (
                <div
                  key={user._id}
                  onClick={(e) => {
                    navigate(`/profile/${user.username}`);
                    e.stopPropagation();
                    setFollowerModal(false);
                  }}
                  className="px-4 pt-3 last-of-type:pb-3 cursor-pointer  flex gap-4 items-center bg-white"
                >
                  <img
                    className="w-14  h-14 object-cover rounded-full"
                    src={user.avatarUrl}
                    alt="user pic"
                  />
                  <p className="font-medium text-lg text-txt-secondary-color dark:text-dark-txt-secondary-color">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowersModal;
