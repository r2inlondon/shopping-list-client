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
    <div className="flex h-4/6 w-full items-center justify-center bg-primary-color text-3xl md:h-3/6">
      {auth.listName}
    </div>
  );

  const myShoppingLists = (
    <div className="flex h-4/6 w-full items-center justify-center bg-primary-color text-3xl md:h-3/6">
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
