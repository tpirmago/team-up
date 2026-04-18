import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

export const theme = createTheme ({
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 768,
            laptop: 1025,
            desktop: 1526
        }
    }
})