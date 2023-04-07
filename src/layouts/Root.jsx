import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <main className="h-screen bg-[url('src/assets/shoppingList-bg.jpg')] bg-cover">
      <Outlet />
    </main>
  );
};

export default Root;
