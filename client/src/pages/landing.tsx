import { Helmet } from 'react-helmet-async'
import ResponsiveAppBar from '../components/landing-heder/landing-header'
import LandingHero from '../components/landing-hero/landing-hero'
import { PausePresentationRounded } from '@mui/icons-material'
// // ----------------------------------------------------------------------

// export default function LandingPage() {
//   return (
//     <>
//       <Helmet>
//         <"Servicio 1"> Welcome to FIS G4! </"Servicio 1">
//       </Helmet>

//       <ResponsiveAppBar />

//       <LandingHero />
//     </>
//   );
// }

// src/components/LandingPage.tsx

import React from 'react'
import {
    Typography,
    Button,
    Container,
    Box,
    Paper,
    Grid,
    Card,
    CardContent,
    CardActions,
} from '@mui/material'
import LandingServiceCard from '../components/landing-service-card/landing-service-card'

interface Service {
	title: string;
	description: string;
	Icon: typeof PausePresentationRounded; // Asume que todos los servicios usarán íconos de Material-UI por ahora
  }

const LandingPage: React.FC = () => {

	const services: Service[] = [
		{
		  title: 'So Easy to Use',
		  description: 'We take the guesswork out of registering with family-friendly guides for thoughtful and your own registry solution.',
		  Icon: PausePresentationRounded, // Reemplaza con el ícono correspondiente
		},
		{
		  title: 'So Easy to Use',
		  description: 'We take the guesswork out of registering with family-friendly guides for thoughtful and your own registry solution.',
		  Icon: PausePresentationRounded, // Reemplaza con el ícono correspondiente
		},
		{
		  title: 'So Easy to Use',
		  description: 'We take the guesswork out of registering with family-friendly guides for thoughtful and your own registry solution.',
		  Icon: PausePresentationRounded, // Reemplaza con el ícono correspondiente
		},
		// ... Agrega los otros servicios aquí ...
	  ];
    return (
        <>
            <Helmet>
                <title> Welcome to FIS G4! </title>
            </Helmet>
            <ResponsiveAppBar />
            <Container maxWidth="lg">
                <Box my={4}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Bienvenidos a Nuestra Plataforma de Aprendizaje en Línea
                    </Typography>
                    <Typography variant="h5">
                        Aprende a tu ritmo con los mejores cursos en línea.
                    </Typography>
                    <Box mt={3}>
                        <Button variant="contained" color="primary">
                            Explorar Cursos
                        </Button>
                    </Box>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} style={{ padding: '20px' }}>
                            <Typography variant="h6">
                                Curso de Programación
                            </Typography>
                            <Typography>
                                Aprende los fundamentos de la programación con
                                cursos interactivos.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} style={{ padding: '20px' }}>
                            <Typography variant="h6">Diseño Gráfico</Typography>
                            <Typography>
                                Mejora tus habilidades de diseño y creatividad.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} style={{ padding: '20px' }}>
                            <Typography variant="h6">
                                Marketing Digital
                            </Typography>
                            <Typography>
                                Aprende las mejores técnicas y herramientas de
                                marketing.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Box mt={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          Nuestros Servicios
        </Typography>
        <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap" gap={2}>
          {services.map((service, index) => (
            <Box key={index} width={300} marginBottom={2}>
              <LandingServiceCard {...service} />
            </Box>
          ))}
        </Box>
      </Box>
            </Container>
        </>
    )
}

export default LandingPage
