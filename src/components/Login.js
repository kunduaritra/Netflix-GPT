import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateCredentials } from "../utils/validate";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const email = useRef();
  const password = useRef();

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setIsForgetPassword(false);
  };

  const toggleForgetPassword = () => {
    setIsForgetPassword(!isForgetPassword);
  };

  const handleSignBtn = () => {
    if (!isForgetPassword) {
      const responseValidation = validateCredentials(
        email.current.value,
        password.current.value
      );
      setMessage(responseValidation);
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/1d29f9a4-1900-43dc-a420-99044f734ee2/cc3b7bcb-3f79-449e-a37c-26ffb20fce3c/IN-en-20240826-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7a193436-88c7-4f66-a8f0-e191d3b26d13_medium.jpg"
          alt="background"
        />
      </div>
      <div className="flex items-center justify-center h-screen w-full ">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative bg-black bg-opacity-85 w-[400px] h-[550px] p-16 text-white mx-auto right-0 left-0 rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-6">
            {isSignUp && !isForgetPassword && "Sign Up"}
            {!isSignUp && !isForgetPassword && "Sign In"}
            {isForgetPassword && "Reset Password"}
          </h2>
          {isSignUp && !isForgetPassword && (
            <input
              className="p-2 m-2 w-11/12 bg-black border border-gray-400 rounded-md"
              type="text"
              placeholder="Full Name"
            />
          )}
          <input
            ref={email}
            className="p-2 m-2 w-11/12 bg-black border border-gray-400 rounded-md"
            type="text"
            placeholder="Email"
          />
          {!isForgetPassword && (
            <input
              ref={password}
              className="p-2 m-2 w-11/12 bg-black border border-gray-400 rounded-md"
              type="password"
              placeholder="Password"
            />
          )}
          <p className="text-red-600 px-2 font-semibold">{message}</p>
          <button
            onClick={handleSignBtn}
            className="p-2 m-2 w-11/12 rounded-md bg-red-600 font-semibold text-white"
          >
            {isSignUp && !isForgetPassword && "Sign Up"}
            {!isSignUp && !isForgetPassword && "Sign In"}
            {isForgetPassword && "Reset Password"}
          </button>
          {!isForgetPassword && (
            <p
              onClick={toggleForgetPassword}
              className="text-sm font-semibold text-center hover:underline cursor-pointer"
            >
              Forgot password?
            </p>
          )}
          {isSignUp && (
            <div className="space-x-1 my-3">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
          )}
          <p className="my-4" onClick={toggleSignUp}>
            {isSignUp ? (
              <>
                <span className="text-gray-400">Already a user?</span>{" "}
                <span className="hover:underline cursor-pointer">
                  Sign In now.
                </span>
              </>
            ) : (
              <>
                <span className="text-gray-400">New to Netflix?</span>{" "}
                <span className="hover:underline cursor-pointer">
                  Sign Up now.
                </span>
              </>
            )}
          </p>
          <p className="mt-10">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
