import { FC } from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard, ShoppingCart } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

interface Path {
  name: string;
  path: string;
  icon: JSX.Element;
}

const pathes: Path[] = [
  {
    name: "דשבורדים",
    path: "/dashboard",
    icon: <Dashboard />,
  },
  {
    name: "מוצרים",
    path: "/products",
    icon: <ShoppingCart />,
  },
];

const NavBar: FC = () => {
  const { pathname } = useLocation();

  return (
    <Drawer variant="persistent" anchor="right" open={true}>
      <p>פה הולך להיות אווטאר ליוזר</p>
      <Divider />
      <List>
        {pathes.map((path) => (
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
