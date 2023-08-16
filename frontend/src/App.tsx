import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { Stack, styled, useTheme } from "@mui/material";

const MainWithColor = styled("main")(({ theme }) => {
  return {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    width: "100%",
    paddingRight: theme.spacing(4),
  };
});

const App = () => {
  const theme = useTheme();
  theme.palette.mode = "light";
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack direction="row">
        <nav>
          <NavBar />
        </nav>
        <MainWithColor>
          <Outlet />
        </MainWithColor>
      </Stack>
    </ThemeProvider>
  );
};

export default App;
