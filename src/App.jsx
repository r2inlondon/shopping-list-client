import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/Root";
import Register from "./pages/home/Register";
import LoginComp from "./pages/home/LoginComp";
import UserDashboard from "./layouts/UserDashboard";
import { action as loginAction } from "./pages/home/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <LoginComp />,
      },
      {
        path: "/register",
        element: <Register />,
        action: loginAction,
      },
      {
        path: "/userDashboard",
        element: <UserDashboard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
