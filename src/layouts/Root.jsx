import { Outlet } from "react-router-dom";
import HeaderComp from "../components/HeaderComp";

const Root = () => {
  return (
    <main className="h-screen bg-[url('src/assets/health_food.webp')] bg-center md:flex items-center justify-center">
      <div className="h-full bg-white sm:w-[645px] md:h-5/6 md:rounded-md shadow-md ">
        <div className="w-11/12 h-full m-auto relative">
          <div className="h-1/6 md:h-1/5 mb-4 md:mb-6 flex justify-center items-end">
            <HeaderComp />
          </div>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Root;
