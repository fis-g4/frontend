import { Box, Grid, IconButton, Link, Typography, alpha, useTheme } from "@mui/material"
import Slack from '../../static/icons/slack.svg';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { useResponsive } from "../../hooks/useResponsive";

const Footer = () => {
    const SLACK_URL = 'https://join.slack.com/t/us-s6h5102/shared_invite/zt-293nsxy4m-LqUOt5TpE~NQXzN6toGCmA'
    const theme = useTheme()
    const añoActual = new Date().getFullYear()
    const GITHUB_URL = 'https://github.com/fis-g4'
    const isSmall = useResponsive('down', 'sm')
    const letterColor = theme.palette.common.black

    return (
        <Box
          sx={{
            bgcolor: theme.palette.primary.light,
            color: theme.palette.common.white,
            py: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
            
          }}
          >
          <Grid container spacing={2} justifyContent={isSmall ? "center" : "space-around"} textAlign={"center"}>
            <Grid item xs={isSmall ? 12 : 3} md={2}>
                <Typography variant="subtitle1" color={letterColor} gutterBottom>
                DEVELOPMENT
                </Typography>
                <Link href={GITHUB_URL} color={letterColor} display="block" style={{textDecoration: "none"}}>Github</Link>
            </Grid>
              <Grid item xs={isSmall ? 12 : 3} sm={3} md={2}>
                <Typography variant="subtitle1" color={letterColor} gutterBottom>
                  PRODUCT
                </Typography>
                <Link href="#" color={letterColor} display="block" style={{textDecoration: "none"}}>Pricing</Link>
              </Grid>
              <Grid item xs={isSmall ? 12 : 3} sm={3} md={2}>
                <Typography variant="subtitle1" color={letterColor} gutterBottom>
                  COMPANY
                </Typography>
                <Link href="#" color={letterColor} display="block" style={{textDecoration: "none"}}>About Us</Link>
                <Link href="#" color={letterColor} display="block" style={{textDecoration: "none"}}>Privacy Policy</Link>
                <Link href="#" color={letterColor} display="block" style={{textDecoration: "none"}}>Terms of Service</Link>
              </Grid>
              <Grid item xs={isSmall ? 12 : 3} sm={3} md={2}>
              <Box textAlign={isSmall ? "center" : "left"}>
        <Typography variant="subtitle1" color={letterColor} gutterBottom>
            CONTACT INFORMATION
        </Typography>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: isSmall ? "center" : "flex-start" }}>
            {/* Email */}
            <Link href="mailto:fisg4microservices@gmail.com" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', marginLeft: -2 }}>
                <IconButton style={{ padding: 1 }}>
                    <EmailOutlinedIcon fontSize="large" style={{ color: 'black' }} />
                </IconButton>
            </Link>

            {/* Slack */}
            <Link href={SLACK_URL}>
                <img src={Slack} alt="Slack Icon" style={{height: 30, marginLeft: 20 ,backgroundColor: 'white', borderRadius: '20%', padding:3}} />
            </Link>
        </div>

        {/* Phone */}
        <Typography color={letterColor} display="block" style={{ display: 'flex', alignItems: 'center', marginTop:10, justifyContent: isSmall ? "center" : "flex-start" }}>
            <PhoneOutlinedIcon fontSize="large" style={{ marginRight: 5 }} />
            +34 657 453 689
        </Typography>
    </Box>
</Grid>
            </Grid>

            <Typography variant="body1" color={letterColor} align="center" sx={{pt: 4 }}>
              © {añoActual} Company Co. All rights reserved.
            </Typography>
        </Box>
      )
    }
    
    export default Footer;