import { Box, Grid, IconButton, Link, Typography, useTheme } from "@mui/material"
import Slack from '../../static/icons/slack.svg';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

const Footer = () => {

    const theme = useTheme()

    return (
        <Box
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.common.white,
            py: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
            
          }}
          >
          <Grid container spacing={2} justifyContent="space-around">
            <Grid item xs={6} sm={3} md={2}>
                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                DEVELOPMENT
                </Typography>
                <Link href="#" color="inherit" display="block" style={{textDecoration: "none"}}>Github</Link>
            </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                  PRODUCT
                </Typography>
                <Link href="#" color="inherit" display="block" style={{textDecoration: "none"}}>Pricing</Link>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                  COMPANY
                </Typography>
                <Link href="#" color="inherit" display="block" style={{textDecoration: "none"}}>About Us</Link>
                <Link href="#" color="inherit" display="block" style={{textDecoration: "none"}}>Privacy Policy</Link>
                <Link href="#" color="inherit" display="block" style={{textDecoration: "none"}}>Terms of Service</Link>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                  CONTACT INFORMATION
                </Typography>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Email */}
                  <Link href="mailto:fisg4microservices@gmail.com" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', marginLeft: '-12px' }}>
                    <IconButton style={{ padding: '12px' }}>
                      <EmailOutlinedIcon fontSize="large" style={{ color: 'white' }} />
                    </IconButton>
                  </Link>

                  {/* Slack */}
                  <Link href="/#">
                    <img src={Slack} alt="Slack Icon" style={{ width: "30px", height: "30px", marginLeft: '10px' }} />
                  </Link>
                </div>

                {/* Phone */}
                <Typography color="inherit" display="block" style={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneOutlinedIcon fontSize="large" style={{ marginRight: '5px' }} />
                  +34 657 453 689
                </Typography>
              </Grid>
            </Grid>

            <Typography variant="body2" color={theme.palette.common.white} align="center" sx={{ pt: 4 }}>
              © 2024 Company Co. All rights reserved.
            </Typography>
        </Box>
      )
    }
    
    export default Footer;