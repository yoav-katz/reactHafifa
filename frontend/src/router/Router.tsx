import { createBrowserRouter } from "react-router-dom";
import DashboardView from "../pages/DashboardView";
import ProductView from "../pages/ProductsView";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";

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
        path: "products",
        element: <ProductView />,
      },
    ],
  },
]);

export default Router;
