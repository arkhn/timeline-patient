import React from "react";

import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";

import useTheme from "common/hooks/useTheme";

import Router from "./routes/Router";

const App = (): JSX.Element => {
  const theme = useTheme();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
