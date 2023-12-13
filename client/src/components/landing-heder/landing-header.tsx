import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import AdbIcon from '@mui/icons-material/Adb'
import ThemeProvider from '../../theme'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function ResponsiveAppBar() {
    function loginClickEvent() {
        console.log('login clicked')
    }

    function registerClickEvent() {
        console.log('register clicked')
    }

    return (
        <ThemeProvider>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon
                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        <AdbIcon
                            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                        />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />

                        <Button
                            variant="outlined"
                            color="inherit"
                            sx={{ marginRight: '10px' }}
                            onClick={loginClickEvent}
                        >
                            Login
                        </Button>
                        <Button variant="contained" color="secondary" onClick={registerClickEvent}>
                            Register
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}
export default ResponsiveAppBar
