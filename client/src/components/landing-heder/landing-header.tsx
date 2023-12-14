import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ThemeProvider from '../../theme'
import Logo from '../logo/logo'
import { grey } from '../../theme/palette'
import { alpha } from '@mui/material/styles'

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
            <AppBar position="static" sx={{bgcolor: alpha(grey[500], 0.12)}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Logo />

                        <Box sx={{ flexGrow: 1 }}/>

                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ marginRight: '10px' }}
                            onClick={loginClickEvent}
                        >
                            Login
                        </Button>
                        <Button variant="contained" color="primary" onClick={registerClickEvent}>
                            Register
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}
export default ResponsiveAppBar
