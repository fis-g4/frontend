import { Box, Typography, alpha, useTheme } from '@mui/material'

import background from '../../static/backgrounds/fondoMobile.png'

function LandingHeroMobile({
    handleRegisterOpen,
}: {
    handleRegisterOpen: () => void
}) {
    const BIG_LETTERS_FONT_SIZE = '40px'
    const BIG_LETTERS_FONT_FAMILY = 'Verdana'

    const theme = useTheme()

    return (
        <Box
            position="relative"
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${background})`,
                backgroundSize: `${window.innerWidth}px ${window.innerHeight}px}`,
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <Typography
                    sx={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: BIG_LETTERS_FONT_SIZE,
                        fontFamily: BIG_LETTERS_FONT_FAMILY,
                        textAlign: 'center',
                        textShadow: '1px 1px 21px rgba(179,177,0,1);',
                    }}
                >
                    Go beyond
                </Typography>
                <Typography
                    sx={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: BIG_LETTERS_FONT_SIZE,
                        fontFamily: BIG_LETTERS_FONT_FAMILY,
                        textAlign: 'center',
                        textShadow: '1px 1px 21px rgba(179,177,0,1);',
                    }}
                >
                    the limitations
                </Typography>
                <Typography
                    sx={{
                        color: 'white',
                        fontWeight: 700,
                        fontSize: BIG_LETTERS_FONT_SIZE,
                        fontFamily: BIG_LETTERS_FONT_FAMILY,
                        textAlign: 'center',
                        textShadow: '1px 1px 21px rgba(179,177,0,1);',
                    }}
                >
                    of e-Learning
                </Typography>

                <Box
                    width="60%"
                    height="5%"
                    borderRadius="25px"
                    boxShadow="1px 1px 21px rgb(96, 148, 119);"
                    bgcolor="rgba(255,255,255,0.4)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={5}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.8
                            ),
                        },
                    }}
                    onClick={() => handleRegisterOpen()}
                >
                    <Typography
                        sx={{

                            color: "rgb(96, 148, 119)",
                            fontWeight: 700,
                            fontSize: '22px',
                            fontFamily: BIG_LETTERS_FONT_FAMILY,
                        }}
                    >
                        GET STARTED
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default LandingHeroMobile
