import { Typography } from '@mui/material'
import { Material } from '../../_mocks/materials'
import CourseMaterials from './course-materials'
import { AuthUserContext } from '../../hooks/useAuth'
import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Divider, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Class } from '../../_mocks/classes';
import CourseClasses from './course-classes';


interface CourseClassesMaterialsProps {
    classes: Class[];
    materials: Material[];
    authUser: AuthUserContext;
    handleSelectedClass: (class_: Class) => void;
}

export default function CourseClassesMaterials({
    classes,
    materials,
    authUser,
    handleSelectedClass,
}: Readonly<CourseClassesMaterialsProps>) {
    const [contentType, setContentType] = useState('classes');
    const [reviewFormData, setReviewFormData] = useState({
        title: '',
        description: '',
        rating: 1,
    });

    const handleButton = (event: React.MouseEvent<HTMLElement>, type: string | null) => {
        if (type === 'classes') {
            setContentType('classes');
        } else if (type === 'materials') {
            setContentType('materials');
        }
    };

    const handleReviewFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setReviewFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'rating' ? Math.max(1, Math.min(5, parseInt(value, 10))) : value,
        }));
    };

    const handleReviewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Formulario enviado:', reviewFormData);
        // Puedes enviar los datos a tu API o realizar otras acciones aquí
    };

    return (
        <>
            <Card
                sx={{
                    border: 'none',
                }}
            >
                <CardContent sx={{ height: '50vh' }}>
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

            <form onSubmit={handleReviewSubmit} style={{ marginTop: '20px' }}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={reviewFormData.title}
                    onChange={handleReviewFormChange}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={reviewFormData.description}
                    onChange={handleReviewFormChange}
                    margin="normal"
                    multiline
                    rows={4}
                />
                <TextField
                    fullWidth
                    type="number"
                    label="Score (1-5)"
                    name="rating"
                    value={reviewFormData.rating}
                    onChange={handleReviewFormChange}
                    margin="normal"
                    inputProps={{ min: '1', max: '5' }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Enviar Revisión
                </Button>
            </form>
        </>
    );
}
