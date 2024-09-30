import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    const prev = localStorage.getItem(`signupData`);
    if (prev) {
      setUserData(JSON.parse(prev));
    }
  }, []);
  const getLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ValidUser = userData.find(
      (user) =>
        user.email == loginData.email && user.password == loginData.password
    );
    if (ValidUser) {
      localStorage.setItem(`loginData`, JSON.stringify(ValidUser));
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <div className="flex justify-center text-center mt-[90px]">
      <div>
        <div className="flex items-center justify-center mb-2">
          <p className="text-[2rem]">Login</p>
          <p className="w-8 md:w-11 h-[3px] bg-[#414141]"></p>
        </div>
        <input
          onChange={getLoginData}
          type="text"
          name="email"
          className="border-2 border-gray-400 py-2 indent-4 w-[400px] mb-3 "
          placeholder="Email"
        />
        <br />
        <input
          onChange={getLoginData}
          type="password"
          name="password"
          className="border-2 border-gray-400 py-2 indent-4  w-[400px] "
          placeholder="Password"
        />
        <div className="flex justify-between">
          <p className="cursor-pointer">Forgot your password?</p>
          <p className="cursor-pointer" onClick={() => navigate("/signup")}>
            Create account
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 mt-3 rounded-md"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Login;
