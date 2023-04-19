import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { validateEmail } from "../../utils/validateLogin";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import ErrorMessage from "../../components/ErrorMessage";

const LoginComp = () => {
  const loginURL = import.meta.env.VITE_LOGIN_URL;
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home/ListPage";
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
      const accessToken = response?.data?.accessToken;
      setAuth({ email, accessToken });
      setErrMsg("");
      // navigate(from, { replace: true });
      navigate("/home/ListPage/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
      if (err.response?.status === 400) {
        setErrMsg("Login failed");
      }
      if (err.response?.status === 403) {
        setErrMsg("Email not found, please register");
      } else {
        console.error(err.message);
      }
      return;
    }
  };

  return (
    <div className="h-5/6 w-full ">
      <div className="h-3/5 md:h-2/3 flex justify-center items-end">
        <div className="relative w-80 md:w-full backdrop-blur-sm p-6 rounded-lg shadow-md">
          {errMsg && <ErrorMessage errMsg={errMsg} setErrMsg={setErrMsg} />}
          <form onSubmit={handleSubmit}>
            <label className="block text-md md:text-lg font-medium text-white md:text-gray-600">
              Email Address
            </label>

            <input
              className="my-4 md:my-6 py-1 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-md md:text-xl"
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

            <label className="block text-md md:text-lg font-medium text-white md:text-gray-600">
              Password
              <input
                className="my-4 md:my-6 py-1 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-sm md:text-xl"
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
            <div className="my-4 md:my-6 flex justify-between">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm md:text-lg text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Login
              </button>
            </div>
          </form>
          <div>
            Need an account?
            <Link to="/register">
              <span className="text-blue-600 px-2">SignUp</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
