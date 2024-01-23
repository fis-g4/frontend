import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Divider, Typography, alpha, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'

interface VideoComponentProps {
    playlistTitle: string
    videoTitle: string
    videoUrl: string
    description: string
    review?: string
    videoImage: string
}

export default function VideoComponent({
    playlistTitle,
    videoTitle,
    videoUrl,
    description,
    review,
    videoImage,
}: Readonly<VideoComponentProps>) {
    const theme = useTheme()
    const [key, setKey] = useState(0)

    useEffect(() => {
        setKey((prevKey) => prevKey + 1)
    }, [videoUrl])

    return (
        <Card>
            <CardContent>
                <Typography variant="h4">{playlistTitle}</Typography>
                <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
                <Typography variant="h5" sx={{ marginBottom: 1 }}>
                    {videoTitle}
                </Typography>
                {videoUrl ? (
                    <video key={key} controls width="100%" poster={videoImage}>
                        <source src={videoUrl} />
                        Tu navegador no admite la reproducción de videos.
                    </video>
                ) : (
                    <Typography variant="body2" color="error">
                        URL del video no disponible.
                    </Typography>
                )}
                <Typography
                    variant="body2"
                    sx={{
                        backgroundColor: alpha(theme.palette.grey[500], 0.24),
                        color: theme.palette.common.black,
                        padding: 1,
                        borderRadius: '4px',
                        maxHeight: '25em',
                        overflow: 'auto',
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}
