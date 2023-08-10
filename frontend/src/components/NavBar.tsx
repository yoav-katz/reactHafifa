import { FC } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard, ShoppingCart } from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";

interface Path {
  name: string;
  path: string;
  icon: JSX.Element;
}

const paths: Path[] = [
  {
    name: "דשבורדים",
    path: "/dashboard",
    icon: <Dashboard />,
  },
  {
    name: "לקוחות",
    path: "/users",
    icon: <ShoppingCart />,
  },
];

const NavBar: FC = () => {
  const { pathname } = useLocation();

  return (
    <Drawer variant="persistent" anchor="right" open={true} sx={{
      height: "100vh",
      '& .MuiDrawer-paper': {
        position: 'relative',
      }
    }}>
      <List>
        {paths.map((path) => (
          <Link to={path.path} key={path.path}>
            <ListItem disablePadding>
              <ListItemButton selected={path.path === pathname}>
                <ListItemIcon>{path.icon}</ListItemIcon>
                <ListItemText sx={{ display: "flex" }} primary={path.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default NavBar;
