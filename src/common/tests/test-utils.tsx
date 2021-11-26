import React, { FC, ReactElement } from "react";

import { ThemeProvider } from "@mui/material";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import {
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from "@testing-library/react-hooks";
import { MemoryHistory } from "history";
import { Provider } from "react-redux";
import { Routes, MemoryRouter, Route, useLocation } from "react-router-dom";

import { store } from "app/store";
import useTheme from "common/hooks/useTheme";

import "locales/i18n";

const Wrapper: FC = ({ children }) => {
  // JSDom does not implement .getComputedStyle and an error was being
  // thrown from jest.
  const { getComputedStyle } = window;
  const theme = useTheme();
  window.getComputedStyle = (elt) => getComputedStyle(elt);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>;
    </ThemeProvider>
  );
};

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

const renderWithRouter = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
  {
    path = "/",
  }: { path?: string; route?: string; history?: MemoryHistory } = {}
): RenderResult => {
  return render(
    <MemoryRouter>
      <LocationDisplay />
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>,
    { wrapper: Wrapper, ...options }
  );
};

const renderHookWithRouter = <TProps, TResult>(
  hook: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>,
  { path = "/" }: { path?: string } = {}
): RenderHookResult<TProps, TResult> => {
  return renderHook(hook, {
    // eslint-disable-next-line react/display-name
    wrapper: ({ children }) => (
      <Wrapper>
        <MemoryRouter>
          <LocationDisplay />
          <Routes>
            <Route path={path}>{children}</Route>
          </Routes>
        </MemoryRouter>
      </Wrapper>
    ),
    ...options,
  });
};

export * from "@testing-library/react";

export { renderWithRouter as render, renderHookWithRouter as renderHook };
