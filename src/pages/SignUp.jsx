import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this for navigation

function SignUp() {
  const [newSignup, setNewSignUp] = useState([]);
  const [signupData, setSignupData] = useState({});
  const navigate = useNavigate();

  // Handle input data
  function getSignupData(event) {
    setSignupData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  useEffect(() => {
    const prevData = localStorage.getItem("signupData");
    if (prevData) {
      setNewSignUp(JSON.parse(prevData));
    }
  }, []);

  function handleSignup() {
    if (!signupData.name || !signupData.email || !signupData.password) {
      alert("Please fill out all fields!");
      return;
    }

    const existingUser = newSignup.find(
      (user) => user.name === signupData.name || user.email === signupData.email
    );

    if (existingUser) {
      alert("User already exists!");
      return;
    } else {
      const updatedSignup = [...newSignup, signupData];

      localStorage.setItem("signupData", JSON.stringify(updatedSignup));

      setNewSignUp(updatedSignup);

      alert("User has been registered successfully!");

      navigate("/login");
    }
  }

  return (
    <div className="flex justify-center text-center mt-[90px]">
      <div>
        <div className="flex items-center justify-center mb-2">
          <p className="text-[2rem]">Signup</p>
          <p className="w-8 md:w-11 h-[3px] bg-[#414141]"></p>
        </div>
        <input
          onChange={getSignupData}
          type="text"
          name="name"
          value={signupData.name || ""}
          className="border-2 border-gray-400 py-2 indent-4 w-[400px] mb-3"
          placeholder="Name"
        />
        <br />
        <input
          onChange={getSignupData}
          type="text"
          name="email"
          value={signupData.email || ""}
          className="border-2 border-gray-400 py-2 indent-4 mb-3  w-[400px] "
          placeholder="Email"
        />
        <br />
        <input
          onChange={getSignupData}
          name="password"
          type="password"
          value={signupData.password || ""}
          className="border-2 border-gray-400 py-2 indent-4 mb-3  w-[400px] "
          placeholder="Password"
        />
        <div className="flex justify-between">
          <p className="cursor-pointer">Forgot your password?</p>
          <p className="cursor-pointer" onClick={() => navigate("/login")}>
            Login Here
          </p>
        </div>
        <div>
          <button
            onClick={handleSignup}
            className="bg-black text-white px-4 py-2 mt-3 rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
