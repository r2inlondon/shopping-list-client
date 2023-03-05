import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main className="h-screen bg-slate-50 ">
      <Outlet />
    </main>
  );
};

export default Root;
