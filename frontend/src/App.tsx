import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { FC } from 'react';
import { Stack, styled, Theme } from '@mui/material';

// const darkTheme: Theme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
  },
});

const MainWithColor = styled('main')(
  ({ theme }) => {
    return {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      width: "100%",
      paddingRight: theme.spacing(4)
    }
  }
);

const App:FC = () =>{
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Stack direction="row">
        <nav><NavBar/></nav>
        <MainWithColor><Outlet /></MainWithColor>
        </Stack>
    </ThemeProvider>
  );
}

export default App