import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography, Box } from '@mui/material'

import { Class } from '../../_mocks/classes'

interface CourseClassesProps {
    classes: Class[]
}

export default function CourseClasses({
    classes,
}: Readonly<CourseClassesProps>) {
    const sortedClasses = [...classes].sort((a, b) => a.order - b.order)

    return (
        <Box sx={{ height: '70vh', overflowY: 'scroll' }}>
            {sortedClasses.map((_class) => (
                <Card
                    key={_class.id}
                    sx={{ my: 1, border: '1px solid', mx: 2 }}
                >
                    <CardContent
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box>
                            <Typography variant="body1">
                                {_class.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {_class.description}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}
