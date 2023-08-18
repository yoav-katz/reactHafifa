import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { Stack, styled } from "@mui/material";
import { ColorContextProvider } from "@/hooks/useColor";

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
  return (
    <ColorContextProvider>
      <CssBaseline />
      <Stack direction="row">
        <nav>
          <NavBar />
        </nav>
        <MainWithColor>
          <Outlet />
        </MainWithColor>
      </Stack>
    </ColorContextProvider>
  );
};

export default App;
