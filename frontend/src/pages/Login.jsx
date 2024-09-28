import React, { useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate(); // to navigate to other page within the app

  const [email, setEmail] = useState(""); // stores the user's email
  const [password, setPassword] = useState(""); // stores the user's password
  const [errorMessage, setErrorMessage] = useState(""); // stores the error messages

  // this function allows the user to login using his/her valid email and password
  const logginIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("You need to provide full infos");
      console.log("Error Message: " + errorMessage);
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        // logged in
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("User details---> ", user);
          navigate("/homepage");
        })

        // error handler
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Error message-->", errorMessage + ". " + errorCode);
        });
    }
  };

  return (
    <section className="md:flex flex-col h-screen">
      <div className="w-full text-center sm:grid grid-cols-2 h-[80%]">
        <div className="hidden md:block max-h-[80%]">
          <img
            src="https://i.pinimg.com/564x/27/4e/cf/274ecfb6bf739aaeb328d689d8e6776a.jpg"
            alt="..."
            className="md:ml-auto max-h-[92%] mt-[6%] mr-6 rounded-lg md:max-h-[86%]"
          ></img>
        </div>
        <div className="flex h-full w-full md:max-h-[80%]">
          <div className="md:w-[50%] my-auto">
            <div className="flex flex-col items-center">
              <img
                src="https://www.dafont.com/forum/attach/orig/8/1/815933.png?1"
                className="w-3/5 m-10 md:w-48"
              ></img>
              <div className="flex-col flex gap-1 w-5/6">
                <input
                  type="text"
                  placeholder="Phone number, username, or email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white mt-2 py-1.5 rounded-lg hover:bg-blue-600"
                  onClick={logginIn}
                >
                  Log in
                </button>
              </div>
              <div className="flex w-5/6 items-center my-3 gap-3">
                <span className="bg-gray-300 h-0.5 w-full" />
                <h1 className="text-[0.8rem] font-bold">OR</h1>
                <span className="bg-gray-300 h-0.5 w-full" />
              </div>
              <div>
                <div className="mt-4 flex gap-1 items-center cursor-pointer justify-center">
                  <AiFillFacebook className="text-[1.5rem]" />
                  <h1 className="text-blue-950 font-bold">
                    Login with Facebook
                  </h1>
                </div>
                <p className="text-[0.8rem] mt-3 cursor-pointer">
                  Forgot password?
                </p>
                <h1 className="mt-24 lg:mt-10">
                  Don't have an account?&nbsp;
                  <span
                    className="font-bold cursor-pointer hover:text-blue-600"
                    onClick={() => navigate("/signup")}
                    title="Sign Up"
                  >
                    Sign up
                  </span>
                </h1>
              </div>
              <div className="mt-24 md:mt-20">
                <p>Get the app</p>
                <div className="flex gap-2 mt-2">
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
        </div>
      </div>

      <div className="w-full max-h-full mx-auto px-10 my-auto">
        <div className="sm:flex">
          <div className="flex flex-col text-[0.8rem] w-full mt-8 sm:flex-row  ">
            <div className="flex flex-row justify-center gap-2">
              <p>Meta</p>
              <p>About</p>
              <p>Blog</p>
              <p>Jobs</p>
              <p>Help</p>
              <p>API</p>
              <p>Privacy</p>
              <p>Terms</p>
            </div>
            <div className="flex gap-3 mx-auto">
              <p>Locations</p>
              <p>Instagram Lite</p>
              <p>Threads</p>
            </div>
            <div className="flex gap-3 mx-auto">
              <p>Contact Uploading & Non-Users</p>
              <p>Meta Verified</p>
            </div>
          </div>
        </div>

        <div className="flex w-full text-[0.8rem] justify-center gap-4 mt-4">
          <div className="flex">
            <a>English</a>
            <i class="bi bi-caret-down"></i>
          </div>
          <div className="flex">
            <i class="bi bi-c-circle"></i>
            <a>2024 Instagram from meta</a>
          </div>
        </div>
      </div>
    </section>
  );
}
