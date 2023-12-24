import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography, Box, IconButton, useTheme, alpha } from '@mui/material'

import { Class } from '../../_mocks/classes'
import { OndemandVideo } from '@mui/icons-material'

interface CourseClassesProps {
    classes: Class[]
    handleSelectedClass: (class_: Class) => void
}

export default function CourseClasses({
    classes,
    handleSelectedClass,
}: Readonly<CourseClassesProps>) {
    const sortedClasses = [...classes].sort((a, b) => a.order - b.order)

    const theme = useTheme()

    return (
        <Box sx={{ height: '70vh', overflowY: 'auto' }}>
            {sortedClasses.map((_class) => (
                <Card
                    key={_class.id}
                    sx={{
                        my: 1,
                        border: '1px solid',
                        mx: 2,

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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                                color="primary"
                                onClick={() => handleSelectedClass(_class)}
                            >
                                <OndemandVideo />
                            </IconButton>
                            <Box sx={{ ml: 1 }}>
                                <Typography variant="body1">
                                    {_class.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {_class.description}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}
