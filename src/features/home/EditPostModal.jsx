import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CreatePost from "./CreatePost";
import { usePost } from "../../contexts/PostContext";

function EditPostModal({ editpost, setOpenMenu }) {
  const { editopenModal, setEditOpenModal } = usePost();
  console.log(editopenModal, "editopenModal");
  console.log();
  return (
    <div className="fixed p-4 left-0 top-0 right-0 h-screen z-50 flex justify-center items-center bg-backgrounddim ">
      <div className="w-3/5 md:w-2/6 sm:w-full flex flex-col bg-white rounded-lg  ">
        <div className=" flex  justify-between">
          <p className=" font-semibold  text-xl ml-5 mt-2 p-2">Create post</p>

          <button
            onClick={(e) => {
              console.log("onclick run");
              e.stopPropagation();
              setEditOpenModal(() => {
                console.log("edit inside onclick");
                return false;
              });
              setOpenMenu(false);
            }}
            className="mr-5 mt-2 p-2  text-2xl"
          >
            <FontAwesomeIcon icon={faXmark} style={{ color: "red" }} />
          </button>
        </div>
        <div>
          <CreatePost editpost={editpost} setOpenMenu={setOpenMenu} />
        </div>
      </div>
    </div>
  );
}

export default EditPostModal;
