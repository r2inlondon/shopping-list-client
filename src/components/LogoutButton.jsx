import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const LogoutButton = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const logoutURL = import.meta.env.VITE_LOGOUT_URL;
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosPrivate.post(logoutURL);
      setAuth({});
    } catch (err) {
      console.log(err.message);
    }
    navigate("/");
  };

  return (
    <div className="absolute bottom-10 right-0 flex justify-end">
      <button
        onClick={logout}
        className="inline-flex w-28 justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-base text-lg font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:ml-3"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
