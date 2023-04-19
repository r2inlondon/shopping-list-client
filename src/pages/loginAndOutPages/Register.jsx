import { useState } from "react";
import { validateEmail } from "../../utils/validateLogin";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import ErrorMessage from "../../components/ErrorMessage";

const Register = () => {
  const registerURL = import.meta.env.VITE_REGISTER_URL;
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home/ListPage";
  const [errMsg, setErrMsg] = useState("");
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } = newUser;

    if (!validateEmail(email)) {
      setErrMsg("Invalid Email");
      return;
    }

    if (password != confirmPassword) {
      setErrMsg("Password doesn't match");
      return;
    }

    try {
      const response = await axios.post(
        registerURL,
        JSON.stringify({ firstName, lastName, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      setAuth({ email, accessToken });
      setErrMsg("");
      // navigate("/userDashboard");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err.response.error);
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
      if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      }
      if (err.response?.status === 400) {
        setErrMsg("Registration Failed");
      }
      return;
    }
  };

  return (
    <div className="h-3/4 md:h-4/6 w-full flex justify-center items-center">
      <div className="w-full backdrop-blur-sm p-6 rounded-lg shadow-md">
        {errMsg && <ErrorMessage errMsg={errMsg} setErrMsg={setErrMsg} />}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between my-6 md:my-8">
            <div>
              <input
                className="py-1 pl-2 w-11/12 rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-md md:text-xl"
                type="text"
                name="firstName"
                placeholder="First name"
                value={newUser.firstName}
                onChange={(e) => {
                  setNewUser((prevState) => ({
                    ...prevState,
                    firstName: e.target.value,
                  }));
                }}
                required
              />
            </div>
            <div>
              <input
                className="py-1 pl-2 w-full  rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-md md:text-xl"
                type="text"
                name="lastName"
                placeholder="Last name"
                value={newUser.lastName}
                autoComplete="new-password"
                onChange={(e) => {
                  setNewUser((prevState) => ({
                    ...prevState,
                    lastName: e.target.value,
                  }));
                }}
                required
              />
            </div>
          </div>

          <input
            className="my-6 md:my-8 py-1 pl-2 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-md md:text-xl"
            type="text"
            name="email"
            autoComplete="password"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => {
              setNewUser((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
            required
          />

          <input
            className="my-6 md:my-8 py-1 pl-2 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-md md:text-xl"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={newUser.password}
            onChange={(e) => {
              setNewUser((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
            }}
            required
          />

          <input
            className="my-6 md:my-8 py-1 pl-2 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 text-md md:text-xl"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Confirm password"
            value={newUser.confirmPassword}
            onChange={(e) => {
              setNewUser((prevState) => ({
                ...prevState,
                confirmPassword: e.target.value,
              }));
            }}
            required
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className=" my-6 md:my-8 py-1 w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="my-4 flex justify-center">
          <p className="text-txt-pri-color text-md md:text-xl">Back to</p>
          <Link to="/home">
            <span className="text-blue-600 px-2 text-md md:text-xl">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
