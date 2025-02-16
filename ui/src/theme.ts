import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h6: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.25 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    caption: { fontSize: "0.75rem", fontWeight: 500 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
  },
});
