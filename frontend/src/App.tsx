import { FC } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { CssBaseline, createTheme, Grid } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//   },
// });

const GRID_MAX_SIZE = 12;
const NAVBAR_SIZE = 2;
const APP_SIZE = GRID_MAX_SIZE - NAVBAR_SIZE;
const NAVBAR_SIZE_PRECENTAGE = (NAVBAR_SIZE / GRID_MAX_SIZE) * 100;

const App: FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container display="flex">
        <Grid
          item
          component="nav"
          xs={NAVBAR_SIZE}
          sx={{
            width: `${NAVBAR_SIZE_PRECENTAGE}%`,
            height: "100vh",
            ".MuiDrawer-paper": {
              width: `${NAVBAR_SIZE_PRECENTAGE}%`,
            },
          }}
        >
          <NavBar />
        </Grid>
        <Grid item xs={APP_SIZE} component="main">
          <Outlet />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
