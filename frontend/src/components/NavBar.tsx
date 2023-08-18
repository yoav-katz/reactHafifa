import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { paths } from "../router/paths";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useColor } from "@/hooks/useColor";

const NavBar = () => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const colorMode = useColor();

  const changeColorMode = () => {
    colorMode.toggleColorMode();
  };

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
          <ListItem disablePadding key={path.path}>
            <ListItemButton
              component={Link}
              to={path.path}
              selected={path.path === pathname}
            >
              <ListItemIcon>{path.icon}</ListItemIcon>
              <ListItemText sx={{ display: "flex" }} primary={path.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={changeColorMode}>
            <ListItemIcon>
              {theme.palette.mode === "light" ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </ListItemIcon>
            <ListItemText
              sx={{ display: "flex" }}
              primary={
                theme.palette.mode === "light" ? "Light Mode" : "Dark Mode"
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavBar;
