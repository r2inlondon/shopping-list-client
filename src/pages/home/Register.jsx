import { useState, Fragment } from "react";
import { validateEmail } from "../../utils/validateLogin";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const Register = () => {
  const [errMsg, setErrMsg] = useState("");
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

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

    setErrMsg("Password doesn't match");
    navigate("/userDashboard");
  };

  return (
    <div className="w-80 bg-white p-6 rounded-lg shadow-md py-16">
      <div>
        {errMsg && (
          <p
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {errMsg}
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <div>
            <label className="block text-md font-medium text-gray-700">
              First name
            </label>
            <input
              className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
              type="text"
              name="firstName"
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
            <label className="block text-md font-medium text-gray-700">
              Last name
            </label>
            <input
              className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
              type="text"
              name="lastName"
              value={newUser.lastName}
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

        <label className="block text-md font-medium text-gray-700">
          Email Address
        </label>
        <input
          className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
          type="text"
          name="email"
          autoComplete="new-password"
          value={newUser.email}
          onChange={(e) => {
            setNewUser((prevState) => ({
              ...prevState,
              email: e.target.value,
            }));
          }}
          required
        />

        <label className="block text-sm font-medium text-gray-700">
          Password
          <input
            className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
            type="password"
            name="password"
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
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
          <input
            className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
            type="password"
            name="password"
            autoComplete="new-password"
            value={newUser.confirmPassword}
            onChange={(e) => {
              setNewUser((prevState) => ({
                ...prevState,
                confirmPassword: e.target.value,
              }));
            }}
            required
          />
        </label>
        <div className="flex justify-between">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;