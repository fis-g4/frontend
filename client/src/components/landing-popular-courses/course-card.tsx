import { Box, Typography, Card, CardContent, CardMedia, Rating } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Course } from '../../_mocks/courses';



export default function CourseCard({ creator, name, description, image, score } : Course) {
  return (
    <Card raised>
      <CardMedia
        component="img"
        image={image}
        sx={{
          height: "200px",
          objectFit: 'cover',
        }}
        alt="Course Image"
      />
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
          <Typography variant="body2" marginLeft={0.5}>
            {'X'}
          </Typography>
          <PlayCircleOutlineIcon fontSize="small" sx={{ marginLeft: 2 }} />
          <Typography variant="body2" marginLeft={0.5}>
            {'X'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};