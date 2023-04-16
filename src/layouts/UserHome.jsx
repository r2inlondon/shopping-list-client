import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import HeaderComp from "../components/HeaderComp";

const UserHome = () => (
  <Fragment>
    <div className="w-11/12 h-screen md:h-95  m-auto relative">
      <div className="h-24 bg-item-green flex justify-center items-center">
        <HeaderComp />
      </div>
      <Outlet />
    </div>
  </Fragment>
);

export default UserHome;
