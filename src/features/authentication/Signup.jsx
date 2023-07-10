import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupService from "./services/SignupService";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";
import { USER_ACTIONS } from "../../reducers/UserReducer";
import { toast } from "react-toastify";
function Signup() {
  const defaultAvatar =
    " https://res.cloudinary.com/donqbxlnc/image/upload/v1651664931/avatar-1577909_960_720_cl1ooh.png";
  const { userDispatch } = useUser();
  const { setAuthToken, setAuthUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    avatarUrl: defaultAvatar,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
  });
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        signupData.firstName !== "" &&
        signupData.lastName !== "" &&
        signupData.email !== "" &&
        signupData.username !== "" &&
        signupData.password !== "" &&
        signupData.cpassword !== ""
      ) {
        if (signupData.password === signupData.cpassword) {
          const response = await SignupService(signupData);

          if (response.status === 201) {
            const { encodedToken, createdUser } = response.data;
            localStorage.setItem("authToken", encodedToken);
            localStorage.setItem("authUser", JSON.stringify(createdUser));
            setAuthToken(encodedToken);
            setAuthUser(createdUser);
            navigate("/");
            toast.success("Signed In Succesful");
            userDispatch({
              type: USER_ACTIONS.adduser,
              payload: { user: { ...createdUser, avatarUrl: defaultAvatar } },
            });
          }
        } else {
          toast.error("Passwords do not match");
        }
      } else {
        toast.error("Please provide all details");
      }
    } catch (error) {
      toast.error(error.response.data.errors[0]);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col
bg-white"
    >
      <div className="py-6 bg-offwhite flex justify-center">
        <div className="cursor-pointer flex items-center justify-center">
          <div>
            <img
              src="https://res.cloudinary.com/dzy0bigtz/image/upload/v1686311847/cake_icon_khhwjc.jpg"
              alt="logo"
              className="w-16 h-13"
            />
          </div>
          <div className="text-2xl text-primary tracking-wide ml-2 font-semibold">
            Bakin Connect
          </div>
        </div>
      </div>
      <div className="w-1/3  bg-white mt-4 px-4 self-center">
        <h2 className="text-center text-4xl text-primary font-display font-semibold">
          Sign up
        </h2>
        <div className="mt-5">
          <form onSubmit={(e) => signupHandler(e)}>
            <div className="flex flex-col">
              <div className="flex flex-grow gap-8">
                <div className="justify-self-strecth flex-grow">
                  <div className="text-sm font-bold text-gray tracking-wide">
                    First Name<span className="text-red">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full text-lg p-2 border-b border-gray focus:outline-none focus:border-primary 
                    "
                    placeholder="Mike"
                    value={signupData.firstName}
                    onChange={(e) =>
                      setSignupData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="justify-self-strecth flex-grow">
                  <div className="text-sm font-bold text-gray tracking-wide">
                    Last Name<span className="text-red">*</span>
                  </div>
                  <input
                    type="text"
                    className="w-full text-lg p-2 border-b border-gray focus:outline-none focus:border-primary 
                    "
                    placeholder="Sam"
                    value={signupData.lastName}
                    onChange={(e) =>
                      setSignupData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className=" mt-5 text-sm font-bold text-gray tracking-wide">
                Email Address<span className="text-red">*</span>
              </div>
              <div className="border-b border-gray ">
                <input
                  type="email"
                  className="w-full text-lg p-2 focus:outline-none"
                  placeholder="mike@gmail.com"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>
              <div className=" mt-5 text-sm font-bold text-gray tracking-wide">
                Username<span className="text-red">*</span>
              </div>
              <div className="border-b border-gray ">
                <input
                  type="text"
                  className="w-full text-lg p-2 focus:outline-none"
                  placeholder="@mike"
                  value={signupData.username}
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mt-5 flex flex-col flex-grow">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray tracking-wide">
                  Password<span className="text-red">*</span>
                </div>
              </div>
              <div className="flex items-center border-b border-gray">
                <input
                  type={showPassword ? `text` : `password`}
                  className="w-full text-lg p-2 focus:outline-none"
                  placeholder="Enter your password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                <span className="text-lg cursor-pointer">
                  <FontAwesomeIcon
                    icon={!showPassword ? faEye : faEyeSlash}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray tracking-wide">
                  Confirm Password<span className="text-red">*</span>
                </div>
              </div>
              <div className="flex items-center border-b border-gray">
                <input
                  type={showcPassword ? `text` : `password`}
                  className="w-full text-lg p-2 focus:outline-none"
                  placeholder="Re-Enter your password"
                  value={signupData.cpassword}
                  onChange={(e) =>
                    setSignupData((prev) => ({
                      ...prev,
                      cpassword: e.target.value,
                    }))
                  }
                />
                <span className="text-lg cursor-pointer">
                  <FontAwesomeIcon
                    icon={!showcPassword ? faEye : faEyeSlash}
                    onClick={() => setShowcPassword(!showcPassword)}
                  />
                </span>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <button
                className="bg-primary text-white p-3 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline active:bg-blue-500 shadow-lg"
                type="submit"
              >
                Signup
              </button>
            </div>
          </form>
          <div
            className="mt-5 text-sm font-display font-semibold text-gray text-center
       "
          >
            Already have an account ?
            <Link
              to="/login"
              className="cursor-pointer text-primary
        "
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
