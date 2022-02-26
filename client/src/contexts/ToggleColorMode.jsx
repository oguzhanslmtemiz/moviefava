import { createContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "../styles/theme";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const getDesignTokens = (mode) => (mode === "light" ? lightTheme : darkTheme);

export default function ToggleColorMode({ children }) {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem("mode", mode);
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("mode", newMode);
          return newMode;
        });
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  document.body.style.backgroundColor = theme.palette.background.default;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
