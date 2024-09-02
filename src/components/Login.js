import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateCredentials } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { BACKGROUND_IMAGE } from "../utils/constants";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setIsForgetPassword(false);
  };

  const toggleForgetPassword = () => {
    setIsForgetPassword(!isForgetPassword);
  };

  const handleSignBtn = () => {
    console.log("Ecexuted a");
    if (!isForgetPassword) {
      const responseValidation = validateCredentials(
        email.current.value,
        password.current.value
      );

      if (responseValidation !== null) {
        setErrorMessage(responseValidation);
        return;
      }
      if (isSignUp) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed up
            updateProfile(auth.currentUser, {
              displayName: name.current.value,
            })
              .then(() => {
                const { uid, email, displayName } = auth.currentUser;
                dispatch(
                  addUser({ uid: uid, email: email, displayName: displayName })
                );
              })
              .catch((error) => {
                setErrorMessage(error);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " : " + errorMessage);
            // ..
          });
        setErrorMessage(responseValidation);
      } else {
        // Sign In Code
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " : " + errorMessage);
          });
      }

      setErrorMessage(null);
    }
    if (isForgetPassword) {
      sendPasswordResetEmail(auth, email.current.value)
        .then((response) => {
          setErrorMessage("Password reset email sent!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " : " + errorMessage);
          // ..
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BACKGROUND_IMAGE} alt="background" />
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
              ref={name}
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
          <p className="text-red-600 px-2 font-semibold">{errorMessage}</p>
          <button
            onClick={handleSignBtn}
            className="p-2 m-2 w-11/12 rounded-md bg-red-600 font-semibold text-white hover:bg-red-800"
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
