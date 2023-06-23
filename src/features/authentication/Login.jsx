import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LoginService from "./services/LoginService";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const { setAuthToken, setAuthUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const GuestData = {
    username: "adarshbalika",
    password: "adarshBalika123",
  };
  const LoginPageHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginService(loginData);

      if (response.status === 200) {
        const { encodedToken, foundUser } = response.data;
        localStorage.setItem("authToken", encodedToken);
        localStorage.setItem("authUser", JSON.stringify(foundUser));
        setAuthToken(encodedToken);
        setAuthUser(foundUser);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.errors[0], "error");
    }
  };
  const GuestModeLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginService(GuestData);
      if (response.status === 200) {
        const { encodedToken, foundUser } = response.data;
        localStorage.setItem("authToken", encodedToken);
        localStorage.setItem("authUser", JSON.stringify(foundUser));
        setAuthToken(encodedToken);
        setAuthUser(foundUser);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.errors[0], "error");
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
      <div className="w-1/2  bg-white mt-10 px-12 self-center">
        <h2 className="text-center text-4xl text-primary font-display font-semibold">
          Sign in
        </h2>
        <div className="mt-12">
          <form>
            <div className="flex flex-col">
              <div className="text-sm font-bold text-gray tracking-wide">
                UserName
                <span className="text-red">*</span>
              </div>
              <div className="border-b border-gray ">
                <input
                  type="text"
                  className="w-full text-lg p-2 focus:outline-none"
                  placeholder="mike@gmail.com"
                  value={loginData.username}
                  onChange={(e) =>
                    setLoginData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  required={true}
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray tracking-wide">
                  Password <span className="text-red">*</span>
                </div>
              </div>
              <div className="flex items-center border-b border-gray">
                <input
                  type={showPassword ? `text` : `password`}
                  className="w-full text-lg p-2 focus:outline-none"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData((prev) => ({
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
            </div>
            <div className="mt-10 flex flex-col gap-4">
              <button
                className="bg-primary text-white p-3 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline active:bg-blue-500 shadow-lg"
                type="submit"
                onClick={(e) => {
                  LoginPageHandler(e);
                }}
              >
                Log In
              </button>
              <button
                className="bg-primary text-white p-3 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline active:bg-blue-500 shadow-lg"
                onClick={(e) => GuestModeLogin(e)}
              >
                Guest Mode
              </button>
            </div>
          </form>
          <div
            className="mt-12 text-sm font-display font-semibold text-gray text-center
           "
          >
            Don't have an account ?
            <Link
              to="/signup"
              className="cursor-pointer text-primary
            "
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
