import React, { useState, useEffect } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !fullname || !username || !password) {
        setErrorMessage("Provide a valid details!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (usreCredentials) => {
            const user = usreCredentials.user;
            console.log("User details---> ", user);
            updateProfile(user, {
              displayName: username,
            }).then(() => {
              setTimeout(() => {
                navigate("/homepage");
              }, 1000);
            });
          }
        );
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage("Error: ", error.response.status) +
          error.response.statusText;
        console.log(errorMessage);
      } else if (error.request) {
        setErrorMessage("Error: ", error.request.status) +
          error.response.statusText;
        console.log(errorMessage);
      } else {
        setErrorMessage("Error: ", error.message);
        console.log(errorMessage);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-[80%] max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md sm:w-full">
        {/* Instagram Logo */}
        <img
          src="https://www.dafont.com/forum/attach/orig/8/1/815933.png?1"
          className="w-[50%] m-auto"
        ></img>

        <div className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center gap-2">
          <AiFillFacebook className="text-2xl" />
          <button>Log in with Facebook</button>
        </div>
        {/* Login with Facebook */}

        {/* Divider */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Mobile Number or Email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onSubmit}
          >
            Sign up
          </button>
        </form>

        {/* Log in Link */}
        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="#" className="font-medium text-blue-500 hover:text-blue-600">
            Log in
          </a>
        </div>

        {/* Get the App */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Get the app.</p>
          <div className="flex justify-center mt-2 space-x-4">
            <a
              href="https://play.google.com/store/search?q=instagram&c=apps&hl=hi"
              target="_blank"
              title="Instagram Playstore"
            >
              <img
                src="	https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
                className="w-[8.6rem] cursor-pointer hover:scale-110 transition duration-200"
              ></img>
            </a>
            <a
              href="https://apps.microsoft.com/detail/9nblggh5l9xt?hl=en-us&gl=IN"
              target="_blank"
              title="Instagram Microsoft store"
            >
              <img
                src="	https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
                className="w-28 cursor-pointer hover:scale-110 transition duration-200"
              ></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
