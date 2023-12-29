import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import {
    Typography,
    ListItemIcon,
    IconButton,
    Box,
    useTheme,
    alpha,
} from '@mui/material'

import { Material } from '../../_mocks/materials'
import { Download, ShoppingCart } from '@mui/icons-material'
import { AuthUserContext } from '../../hooks/useAuth'
import { longWordInTheText } from '../../utils/format-text'
import { formatCurrency } from '../../utils/format-currency'

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

    const theme = useTheme()

    return (
        <Box sx={{ height: '70vh', overflowY: 'auto' }}>
            {materials.map((material) => (
                <Card
                    key={material.id}
                    sx={{
                        my: 1,
                        border: '1px solid',
                        backgroundColor: alpha(
                            theme.palette.primary.light,
                            0.05
                        ),
                    }}
                >
                    <CardContent
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography variant="body1">
                                {longWordInTheText(material.title, 20)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {longWordInTheText(material.description, 20)}
                            </Typography>
                            <Typography variant="body2" color="primary">
                                Price: {formatCurrency(material.currency)}{' '}
                                {material.price}
                            </Typography>
                        </Box>
                        <ListItemIcon>
                            {accessToMaterial(material) ? (
                                <IconButton
                                    href={material.file}
                                    target="_blank"
                                    rel="noreferrer"
                                    download
                                >
                                    <Download />
                                </IconButton>
                            ) : (
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
