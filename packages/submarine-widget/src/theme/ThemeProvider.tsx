import * as React from 'react';
import { ThemeProvider } from "@mui/material/styles";

import { Themes } from "./themes";

export default function CustomThemeProvider({ children }) {
  // const currentTheme = useAppSelector(selectTheme);
   const theme = Themes["light"];
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
