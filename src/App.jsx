import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Root from "./layouts/Root";
import UserHome from "./layouts/UserHome";
import Register from "./pages/loginAndOutPages/Register";
import LoginComp from "./pages/loginAndOutPages/LoginComp";
import ListsPage from "./pages/listsPage/ListsPage";
import ShoppingItemsPage from "./pages/shoppingItemsPage/ShoppingItemsPage";
import NotFoundPage from "./pages/404/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        {/* Public routes */}
        <Route index element={<LoginComp />} />
        <Route path="register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<UserHome />}>
            <Route path="ListPage" element={<ListsPage />} />
            <Route path="ListPage/:listId" element={<ShoppingItemsPage />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
