import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Divider, Typography } from '@mui/material';
import { useTheme, alpha } from '@mui/system';



interface VideoComponentProps {
playlistTitle: string;
videoTitle: string;
videoUrl: string;
description: string;
videoImage: string;
}

export default function VideoComponent({ playlistTitle, videoTitle, videoUrl, description, videoImage }: VideoComponentProps) {
    const theme = useTheme()
return (
    <Card>
    <CardContent>
        <Typography variant="h4" >{playlistTitle}</Typography>
        <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
        <Typography variant="h5" sx={{marginBottom:1}}>{videoTitle}</Typography>
        <video controls width="100%" poster={videoImage}>
          <source src={videoUrl} />
          Tu navegador no admite la reproducción de videos.
        </video>
        <Typography variant="body2" sx={{ backgroundColor: alpha(theme.palette.grey[500],0.24), color: theme.palette.common.black, padding: 1, borderRadius: '4px', maxHeight: '25em', overflow: 'auto' }}>{description}</Typography>
    </CardContent>
    </Card>
)
}


