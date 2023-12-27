import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Divider, Typography, useTheme } from '@mui/material'


// Crear interfaz para los detalles de un material

interface FileComponentProps {
    title: string;
    description: string;
    price: number;
    currency: string;
    author: string;
    type: string;
    file: string;
}


// Crear componente FileComponent

export default function FileComponent({ title, description, price, currency, author, type, file }: FileComponentProps) {
    const theme = useTheme()
    return (
        <Card>
            <CardContent>
                <Typography variant="h4" >{title}</Typography>
                <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Description: {description}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Price: {price} {currency}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Author: {author}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Type: {type}</Typography>
                <a href={file} download>Download</a>
            </CardContent>
        </Card>
    )
}










