import React from "react";

import {
  createTheme,
  useMediaQuery,
  Theme,
  PaletteMode,
  PaletteOptions,
} from "@mui/material";
declare module "@mui/material/styles/createMixins" {
  interface Mixins {
    appbar: {
      height: CSSProperties["height"];
    };
    breadcrumbBar: {
      height: CSSProperties["height"];
    };
    icons: {
      size: CSSProperties["height"] | CSSProperties["width"];
    };
    footer: {
      height: CSSProperties["height"];
    };
    input: {
      maxWidth: CSSProperties["maxWidth"];
    };
  }

  interface MixinsOptions {
    appbar: {
      height: CSSProperties["height"];
    };
    breadcrumbBar: {
      height: CSSProperties["height"];
    };
    icons: {
      size: CSSProperties["height"] | CSSProperties["width"];
    };
    footer: {
      height: CSSProperties["height"];
    };
    input: {
      maxWidth: CSSProperties["maxWidth"];
    };
  }
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    badges: {
      required: Palette["primary"];
      pending: Palette["primary"];
    };
    icons: {
      table: Palette["primary"];
      resourceTree: Palette["primary"];
    };
    orange: Palette["primary"] & {
      transparent: Palette["primary"];
    };
    purple: Palette["primary"];
    appBar: Palette["primary"];
    timelineCircle: Palette["primary"];
  }
  interface PaletteOptions {
    badges: {
      required: PaletteOptions["primary"];
      pending: PaletteOptions["primary"];
    };
    icons: {
      table: PaletteOptions["primary"];
      resourceTree: PaletteOptions["primary"];
    };
    orange: PaletteOptions["primary"] & {
      transparent: PaletteOptions["primary"];
    };
    purple: PaletteOptions["primary"];
    appBar: PaletteOptions["primary"];
    timelineCircle: PaletteOptions["primary"];
  }
}

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const getDesignTokens = (mode: PaletteMode): PaletteOptions => ({
  mode,
  ...{
    badges: {
      required: { main: "#A43C3C" },
      pending: { main: "#FFC56F" },
    },
    primary: {
      main: "#60b2a2",
      light: "#92e4d3",
      dark: "#2d8273",
      contrastText: "#FFFFFF",
    },
    orange: {
      main: "#CC7831",
      contrastText: "#fff",
      transparent: {
        main: "hsla(27, 100%, 50%, 0.24)",
        light: "hsla(27, 100%, 50%, 0.16)",
      },
    },
    purple: {
      main: "#71227D",
    },
  },
  timelineCircle: {
    main: "#A4A4A4",
  },
  ...(mode === "light"
    ? {
        // palette values for light mode
        appBar: {
          main: "#383838",
        },
        text: {
          primary: "#464646",
          secondary: "#858585",
        },
        type: "light",
        secondary: {
          main: "#464646",
          contrastText: "#EEE",
        },
        background: {
          default: "#fff",
        },
        icons: {
          table: { main: "#265EB1" },
          resourceTree: {
            main: "#464646",
            light: "#858585",
          },
        },
      }
    : {
        // palette values for dark mode
        appBar: {
          main: "#424242",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#a0a0a0",
        },
        type: "dark",
        secondary: {
          main: "#EEE",
          contrastText: "#555",
        },
        background: {
          default: "#303030",
        },
        icons: {
          table: { main: "#2f7ae2" },
          resourceTree: {
            main: "#FFFFFF",
            light: "#a0a0a0",
          },
        },
      }),
});

const useTheme = (): Theme => {
  const mode: PaletteMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  const theme = React.useMemo(
    () =>
      createTheme({
        components: {
          MuiTypography: {
            variants: [
              { props: { variant: "subtitle2" }, style: { color: "#A4A4A4" } },
            ],
          },
          MuiCardActions: { styleOverrides: { root: { padding: 16 } } },
        },
        shape: {
          borderRadius: 10,
        },
        mixins: {
          appbar: {
            height: 64,
          },
          breadcrumbBar: {
            height: 104,
          },
          icons: {
            size: 16,
          },
          footer: {
            height: 100,
          },
          input: {
            maxWidth: 534,
          },
        },
        palette: getDesignTokens(mode),
      }),
    [mode]
  );

  return theme;
};

export default useTheme;
