import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Rating } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


type Course = {
    instructor: string;
    title: string;
    description: string;
    image: string;
    rating: number;
    length: string;
    videoCount: string;
    // Agrega aquí más propiedades si es necesario
  };

const CourseCard: React.FC<Course> = ({ instructor, title, description, image, rating, length, videoCount }) => {
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
            {instructor}
          </Typography>
          <Rating name="read-only" value={rating} readOnly precision={0.1}/>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2" marginLeft={0.5}>
              {length}
            </Typography>
            <PlayCircleOutlineIcon fontSize="small" sx={{ marginLeft: 2 }} />
            <Typography variant="body2" marginLeft={0.5}>
              {videoCount}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  export default CourseCard;