import { Outlet } from "react-router-dom";
import HeaderComp from "../components/HeaderComp";

const Root = () => {
  return (
    <main className="h-screen relative md:flex items-center justify-center">
      <div className="h-full bg-white sm:w-[645px] md:h-5/6 md:rounded-md shadow-md z-10">
        <div className="w-11/12 h-full m-auto relative">
          <div className="h-1/6 md:h-1/5 mb-4 md:mb-6 flex justify-center items-end z-20">
            <HeaderComp />
          </div>
          <Outlet />
        </div>
      </div>
      <div className="absolute inset-0 sm:bg-[url('src/assets/shopping-bg.png')] sm:opacity-50 -z-10 sm:z-0"></div>
    </main>
  );
};

export default Root;
