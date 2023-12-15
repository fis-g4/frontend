import { Box, Typography, alpha, useTheme } from '@mui/material'

import background from '../../static/images/backgrounds/FondoHero.png'

function LandingHero({ handleRegisterOpen } : {handleRegisterOpen: () => void}) {

    const BIG_LETTERS_FONT_SIZE = '4vw'
    const BIG_LETTERS_FONT_FAMILY = 'Verdana'

    const theme = useTheme()

    return (
        <Box
            position="relative"
            sx={{
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
            }}
        >
            <Box
                position="absolute"
                right={0}
                height="100%"
                width="45%"
                display="flex"
                alignItems="center"
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    sx={{ paddingLeft: '20%' }}
                >
                    <Typography
                        sx={{
                            color: 'black',
                            fontWeight: 700,
                            fontSize: BIG_LETTERS_FONT_SIZE,
                            fontFamily: BIG_LETTERS_FONT_FAMILY,
                        }}
                    >
                        Go beyond
                    </Typography>
                    <Typography
                        sx={{
                            color: 'black',
                            fontWeight: 700,
                            fontSize: BIG_LETTERS_FONT_SIZE,
                            fontFamily: BIG_LETTERS_FONT_FAMILY,
                        }}
                    >
                        the limitations
                    </Typography>
                    <Typography
                        sx={{
                            color: 'black',
                            fontWeight: 700,
                            fontSize: BIG_LETTERS_FONT_SIZE,
                            fontFamily: BIG_LETTERS_FONT_FAMILY,
                        }}
                    >
                        of e-Learning.
                    </Typography>
                    <Typography
                        sx={{
                            color: 'black',
                            fontWeight: 100,
                            fontSize: '0.8vw',
                            fontFamily: BIG_LETTERS_FONT_FAMILY,
                        }}
                    >
                        Empower Collaborative Learning Anytime, Anywhere, Together.
                    </Typography>
                    <Box
                        width="8vw"
                        height="2.5vw"
                        borderRadius="25px 25px 25px 0"
                        bgcolor={theme.palette.primary.main}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        marginTop={5}
                        sx={{cursor: 'pointer', "&:hover": {backgroundColor: alpha(theme.palette.primary.main, 0.8)}}}
                        onClick={() => handleRegisterOpen()}
                    >
                        <Typography
                            sx={{
                                color: theme.palette.common.white,
                                fontWeight: 400,
                                fontSize: '0.9vw',
                                fontFamily: BIG_LETTERS_FONT_FAMILY,
                            }}
                        >
                            Get Started
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default LandingHero
