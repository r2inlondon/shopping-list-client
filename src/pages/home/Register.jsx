import { useState, Fragment } from "react";
import { validateEmail } from "../../utils/validateLogin";
import { Form, redirect, useActionData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const errors = {};

  const submission = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log(submission);

  if (!validateEmail(submission.email)) {
    return { errors: "Invalid Email address" };
  }

  return redirect("/userDashboard");
}

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const data = useActionData;

  const handleEmail = (e) => {
    const isValid = validateEmail(e.target.value);

    if (!isValid) {
      setErrorMessage("Please enter a valid email");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <Fragment>
      <Form method="post" className="w-64">
        <div className="flex justify-between">
          <div>
            <label className="block text-md font-medium text-gray-700">
              First name
            </label>
            <input
              className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
              type="text"
              name="firstName"
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
              required
            />
          </div>
        </div>

        <label className="block text-md font-medium text-gray-700">
          Email Address
        </label>
        {(errorMessage || data.errors) && (
          <p className="text-sm text-pink-600">{errorMessage}</p>
        )}
        <input
          className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
          type="text"
          name="email"
          // value={userEmail}
          onChange={handleEmail}
          required
        />

        <label className="block text-sm font-medium text-gray-700">
          Password
          <input
            className="my-4 block w-full rounded-md border-gray-500 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-md"
            type="text"
            name="password"
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
      </Form>
    </Fragment>
  );
};

export default Register;
