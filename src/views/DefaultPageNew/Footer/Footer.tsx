import { Toolbar } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavigationButtom from "../../UIpackv2/BottomNavigation/NavigationButtom"

function FooterMob() {
    return (
        <Toolbar />
    )
}
const themeMob = createTheme({
    components: {
        MuiToolbar: {
            styleOverrides: {
                root: {
                    height: '4rem',
                },
            }
        }
    }
});
const themeLaptop = createTheme({
    components: {
        MuiToolbar: {
            styleOverrides: {
                root: {
                    height: '4rem',
                },
            }
        }
    }
});

function Footer() {

    const themeMobile = useTheme();
    const isMobile = useMediaQuery(themeMobile.breakpoints.down('md'));
    return (
        <>
            {isMobile ? (
                <>
                    <ThemeProvider theme={themeMob}>
                        <FooterMob />
                    </ThemeProvider>
                    <NavigationButtom />
                </>
            ) : (
                <ThemeProvider theme={themeLaptop}>
                    <FooterMob />
                </ThemeProvider>
            )}
        </>
    )
}
export default Footer