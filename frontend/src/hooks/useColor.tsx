import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { heIL } from "@mui/material/locale";
import { useState, useMemo, createContext, useContext, ReactNode } from "react";

interface ColorContextProviderProps {
  children: ReactNode;
}

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ColorContextProvider = ({ children }: ColorContextProviderProps) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode,
          },
        },
        heIL
      ),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const useColor = () => useContext(ColorModeContext);

export { useColor, ColorContextProvider };
