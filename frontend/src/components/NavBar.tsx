import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { paths } from "../router/paths";

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={true}
      sx={{
        height: "100vh",
        "& .MuiDrawer-paper": {
          position: "relative",
        },
      }}
    >
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
