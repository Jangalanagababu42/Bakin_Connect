import {
  faFaceSmile,
  faImage,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { usePost } from "../../contexts/PostContext";
import { useUser } from "../../contexts/UserContext";

function CreatePost({ editpost, setOpenMenu }) {
  const { setOpenModal, setEditOpenModal } = usePost();

  const [filename, showFileName] = useState("");
  const initialPostData = {
    content: "",
    mediaURL: "",
  };
  const [postInputForm, setPostInputForm] = useState(
    editpost
      ? { content: editpost.content, mediaURL: editpost.mediaURL }
      : initialPostData
  );
  const { addPostHandler, editPostHandler } = usePost();
  const { filterAuthUser } = useUser();

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    showFileName(file.name);

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    let base64File = await toBase64(file);
    setPostInputForm({ ...postInputForm, mediaURL: base64File });
  };

  const addPost = (e) => {
    e.preventDefault();

    if (editpost) {
      editPostHandler(postInputForm, editpost._id);

      e.stopPropagation();
      setEditOpenModal(false);
      setOpenMenu(false);
      toast.success("Updated Successfully");
    } else {
      addPostHandler(postInputForm);
      setOpenModal(false);
      toast.success("Created Successfully");
    }
    setPostInputForm(initialPostData);
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
          value={postInputForm.content}
          onChange={(e) =>
            setPostInputForm({
              ...postInputForm,
              content: e.target.value,
            })
          }
          placeholder="Write Something.."
          className="outline-none mt-4 pt-4"
        ></textarea>
      </div>
      <hr />
      <ul className="flex flex-row relative z-10">
        <div className="flex flex-row">
          <li className="p-4 m-2">
            <input
              type="file"
              accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
              name=""
              id=""
              className="absolute left-8 opacity-0 cursor-pointer w-2"
              onChange={(e) => onFileChange(e)}
            />
            <FontAwesomeIcon
              icon={faImage}
              size="lg"
              className=" cursor-pointer"
            ></FontAwesomeIcon>
          </li>
          <li className="p-4 m-2">
            <FontAwesomeIcon icon={faFaceSmile} size="lg" />
          </li>
          <div>
            {postInputForm.mediaURL ? (
              <div className="relative w-40 p-2 z-40 ">
                <div className=" bg-pink rounded-xl flex flex-row gap-8 p-1 ">
                  <div>{filename}</div>
                  <div>
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() =>
                        setPostInputForm({ ...postInputForm, mediaURL: "" })
                      }
                      className=" text-sm absolute top-2 right-2  text-txt-hover-color cursor-pointer fas fa-times-circle p-4 "
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <button
          className="absolute right-0 bottom-3 py-1 px-5 my-1 mx-3 text-white bg-primary border-solid border-2 border-white rounded-2xl cursor-pointer"
          onClick={(e) => addPost(e)}
          disabled={
            postInputForm.content === "" && postInputForm.mediaURL === ""
          }
        >
          {editpost ? "Update" : "Post"}
        </button>
      </ul>
    </div>
  );
}

export default CreatePost;
