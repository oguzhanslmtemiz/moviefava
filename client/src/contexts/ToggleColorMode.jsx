import React, { createContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "../styles/theme";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const getDesignTokens = (mode) => (mode === "light" ? lightTheme : darkTheme);

export default function ToggleColorMode({ children }) {
  const [mode, setMode] = React.useState("dark");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
