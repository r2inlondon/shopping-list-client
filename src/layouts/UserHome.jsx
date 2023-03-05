import { Outlet } from "react-router-dom";
import { Fragment } from "react";

const UserHome = () => (
  <Fragment>
    <div className="w-screen">
      <div className="w-11/12 m-auto">
        <div className="h-24 m-auto bg-gray-400">
          <h1>Shopping List App</h1>
        </div>
        <Outlet />
      </div>
    </div>
  </Fragment>
);

export default UserHome;
