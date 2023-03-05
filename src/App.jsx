import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Root from "./layouts/Root";
import UserHome from "./layouts/UserHome";
import Register from "./pages/login/Register";
import LoginComp from "./pages/login/LoginComp";
import ListsPage from "./pages/home/ListsPage";
import NotFoundPage from "./components/NotFoundPage";

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
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
