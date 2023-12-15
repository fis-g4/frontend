import React from 'react';
import { Box, Typography, Card, CardContent, useTheme, alpha } from '@mui/material';
import MobileIcon from '@mui/icons-material/Smartphone'; // Ejemplo de íconos, reemplaza con los adecuados

// Definición de la estructura de datos de la categoría
interface Category {
  title: string;
  coursesCount: number;
  Icon: typeof MobileIcon; // Utiliza el tipo de tus íconos aquí
}

// Componente para una tarjeta de categoría individual
const CategoryCard: React.FC<Category> = ({ title, coursesCount, Icon }) => {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: theme.spacing(2), border: "solid 2px", borderColor: alpha(theme.palette.common.black, 0.1) }}>
      <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '50%', padding: theme.spacing(2), color: 'white' }}>
        <Icon fontSize="large" />
      </Box>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
        <Typography color="textSecondary">
          {coursesCount} Courses
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;