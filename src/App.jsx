import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/Root";
import Register from "./pages/home/Register";
import LoginComp from "./pages/home/LoginComp";
import UserDashboard from "./layouts/UserDashboard";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<LoginComp />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userDashboard" element={<UserDashboard />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
