import React from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import useTheme from "common/hooks/useTheme";

import Router from "./routes/Router";

const App = (): JSX.Element => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
};

export default App;
