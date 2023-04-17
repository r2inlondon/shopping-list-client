import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

const HeaderComp = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    <h1 className="text-3xl">
      {location.pathname === "/home/ListPage/"
        ? "Shopping List App"
        : auth.listName}
    </h1>
  );
};

export default HeaderComp;
