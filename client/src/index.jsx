import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import App from "./App";
import ToggleColorMode from "./styles/ToggleColorMode";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ToggleColorMode>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ToggleColorMode>
  </React.StrictMode>,
  document.getElementById("root")
);
