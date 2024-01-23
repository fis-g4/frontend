import { Box, Typography, Card, CardContent, useTheme, alpha } from '@mui/material';
import MobileIcon from '@mui/icons-material/Smartphone'; // Ejemplo de íconos, reemplaza con los adecuados
import DataIcon from '@mui/icons-material/BarChart'
import AiIcon from '@mui/icons-material/Adb'
import SoftwareIcon from '@mui/icons-material/Code'
import NetworkIcon from '@mui/icons-material/DeviceHub'
import SecurityIcon from '@mui/icons-material/Security'

// Componente para una tarjeta de categoría individual
const CategoryCard = ({ title, coursesCount }: { title: string; coursesCount: number }) => {
  const theme = useTheme();

  let Icon = MobileIcon;

  switch (title) {
    case "Mobile App Development":
      Icon = MobileIcon;
      break;
    case "Data Science & Analytics":
      Icon = DataIcon;
      break;
    case "AI & Machine Learning":
      Icon = AiIcon;
      break;
    case "Software Engineering":
      Icon = SoftwareIcon;
      break;
    case "Network Administration":
      Icon = NetworkIcon;
      break;
    case "Cybersecurity Essentials":
      Icon = SecurityIcon;
      break;
  }

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

export default CategoryCard