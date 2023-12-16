import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    username: Yup.string().trim()
        .required('The username is required')
        .min(3, 'The username must be at least 3 characters long')
        .max(32, 'The username must be at most 32 characters long'),
    password: Yup.string().trim()
        .required('The password is required')
        .min(8, 'The password must be at least 8 characters long')
        .max(32, 'The password must be at most 32 characters long'),
});

export const registerValidationSchema = Yup.object({
    firstName: Yup.string().trim()
        .required('The first name is required')
        .min(3, 'The first name must be at least 3 characters long')
        .max(32, 'The first name must be at most 32 characters long'),
    lastName: Yup.string().trim()
        .required('The last name is required')
        .min(3, 'The last name must be at least 3 characters long')
        .max(32, 'The last name must be at most 32 characters long'),
    username: Yup.string().trim()
        .required('The username is required')
        .min(3, 'The username must be at least 3 characters long')
        .max(32, 'The username must be at most 32 characters long'),
    password: Yup.string().trim()
        .required('The password is required')
        .min(8, 'The password must be at least 8 characters long')
        .max(32, 'The password must be at most 32 characters long'),
    passwordConfirm: Yup.string().trim()
        .required('You must confirm the password')
        .oneOf([Yup.ref('password')], 'The passwords must match'),
    email: Yup.string().trim()
        .required('The email is required')
        .email('The email is not valid')
        .max(64, 'The email must be at most 64 characters long'),
});
