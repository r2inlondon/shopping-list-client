import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main className="h-screen flex justify-center items-center bg-slate-50 ">
      <Outlet />
    </main>
  );
};

export default Root;
