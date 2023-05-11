import { Outlet } from "react-router-dom";
import HeaderComp from "../components/HeaderComp";

const Root = () => {
  return (
    <main className="relative h-screen items-center justify-center md:flex">
      <div className="z-10 h-full bg-white shadow-md sm:w-[645px] md:h-5/6 md:rounded-md">
        <div className="relative m-auto h-full w-11/12">
          <div className="z-20 flex h-1/6 items-end justify-center md:h-1/5">
            <HeaderComp />
          </div>
          <Outlet />
        </div>
      </div>
      <div className="absolute inset-0 -z-10 sm:z-0 sm:bg-[url('assets/shopping-bg.png')] sm:opacity-50"></div>
    </main>
  );
};

export default Root;
