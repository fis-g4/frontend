import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useFormik } from 'formik';

import { bgGradient } from '../../theme/css';
import Iconify from '../iconify/iconify';
import Logo from '../logo/logo';
import { useAuth } from '../../hooks/useAuth';
import { registerValidationSchema } from '../../utils/schemas';
import { useCoursesApi } from '../../api/useCoursesApi';
import TransitionSnackbar from '../transition-snackbar/transition-snackbar';
import { CheckBox } from '@mui/icons-material';
import { FormControlLabel } from '@mui/material';

import * as Yup from 'yup';

export default function NewCourseView({ handleNewCourseClose } : { handleNewCourseClose: () => void }) {
  const theme = useTheme();

  const { addCourse } = useCoursesApi();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorData, setErrorData] = useState('');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const handleOpenSnackbar = (error?: string) => {
    setOpenSnackbar(true);
    setErrorData(error || 'There was an error with the course creation. Please try again.');
  }

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    categories: Yup.array().min(1, 'Select at least one category'),
    language: Yup.string().required('Language is required'),
  });

  interface CourseTypes {
    name: string;
    description: string;
    price: number;
    categories: string[]; // Specify the type as an array of strings
    language: string;
  }

  const formik = useFormik<CourseTypes>({
    initialValues: {
      name: '',
      description: '',
      price: 5,
      categories: [],
      language: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      addCourse(
        values.name,
        values.description,
        values.price,
        values.categories,
        values.language
        ).then((response: any) => {
        if (response.status === 201) {
          response.json().then((responseData: any) => {
          }).catch((_error: any) => {
            handleNewCourseClose();
          });
        } else{
          response.json().then((responseData: any) => {
            handleOpenSnackbar(responseData.error);
          }).catch((_error: any) => {
            handleCloseSnackbar();
          });
        }
      }).catch((_error) => {
        handleCloseSnackbar();
      });
    },
  });

  const handleCheckboxChange = (categoryName:string) => (event:React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    formik.setFieldValue(
      'categories',
      checked
        ? [...formik.values.categories, categoryName]
        : formik.values.categories.filter((category) => category !== categoryName)
    );
  };

  const renderForm = (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField 
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          required
        />
        <TextField
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          required
        />
        <TextField
          name="price"
          label="Price"
          onChange={formik.handleChange}
          value={formik.values.price}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          onBlur={formik.handleBlur}
          required 
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
            <Stack>
                <FormControlLabel
                    control={
                        <Checkbox
                        name="categories"
                        checked={formik.values.categories.includes('Mobile App Development')}
                        onChange={handleCheckboxChange('Mobile App Development')}
                    />
                    }
                label="Mobile App Development"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                        name="categories"  
                        checked={formik.values.categories.includes('Data Science & Analytics')}
                        onChange={handleCheckboxChange('Data Science & Analytics')}
                    />
                    }
                label="Data Science & Analytics"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                        name="categories"
                        checked={formik.values.categories.includes('AI & Machine Learning')}
                        onChange={handleCheckboxChange('AI & Machine Learning')}
                    />
                    }
                label="AI & Machine Learning"
                />
            </Stack>
            <Stack>
                <FormControlLabel
                    control={
                        <Checkbox
                        name="categories"
                        checked={formik.values.categories.includes('Software Engineering')}
                        onChange={handleCheckboxChange('Software Engineering')}
                    />
                    }
                label="Software Engineering"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                        name="categories"
                        checked={formik.values.categories.includes('Network Administration')}
                        onChange={handleCheckboxChange('Network Administration')}
                    />
                    }
                label="Network Administration"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                        name="categories"
                        checked={formik.values.categories.includes('Cybersecurity Essentials')}
                        onChange={handleCheckboxChange('Cybersecurity Essentials')}
                    />
                    }
                label="Cybersecurity Essentials"
                />
            </Stack>
        </Stack>
        <TextField
          name="language"
          label="Language"
          onChange={formik.handleChange}
          value={formik.values.language}
          error={formik.touched.language && Boolean(formik.errors.language)}
          helperText={formik.touched.language && formik.errors.language}
          onBlur={formik.handleBlur}
          required 
        />

        <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            disabled={!formik.isValid}
        > Create Course </Button>
        </Stack>
    </form>
  );

  return (
    <>
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: '/assets/backgrounds/overlay_4.jpg',
          }),
          height: 1,
          background: 'transparent !important',
        }}
      >
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
          }}
        />

        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 840,
            }}
          >
            <Typography variant="h4">Create a new course</Typography>

            {renderForm}
          </Card>
        </Stack>
      </Box>
      <TransitionSnackbar open={openSnackbar} onClose={handleCloseSnackbar} message={errorData} autoHideDuration={6000} />
    </>
  );
}