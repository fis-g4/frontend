import { Box, alpha } from "@mui/material";
import { grey } from "../../theme/palette";

function LandingHero(){
    return (
        <Box sx={{ height: "100vh", width: "100vw", backgroundColor: "primary.main" }}>
            <Box sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ height: "50%", width: "50%", backgroundColor: alpha(grey[0], 0.3), borderRadius: "25px" }}></Box>
            </Box>
        </Box>
    )
}

export default LandingHero;