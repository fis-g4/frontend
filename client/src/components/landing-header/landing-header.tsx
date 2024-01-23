import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import ThemeProvider from '../../theme'
import { alpha, useScrollTrigger, useTheme } from '@mui/material'
import LandingLogo from '../landing-logo/landing-logo'

function LandingHeader({handleLoginOpen, handleRegisterOpen} : {handleLoginOpen: () => void, handleRegisterOpen: () => void}) {

    const theme = useTheme();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    function loginClickEvent() {
        handleLoginOpen();
    }

    function registerClickEvent() {
        handleRegisterOpen();
    }
    
    return (
        <ThemeProvider>
            <AppBar position="fixed" sx={{backdropFilter: "blur(5px)", backgroundColor: `${trigger ? theme.palette.primary.light : alpha(theme.palette.common.white, 0.3)}`}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <LandingLogo sx={{width: '30%'}} />

                        <Box sx={{ flexGrow: 1 }} />

                        <Button
                            variant="outlined"
                            sx={{ marginRight: '10px', color: '#000000', borderColor: '#000000' , '&:hover': { backgroundColor: '#000000', color: '#FFFFFF' }}}
                            onClick={loginClickEvent}
                        >
                            Login
                        </Button>
                        <Button variant="contained" sx={{color: '#FFFFFF', backgroundColor: '#000000', '&:hover': { backgroundColor: '#FFFFFF', color: '#000000'}}} onClick={registerClickEvent}>
                            Register
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}
export default LandingHeader
