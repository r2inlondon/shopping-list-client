import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

const HeaderComp = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const isMainTitle =
    location.pathname === "/home/ListPage/" ||
    location.pathname === "/" ||
    location.pathname === "/register";

  return (
    <h1 className="h-4/6 w-screen text-3xl bg-item-green flex items-center justify-center">
      {isMainTitle ? "Shopping List App" : auth.listName}
    </h1>
  );
};

export default HeaderComp;
