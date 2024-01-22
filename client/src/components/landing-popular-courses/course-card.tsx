import { Box, Typography, Card, CardContent, CardMedia, Rating } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


type Course = {
    name: string;
    description: string;
    price: number;
    categories: string[];
    language: string;
    creator: string;
    score: number;
  };

export default function CourseCard({ creator, name, description, score } : Course) {
  return (
    <Card raised>
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          {creator}
        </Typography>
        <Rating name="read-only" value={score} readOnly precision={0.1}/>
        <Typography variant="h6" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <AccessTimeIcon fontSize="small" />
          <PlayCircleOutlineIcon fontSize="small" sx={{ marginLeft: 2 }} />
        </Box>
      </CardContent>
    </Card>
  );
};