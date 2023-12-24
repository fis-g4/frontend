import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Divider, Typography } from '@mui/material'

import { Material } from '../../_mocks/materials'
import CourseMaterials from './course-materials'
import { AuthUserContext } from '../../hooks/useAuth'

interface CourseMaterialsProps {
    materials: Material[]
    authUser: AuthUserContext
}

export default function CourseClassesMaterials({
    materials,
    authUser,
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
                <CourseMaterials materials={materials} authUser={authUser} />
            </CardContent>
        </Card>
    )
}
