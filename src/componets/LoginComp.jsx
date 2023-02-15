import { useState, Fragment } from "react";

const LoginComp = () => {
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submited");
  };

  return (
    <form className="w-64" onSubmit={handleSubmit}>
      <label className="block text-sm font-medium text-gray-700">
        User Name:
        <input
          className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Password
        <input
          className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
          type="text"
          value={pass}
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
