import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const LogoutButton = () => {
  const logoutURL = import.meta.env.VITE_LOGOUT_URL;
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      const response = await axiosPrivate.post(logoutURL);
      setAuth({});
      Navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={logout}
        className="w-28 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
