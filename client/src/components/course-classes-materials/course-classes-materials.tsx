import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Divider, ToggleButtonGroup, ToggleButton } from '@mui/material'

import { Material } from '../../_mocks/materials'
import { Class } from '../../_mocks/classes'
import CourseClasses from './course-classes'
import CourseMaterials from './course-materials'
import { AuthUserContext } from '../../hooks/useAuth'

interface CourseClassesMaterialsProps {
    classes: Class[]
    materials: Material[]
    authUser: AuthUserContext
    handleSelectedClass: (class_: Class) => void
}

export default function CourseClassesMaterials({
    classes,
    materials,
    authUser,
    handleSelectedClass,
}: Readonly<CourseClassesMaterialsProps>) {
    const [contentType, setContentType] = useState('classes')

    const handleButton = (
        event: React.MouseEvent<HTMLElement>,
        type: string | null
    ) => {
        if (type === 'classes') {
            setContentType('classes')
        } else if (type === 'materials') {
            setContentType('materials')
        }
    }

    return (
        <Card
            sx={{
                border: 'none',
            }}
        >
            <CardContent sx={{ height: '80vh' }}>
                <ToggleButtonGroup
                    value={contentType}
                    exclusive
                    onChange={handleButton}
                    aria-label="type"
                    fullWidth
                    color="primary"
                >
                    <ToggleButton value="classes" aria-label="classes">
                        Classes
                    </ToggleButton>
                    <ToggleButton value="materials" aria-label="materials">
                        Materials
                    </ToggleButton>
                </ToggleButtonGroup>

                <Divider sx={{ my: 1 }} />
                {contentType === 'classes' && (
                    <CourseClasses
                        classes={classes}
                        handleSelectedClass={handleSelectedClass}
                    />
                )}
                {contentType === 'materials' && (
                    <CourseMaterials
                        materials={materials}
                        authUser={authUser}
                    />
                )}
            </CardContent>
        </Card>
    )
}
