import { Card, CardContent, Typography, useTheme, alpha, IconButton, Stack } from '@mui/material';
import { Download, Edit, Delete } from '@mui/icons-material';
import { useResponsive } from "../../hooks/useResponsive";

interface Material {
  title: string;
  description: string;
  price: number;
  currency: 'USD' | 'EUR';
  file: string;
  type: 'book' | 'article' | 'presentation' | 'exercises';
}

interface MaterialCardProps extends Material {
  onEdit: () => void;
  onDelete: () => void;
}

export default function MaterialCard({
  title,
  description,
  price,
  currency,
  file,
  type,
  onEdit,
  onDelete,
}: MaterialCardProps) {
  const theme = useTheme();
  const currencySymbol = currency === 'USD' ? '$' : '€';
  const smUp = useResponsive('up', 'sm');

  const responsiveDirection = smUp ? 'row' : 'column';
  
  const responsiveAlignCard = smUp ? 'flex-start' : 'center';
  const responsiveWidthCard = smUp ? '70%' : '100%';
  const responsiveTextAlignCard = smUp ? 'left' : 'center';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: responsiveDirection,
        height: '100%',
        alignItems: responsiveAlignCard,
        justifyContent: 'space-between',
        padding: theme.spacing(1),
        border: `solid 2px ${alpha(theme.palette.common.black, 0.1)}`,
      }}
    >
      <CardContent sx={{ textAlign: responsiveTextAlignCard, width: responsiveWidthCard }}>
        <Typography variant="h6">{title}</Typography>
        <Typography color="textSecondary" variant="body2">
          {description}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Price: {currencySymbol}
          {price}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Type: {type}
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" height={"100%"}>
        <IconButton color="secondary" href={file} target="_blank" rel="noreferrer" download>
          <Download />
        </IconButton>
        <IconButton color="warning" onClick={onEdit}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={onDelete}>
          <Delete />
        </IconButton>
      </Stack>
    </Card>
  );
}
