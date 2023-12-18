import { Box, Typography, useTheme } from "@mui/material"

const Footer = () => {

    const theme = useTheme()

    return (
        <Box height="200px" bgcolor={theme.palette.primary.main} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" color={theme.palette.common.white}>© 2024 - All Rights Reserved</Typography>
        </Box>
    )
}

export default Footer;