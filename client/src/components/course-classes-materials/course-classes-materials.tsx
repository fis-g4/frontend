import { Material } from '../../_mocks/materials'
import CourseMaterials from './course-materials'
import { AuthUserContext } from '../../hooks/useAuth'
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem
} from '@mui/material';


import { Class } from '../../_mocks/classes';
import CourseClasses from './course-classes';
import { Course } from '../../_mocks/courses';

interface CourseClassesMaterialsProps {
  classes: Class[];
  materials: Material[];
  authUser: AuthUserContext;
  handleSelectedClass: (class_: Class) => void;
  course:Course;
  handleUpdateClassOpen: (class_: Class) => void;
  handleUpdateClassClose: () => void;
  handleRefresh: () => void;
  handleFullyOpenSnackbar: (message: string) => void;
}

export default function CourseClassesMaterials({
  classes,
  materials,
  authUser,
  handleSelectedClass, 
  course,
  handleUpdateClassOpen,
  handleUpdateClassClose,
  handleRefresh,
  handleFullyOpenSnackbar,
}: Readonly<CourseClassesMaterialsProps>) {
  const [contentType, setContentType] = useState('classes');
  const [reviewType, setReviewType] = useState('user');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [reviewFormData, setReviewFormData] = useState({
    type: reviewType,
    title: '',
    description: '',
    rating: 1,
    course: 0,
    material: 0,
    creator: '',
  });

  const handleReviewType = (type: string) => {
    setReviewType(type);
    setReviewFormData((prevFormData) => ({
      ...prevFormData,
      title: '',
    }));
  };

  const handleMaterialChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const materialId = event.target.value;
    const selectedMaterial = materials.find((material) => material.id === materialId) || null;
    setSelectedMaterial(selectedMaterial);
  };

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

    let dataToSend: any = {
      type: reviewType,
      title: reviewFormData.title,
      description: reviewFormData.description,
      rating: reviewFormData.rating,
      creator: reviewFormData.creator,
    };

    if (reviewType === 'user') {
      dataToSend = {
        ...dataToSend,
        user: authUser.user?.id || '',
      };
    } else if (reviewType === 'course') {
      dataToSend = {
        ...dataToSend,
        course: course.id ,
      };
    } else if (reviewType === 'material' && selectedMaterial) {
      dataToSend = {
        ...dataToSend,
        material: selectedMaterial.id,
      };
    }

    console.log('Formulario enviado:', dataToSend);

  };

  return (
    <>
      <Card
        sx={{
          border: 'none',
          marginBottom: '20px',
        }}
      >
        <CardContent sx={{ height: '55vh' }}>
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
            <CourseClasses classes={classes} authUser={authUser} handleSelectedClass={handleSelectedClass} handleUpdateClassOpen={handleUpdateClassOpen} handleUpdateClassClose={handleUpdateClassClose} handleRefresh={handleRefresh} handleFullyOpenSnackbar={handleFullyOpenSnackbar} />
          )}
          {contentType === 'materials' && (
            <CourseMaterials materials={materials} authUser={authUser} />
          )}
        </CardContent>
      </Card>

      <ToggleButtonGroup
        value={reviewType}
        exclusive
        onChange={(event, type) => handleReviewType(type as string)}
        aria-label="reviewType"
        fullWidth
        color="primary"
      >
        <ToggleButton value="user" aria-label="user">
          Usuario
        </ToggleButton>
        <ToggleButton value="course" aria-label="course">
          Curso
        </ToggleButton>
        <ToggleButton value="material" aria-label="material">
          Material
        </ToggleButton>
      </ToggleButtonGroup>

      {reviewType === 'material' && (
        <TextField
          fullWidth
          select
          label="Choose a material"
          name="material"
          value={selectedMaterial ? selectedMaterial.id : ''}
          onChange={handleMaterialChange}
          margin="normal"
        >
          {materials.map((material) => (
            <MenuItem key={material.id} value={material.id}>
              {material.title}
            </MenuItem>
          ))}
        </TextField>
      )}

      <form onSubmit={handleReviewSubmit} style={{ marginTop: '20px' }}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          placeholder={
            reviewType === 'user'
              ? 'Review para usuario'
              : reviewType === 'course'
              ? 'Review para curso'
              : 'Review para material'
          }
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
          rows={1}
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
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Send review
        </Button>
      </form>
    </>
  );
}
