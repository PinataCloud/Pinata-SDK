import * as React from 'react';

import * as muiColors from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface IThemeOption {
    theme?: string;
    children: any;
}
export default function Theme(props: IThemeOption) {
    let customTheme = createTheme({
        palette: {
            primary: {
                main: muiColors.pink[500]
            },
            secondary: {
                main: muiColors.pink[200]
            }
        }
    });

    const { theme } = props;

    if (theme && theme in muiColors) {
        const colorPicked = muiColors[props.theme as keyof typeof muiColors];
        const primaryMain: string = colorPicked[500];
        const secondaryMain = colorPicked[200];
        customTheme = createTheme({
            palette: {
                primary: {
                    main: primaryMain
                },
                secondary: {
                    main: secondaryMain
                }
            }
        });
    }

    return <ThemeProvider theme={customTheme}>{props.children}</ThemeProvider>;
}
