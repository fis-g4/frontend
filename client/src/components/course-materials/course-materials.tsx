import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import {
    Divider,
    Typography,
    useTheme,
    ListItemIcon,
    IconButton,
    Box,
} from '@mui/material'

import { Material } from '../../_mocks/materials'
import { Download, ShoppingCart } from '@mui/icons-material'

interface CourseMaterialsProps {
    materials: Material[]
}

export default function CourseMaterials({
    materials,
}: Readonly<CourseMaterialsProps>) {
    return (
        <Card
            sx={{
                border: 'none',
            }}
        >
            <CardContent>
                <Typography variant="h4">Materials</Typography>
                <Divider sx={{ my: 1 }} />
                <Box overflow="auto" sx={{ flexGrow: 1, maxHeight: 300 }}>
                    {materials.map((material) => (
                        <Card
                            key={material.id}
                            sx={{ my: 1, border: '1px solid' }}
                        >
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    <Typography variant="body1">
                                        {material.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {material.description}
                                    </Typography>
                                    <Typography variant="body2" color="primary">
                                        Price: ${material.price}
                                    </Typography>
                                </Box>
                                <ListItemIcon>
                                    {
                                        //TODO: Add a check to see if the user has already bought the material
                                    }
                                    {material.price === 0 && (
                                        <IconButton
                                            color="secondary"
                                            href={material.file}
                                            target="_blank"
                                            rel="noreferrer"
                                            download
                                        >
                                            <Download />
                                        </IconButton>
                                    )}
                                    {material.price > 0 && (
                                        <IconButton>
                                            <ShoppingCart />
                                        </IconButton>
                                    )}
                                </ListItemIcon>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}
