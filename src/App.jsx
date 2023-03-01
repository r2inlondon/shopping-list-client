import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Root from "./layouts/Root";
import Register from "./pages/home/Register";
import LoginComp from "./pages/home/LoginComp";
import UserHome from "./layouts/UserHome";
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
          <Route path="/home" element={<UserHome />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
