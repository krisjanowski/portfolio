import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import {createRoot} from "react-dom/client"

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );