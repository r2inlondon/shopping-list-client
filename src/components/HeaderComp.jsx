import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import AppLogo from "./AppLogo";
import { Fragment } from "react";

const HeaderComp = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const isMainTitle =
    location.pathname === "/" || location.pathname === "/register";

  const listName = (
    <div className="h-4/6 md:h-3/6 w-full text-3xl flex bg-primary-color items-center justify-center">
      {auth.listName}
    </div>
  );

  const myShoppingLists = (
    <div className="h-4/6 md:h-3/6 w-full text-3xl flex bg-primary-color items-center justify-center">
      My shopping lists
    </div>
  );

  return (
    <Fragment>
      {isMainTitle ? (
        <AppLogo />
      ) : (
        (auth.listName && listName) || myShoppingLists
      )}
    </Fragment>
  );
};

export default HeaderComp;
