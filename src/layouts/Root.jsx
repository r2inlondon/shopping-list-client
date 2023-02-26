import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main className="h-screen flex justify-center items-center">
      <Outlet />
    </main>
  );
};

export default Root;
