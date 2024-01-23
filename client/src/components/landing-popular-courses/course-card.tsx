import { Box, Typography, Card, CardContent, CardMedia, Rating, Chip, } from '@mui/material';
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

  
    
  const categoriesLine = (categories: string[]) => {
    return (
      categories.map((category:string, index:number) => (
        <Chip key={index} label={category} size="small" style={{ marginRight: '5px' }} />
      ))
    );
  }

export default function CourseCard({ creator, name, description, score, categories, language } : Course) {
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
        <Typography variant="body2" color="textPrimary">
            {categoriesLine(categories)}
        </Typography>
        <Typography variant="body2" color="textSecondary">
            Language: {language}
        </Typography>
      </CardContent>
    </Card>
  );
};