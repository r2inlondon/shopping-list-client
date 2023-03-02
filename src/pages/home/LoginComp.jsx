import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { validateEmail } from "../../utils/validateLogin";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const LoginComp = () => {
  const loginURL = import.meta.env.VITE_LOGIN_URL;
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();


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
      console.log({response})
      const accessToken = response?.data?.accessToken;
      setAuth({ email, password, accessToken });
      setErrMsg("");
      // navigate("/userDashboard");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
      if (err.response?.status === 400) {
        setErrMsg("Login Failed");
      }
      return;
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
            autoComplete="new-password"
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
            className="w-full inline-flex justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>
      </form>
      <div className="my-4">
        Need an account?
        <Link to="/register">
          <span className="text-blue-600 px-2">SignUp</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginComp;
