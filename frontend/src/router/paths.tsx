import DashboardView from "../pages/DashboardView";
import UsersView from "../pages/UsersView";
import { Dashboard, ShoppingCart } from "@mui/icons-material";

export const paths = [
  {
    name: "דשבורדים",
    icon: <Dashboard />,
    path: "dashboard",
    element: <DashboardView />,
  },
  {
    name: "לקוחות",
    icon: <ShoppingCart />,
    path: "users",
    element: <UsersView />,
  },
];
