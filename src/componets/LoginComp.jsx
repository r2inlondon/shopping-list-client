import { useState, Fragment } from "react";
import { validateEmail } from "../utils/validateLogin";

const LoginComp = () => {
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  const [userCred, setUserCred] = useState({
    email: "",
    Pass: "",
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

  const handlePass = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="w-64" onSubmit={handleSubmit}>
      <label className="block text-md font-medium text-gray-700">
        Email Address
      </label>
      {errorMessage && <p className="text-sm text-pink-600">{errorMessage}</p>}
      <input
        className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
        type="text"
        value={userCred.email}
        onChange={handleEmail}
      />

      <label className="block text-sm font-medium text-gray-700">
        Password
        <input
          className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
          type="text"
          value={userCred.pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Login
      </button>
    </form>
  );
};

export default LoginComp;
