import { createBrowserRouter } from "react-router-dom";
import DashboardView from "../pages/DashboardView";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import UsersView from "../pages/UsersView";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <DashboardView />,
      },
      {
        path: "users",
        element: <UsersView />,
      },
    ],
  },
]);

export default Router;
