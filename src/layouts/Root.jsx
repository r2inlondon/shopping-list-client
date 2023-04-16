import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main className="h-screen bg-black">
      <div className="max-w-xl h-screen m-auto bg-[url('src/assets/shoppingList-bg.jpg')] bg-center bg-no-repeat md:rounded-md">
        <Outlet />
      </div>
    </main>
  );
};

export default Root;
