import { Outlet } from "react-router-dom";
import HeaderComp from "../components/HeaderComp";

const Root = () => {
  return (
    <main className="h-screen bg-black">
      <div className="max-w-xl h-screen m-auto bg-[url('src/assets/shoppingList-bg.jpg')] bg-center bg-no-repeat md:rounded-md ">
        <div className="w-11/12 h-screen md:h-95  m-auto relative">
          <div className="h-1/6 flex justify-center items-end">
            <HeaderComp />
          </div>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Root;
