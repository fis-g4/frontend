import {
    Card,
    CardContent,
    Typography,
    useTheme,
    alpha,
    IconButton,
    Stack,
} from '@mui/material'
import { Download, Edit, Delete } from '@mui/icons-material'

interface Material {
    id: string
    title: string
    description: string
    price: number
    currency: 'USD' | 'EUR'
    file: string
    type: 'book' | 'article' | 'presentation' | 'exercises'
}

interface MaterialCardProps extends Material {
    onEdit: (id: string) => void
    onDelete: (id: string) => void
    smUp: boolean
}

export default function MaterialCard({
    id,
    title,
    description,
    price,
    currency,
    file,
    type,
    onEdit,
    onDelete,
    smUp,
}: Readonly<MaterialCardProps>) {
    const theme = useTheme()
    const currencySymbol = currency === 'USD' ? '$' : '€'

    const responsiveDirection = smUp ? 'row' : 'column'

    const responsiveAlignCard = smUp ? 'flex-start' : 'center'
    const responsiveWidthCard = smUp ? '70%' : '100%'
    const responsiveTextAlignCard = smUp ? 'left' : 'center'

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
            <CardContent
                sx={{
                    textAlign: responsiveTextAlignCard,
                    width: responsiveWidthCard,
                }}
            >
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
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                height={'100%'}
            >
                <IconButton
                    color="secondary"
                    href={file}
                    target="_blank"
                    rel="noreferrer"
                    download
                >
                    <Download />
                </IconButton>
                <IconButton color="warning" onClick={() => onEdit(id)}>
                    <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(id)}>
                    <Delete />
                </IconButton>
            </Stack>
        </Card>
    )
}

