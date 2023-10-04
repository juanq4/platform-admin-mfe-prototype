import { createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles/createTheme";

const fontFamily = '"Inter", sans-serif';

export const nimbusColors = {
  primary: {
    500: "#006ADD",
    100: "#C7E2FF",
    50: "#F0F7FF",
  },
  secondary: {
    700: "#A31A4C",
    500: "#DD276A",
    300: "#E76595",
    50: "#FCE9F0",
  },
  success: {
    50: "#EBFFF1",
    500: "#006B12",
  },
  warning: {
    500: "#F2D336",
    50: "#F4F5F7",
  },
  error: {
    500: "#D10000",
    50: "#FAE7E6",
  },
  neutral: {
    50: "#F9FAFB",
    100: "#D3D8DE",
    300: "#97A2B0",
    500: "#616F80",
    700: "#3E4651",
    900: "#1F2329",
  },
  accents: {
    deepBlue: "#4533EE",
    cyan: "#00D5E5",
    orange: "#FF5F2E",
    green: "#00A838",
  },
  shades: {
    black: "#151313",
  },
};

const nimbusPalette: ThemeOptions["palette"] = {
  mode: "light",
  primary: {
    main: "#006ADD",
    light: "#66AFFF",
    dark: "#051F36",
  },
  secondary: {
    main: "#00A838",
    light: "#62D8C1",
  },
  grey: {
    50: "#F9FAFB",
    100: "#D3D8DE",
    300: "#97A2B0",
    500: "#616F80",
    700: "#3E4651",
  },
  background: {
    default: "#F7FAFC",
  },
  text: {
    primary: "#3D464E",
    secondary: "#3D464E",
    disabled: "#61707C",
  },
  error: {
    main: "#D83E38",
    light: "#FAE7E6",
    dark: "#551311",
  },
  warning: {
    main: "#F1AF0F",
    light: "#FEF7E7",
    dark: "#FEF7E7",
    contrastText: "#3D464E",
  },
  success: {
    main: "#006B12",
    light: "#00A838",
    dark: "#0A473B",
  },
  divider: "#97A2B0",
};

const nimbusTypography: ThemeOptions["typography"] = {
  fontSize: 16,
  htmlFontSize: 16,
  h1: {
    fontSize: 28,
    fontFamily,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "0em",
  },
  h2: {
    fontFamily,
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "0em",
  },
  h3: {
    fontFamily,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontFamily,
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 1.333,
    letterSpacing: "0em",
  },
  h5: {
    fontFamily,
    fontSize: 16,
    fontWeight: 600,
  },
  h6: {
    fontFamily,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "0em",
  },
  subtitle1: {
    fontFamily,
    fontSize: 14,
    lineHeight: 1.333,
  },
  fontFamily,
  body1: {
    fontSize: 16,
    lineHeight: 1.333,
  },
  body2: {
    fontSize: 16,
    lineHeight: 1.333,
  },
  button: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.333,
  },
  caption: {
    fontSize: 14,
    lineHeight: 1.2,
  },
  overline: {
    fontSize: 14,
    lineHeight: 1.2,
  },
};

const nimbusBreakpoints = {
  values: {
    xs: 0,
    sm: 640,
    md: 1024,
    lg: 1280,
    xl: 1920,
  },
};

const nimbusTheme = createTheme({
  palette: nimbusPalette,
  typography: nimbusTypography,
  breakpoints: nimbusBreakpoints,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: nimbusTypography?.body1?.fontSize,
          textTransform: "none",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: nimbusTypography?.h2?.fontSize,
          lineHeight: nimbusTypography?.h2?.lineHeight,
          color: nimbusColors.neutral[900],
          padding: "20px 24px",
          borderBottom: `1px solid ${nimbusColors.neutral[100]}`,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "24px !important",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "24px",
          borderTop: `1px solid ${nimbusColors.neutral[100]}`,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: nimbusTypography?.overline?.fontSize,
          lineHeight: nimbusTypography?.overline?.lineHeight,
          color: nimbusColors.neutral[700],
          marginBottom: "4px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          borderWidth: "2px",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: nimbusTypography?.h3?.fontSize,
          lineHeight: nimbusTypography?.h3?.lineHeight,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: "auto",
          borderRadius: "20px",
        },
        label: {
          padding: "4px 8px",
          fontFamily,
          fontSize: 16,
          lineHeight: 1,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 3,
        },
        bar: {
          borderRadius: 3,
        },
      },
    },
  },
});

export default nimbusTheme;
