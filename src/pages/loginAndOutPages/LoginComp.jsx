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
    <div className="h-4/5 w-full ">
      <div className="h-3/5 md:h-2/3 flex justify-center items-end">
        <div className="relative w-full backdrop-blur-sm p-6 rounded-lg shadow-md">
          {errMsg && <ErrorMessage errMsg={errMsg} setErrMsg={setErrMsg} />}
          <form onSubmit={handleSubmit}>
            <input
              className="my-6 md:my-8 py-1 pl-2 block w-full rounded-md border-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-200 focus:shadow-lg focus:shadow-green-900 text-md md:text-xl"
              type="text"
              value={userCred.email}
              placeholder="Email address"
              onChange={(e) =>
                setUserCred((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              // autoComplete="new-password"
            />

            <input
              className="my-6 md:my-8 py-1 pl-2 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-200 focus:shadow-lg focus:shadow-green-900 text-md md:text-xl"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              value={userCred.password}
              onChange={(e) => {
                setUserCred((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
            />
            <div className="my-6 md:my-8 flex justify-between">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm md:text-lg font-semibold text-white shadow-sm bg-btn-color hover:bg-btn-color-hover focus:outline-cyan-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <p className="text-txt-pri-color text-sm md:text-lg">
              Need an account?
            </p>
            <Link to="/register">
              <span className="text-blue-600 px-2 text-sm md:text-lg">
                SignUp
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
