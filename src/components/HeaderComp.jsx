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
    <h1 className="h-4/6 md:h-3/6 w-full text-3xl bg-primary-color flex items-center justify-center">
      {isMainTitle ? "App" : auth.listName}
    </h1>
  );
};

export default HeaderComp;
