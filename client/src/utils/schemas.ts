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

export const updateUserValidationSchema = Yup.object().shape({
    firstName: Yup.string().trim()
        .required('The first name is required')
        .min(3, 'The first name must be at least 3 characters long')
        .max(32, 'The first name must be at most 32 characters long'),
    lastName: Yup.string().trim()
        .required('The last name is required')
        .min(3, 'The last name must be at least 3 characters long')
        .max(32, 'The last name must be at most 32 characters long'),
    email: Yup.string().trim()
        .required('The email is required')
        .email('The email is not valid')
        .max(64, 'The email must be at most 64 characters long'),
    currentPassword: Yup.string().trim()
        .when('newPassword', (newPassword) => newPassword.toString().trim() ?
                Yup.string().trim()
                    .required('The current password is required')
                    .min(8, 'The current password must be at least 8 characters long')
                    .max(32, 'The current password must be at most 32 characters long')
                    :
                    Yup.string()
                        .min(8, 'The current password must be at least 8 characters long')
                        .max(32, 'The current password must be at most 32 characters long')),
    newPassword: Yup.string()
        .when('currentPassword', (currentPassword) => currentPassword.toString().trim() ?
                Yup.string().trim()
                    .required('The new password is required')
                    .min(8, 'The new password must be at least 8 characters long')
                    .max(32, 'The new password must be at most 32 characters long')
                    .notOneOf([Yup.ref('currentPassword')], 'The new password must be different from the current password')
                    :
                    Yup.string()
                        .min(8, 'The new password must be at least 8 characters long')
                        .max(32, 'The new password must be at most 32 characters long')),
    confirmNewPassword: Yup.string().trim()
        .when('newPassword', (newPassword) => newPassword.toString().trim() ?
            Yup.string().trim()
                .required('You must confirm your new password')
                .oneOf([Yup.ref('newPassword')], 'The passwords must match')
            :
            Yup.string()
                .oneOf([Yup.ref('newPassword')], 'The passwords must match')
            ),
    photoURL:  Yup.lazy((value) =>
        typeof value === 'object' ? Yup.mixed()
        .test('fileSize', 'The photo must be less than 5MB', (value) => {
            if (value) {
                return (value as File).size <= 5000000;
            }
            return true;
        })
        .test('fileType', 'The photo must be an image', (value) => {
            if (value) {
                return (value as File).type.includes('image');
            }
            return true;
        }):
        Yup.string().trim()),
}, [['newPassword', 'confirmNewPassword'], ['currentPassword', 'newPassword']]);