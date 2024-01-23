import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Typography, Box, IconButton, useTheme, alpha } from '@mui/material'
import { OndemandVideo, Edit, Delete } from '@mui/icons-material'
import { Class } from '../../_mocks/classes'
import { longWordInTheText } from '../../utils/format-text'
import { useState } from 'react'
import { useClassesApi } from '../../api/useClassesApi'
import { AuthUserContext } from '../../hooks/useAuth'

interface CourseClassesProps {
    classes: Class[]
    authUser: AuthUserContext
    handleSelectedClass: (class_: Class) => void
    handleUpdateClassOpen: (class_: Class) => void
    handleUpdateClassClose: () => void
    handleRefresh: () => void
    handleFullyOpenSnackbar: (message: string) => void
}

export default function CourseClasses({
    classes,
    authUser,
    handleSelectedClass,
    handleUpdateClassOpen,
    handleUpdateClassClose,
    handleRefresh,
    handleFullyOpenSnackbar
}: Readonly<CourseClassesProps>) {

    const [sortedClasses, setSortedClasses] = useState([...classes].sort((a, b) => a.order - b.order));
    const theme = useTheme()
    const { deleteClass } = useClassesApi()

    const onEdit = (id: string) => {
        const _class = classes.find((_class) => _class.id === id)
        if (!_class) return
        handleUpdateClassOpen(_class)
    }

    const onDelete = (id: string) => {
        deleteClass(id)
            .then((response) => {
                if (response.ok) {
                    handleFullyOpenSnackbar('Class deleted successfully.')
                    handleRefresh()
                } else {
                    handleFullyOpenSnackbar('Error deleting class.')
                    handleRefresh()
                }
            })
            .catch((error) => {
            })
    }

    return (
        <Box sx={{ maxHeight: '40vh', overflowY: 'auto' }}>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <IconButton color="primary" onClick={() => handleSelectedClass(_class)}>
                                <OndemandVideo />
                            </IconButton>
                            <Box sx={{ ml: 1, flex: '1' }}>
                                <Typography variant="body1">
                                    {longWordInTheText(_class.title, 20)}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {longWordInTheText(_class.description, 20)}
                                </Typography>
                            </Box>
                            {authUser.user?.username === _class.creator && (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton color="warning" onClick={() => onEdit(_class.id)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => onDelete(_class.id)}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        )}
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    )
}
