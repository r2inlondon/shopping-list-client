import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const LogoutButton = () => {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const logoutURL = import.meta.env.VITE_LOGOUT_URL;

  const logout = async () => {
    try {
      await axiosPrivate.post(logoutURL);
      setAuth({});
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex justify-end absolute bottom-10 right-0">
      <button
        onClick={logout}
        className="w-28 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-semibold text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 text-sm md:text-lg transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
