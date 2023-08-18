import DashboardView from "../pages/DashboardView";
import UsersView from "../pages/UsersView";
import { Dashboard, People } from "@mui/icons-material";

export const paths = [
  {
    name: "דשבורדים",
    icon: <Dashboard />,
    path: "/dashboard",
    element: <DashboardView />,
  },
  {
    name: "לקוחות",
    icon: <People />,
    path: "/users",
    element: <UsersView />,
  },
];
