import { Outlet } from "react-router-dom";
import HeaderComp from "../components/HeaderComp";

const Root = () => {
  return (
    <main className="h-screen bg-black md:flex items-center justify-center">
      <div className="h-full sm:w-[645px] md:h-5/6 bg-[url('src/assets/shoppingList-bg.jpg')] bg-center bg-no-repeat md:rounded-md ">
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
