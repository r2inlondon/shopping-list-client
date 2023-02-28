import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { validateEmail } from "../../utils/validateLogin";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";

const LoginComp = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginURL = import.meta.env.VITE_LOGIN_URL;
    const { email, password } = userCred;

    if (!validateEmail(email)) {
      setErrMsg("Please enter a valid email");
      return;
    }

    try {
      const response = await axios.post(
        loginURL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setErrMsg("");
      return navigate("/userDashboard");
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  return (
    <div className="w-80 bg-white p-6 rounded-lg shadow-md">
      {errMsg && (
        <p
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {errMsg}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label className="block text-md font-medium text-gray-700">
          Email Address
        </label>

        <input
          className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
          type="text"
          value={userCred.email}
          onChange={(e) =>
            setUserCred((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
          // autoComplete="new-password"
        />

        <label className="block text-sm font-medium text-gray-700">
          Password
          <input
            className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
            type="password"
            // autoComplete="new-password"
            value={userCred.password}
            onChange={(e) => {
              setUserCred((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
            }}
          />
        </label>
        <div className="flex justify-between">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginComp;
