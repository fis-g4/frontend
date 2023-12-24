import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography, ListItemIcon, IconButton, Box } from '@mui/material'

import { Material } from '../../_mocks/materials'
import { Download, ShoppingCart } from '@mui/icons-material'
import { AuthUserContext } from '../../hooks/useAuth'

interface CourseMaterialsProps {
    materials: Material[]
    authUser: AuthUserContext
}

export default function CourseMaterials({
    materials,
    authUser,
}: Readonly<CourseMaterialsProps>) {
    const accessToMaterial = (material: Material) => {
        if (
            material.price === 0 ||
            material.author === authUser.user?.username ||
            material.purchasers.includes(authUser.user?.username as string)
        ) {
            return true
        }
        return false
    }

    return (
        <Box sx={{ height: '70vh', overflowY: 'auto' }}>
            {materials.map((material) => (
                <Card key={material.id} sx={{ my: 1, border: '1px solid' }}>
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
                            <Typography variant="body2" color="textSecondary">
                                {material.description}
                            </Typography>
                            <Typography variant="body2" color="primary">
                                Price: ${material.price}
                            </Typography>
                        </Box>
                        <ListItemIcon>
                            {accessToMaterial(material) && (
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
                            {!accessToMaterial(material) && (
                                <IconButton>
                                    <ShoppingCart />
                                </IconButton>
                            )}
                        </ListItemIcon>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}
