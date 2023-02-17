import { useState, Fragment } from "react";
import { validateEmail } from "../utils/validateLogin";
import { checkLogin } from "../api/api-calls.js";

const LoginComp = () => {
  const [userCred, setUserCred] = useState({
    email: "",
    pass: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmail = (e) => {
    e.preventDefault();

    setUserCred((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));

    const isValid = validateEmail(userCred.email);

    if (!isValid) {
      setErrorMessage("Please enter a valid email");
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await checkLogin(userCred);

    console.log({ isValid });
  };

  return (
    <Fragment>
      <form className="w-64" onSubmit={handleSubmit}>
        <label className="block text-md font-medium text-gray-700">
          Email Address
        </label>
        {errorMessage && (
          <p className="text-sm text-pink-600">{errorMessage}</p>
        )}
        <input
          className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
          type="text"
          value={userCred.email}
          onChange={handleEmail}
          autoComplete="new-password"
        />

        <label className="block text-sm font-medium text-gray-700">
          Password
          <input
            className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
            type="password"
            autoComplete="new-password"
            value={userCred.pass}
            onChange={(e) => {
              setUserCred((prevState) => ({
                ...prevState,
                pass: e.target.value,
              }));
            }}
          />
        </label>

        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
    </Fragment>
  );
};

export default LoginComp;
