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

    const longWordInTheText = (text: string) => {
        const words = text.split(' ')
        let res_words = []
        for (const word of words) {
            if (word.length > 20) {
                res_words.push(word.slice(0, 20) + '...')
            } else {
                res_words.push(word)
            }
        }
        return res_words.join(' ')
    }

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
                                {longWordInTheText(material.title)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {longWordInTheText(material.description)}
                            </Typography>
                            <Typography variant="body2" color="primary">
                                Price: ${material.price}
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
