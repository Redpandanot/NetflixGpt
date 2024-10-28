import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleButtonClick = (e) => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAYCAwUBB//EADUQAAEEAQAHBQYFBQAAAAAAAAEAAgMEEQUGEiExQVEiMmFxgRQzQqGxwRNikdHhFSRSkrL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuKIiAiLCSRrOJ39EGaKK6y74QB5rUbm/3rB6hBPRQmWnneHNcFuZZae8MIN6LwHPBeoCIiAiLCV+wwnnyQa55tnst730UC3YZWryTy5LWDJ6nwW0nJyVzNY8/0efHVv/QQVi/pKzeeTLIQzlG09kfuoeB0XqKD1jjG4OjJa4c2nBVn1d0tJZcatp21IBljzxPgVV10NAEjTFbHV2f9SqLxFK6M7t45hTWuDgCDuK563VpNl+yeBQS0REBRbbu0G9FKUKx753og1qDpwA6Js5/xH1CnKPfr+10poM4L24B8eXzQUJFlNE+GV0crSx7TgtPJYqAurqywP0swn4GOd8sfdcpWHVihKJfbZBsxlpDOrvHyQWRERUT2HaYD1CyWuv7pq2ICh2RiXPUKYtFpmWh3RBFRFCt6VpVCRLO0vHwM7R+XBBy9aqILW3WYBGGyDr0Kra7el9OMu1nV4IXNY4glzzv3b+H8riKCRo+qblyKuHbO2d7ugAyfor1DGyGJkUYwxgAaPBUWhaNK5HYa0OLM9k88gj7qzV9YqUuBKJIT+YZH6hUddFhFLHMwPhe17Dwc05C2xt23hvVBMhGIm+SzQIgLwjIwvUQU/W2a7XlbCzMdV43Pae+eYJ+yrK+oWq0NuB0NiMPjdxBVO0rqxZrOMlMGxD0Hfb6c/T9EHARHAtcWuBDhxBGCEUBEUqjo+3feG1YXPHN3Bo9UGFK1YqTB9V5Die6N4d4Ec19Gotf+AySVn4crmguZnOz4Lm6E1eh0cRNMRLZ5O+Fnl+67aoIiICIiAiIg0WadW0P7mvFL0L2gkKC7V3RLjn2QDye4fddVEHPh0JoyE5ZSiJ/MNr6qeAGgBoAA4AL1EBERAREQf//Z",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_small.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" absolute p-12 bg-black w-1/4 my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-md"
      >
        <h1 className="font-bold text-2xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-2 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-2 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New To Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
