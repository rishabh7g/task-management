export const LOGIN_FORM_DATA = {
    email: {
        label: 'Email',
        name: 'email',
        placeholder: 'Enter your email',
        type: 'email',
    },
    password: {
        label: 'Password',
        name: 'password',
        placeholder: 'Enter your password',
        type: 'password',
    },
    trustDevice: {
        label: 'Trust this device',
        name: 'trustDevice',
        type: 'checkbox',
    },
    confirmPassword: {
        label: 'Confirm Password',
        name: 'confirmPassword',
        placeholder: 'Confirm your password',
        type: 'password',
    },
    buttonLabels: {
        register: 'Register',
        login: 'Login',
    },
};

export const VALIDATION_DATA = {
    email: {
        title: 'Email requirments',
        rules: [
            '4-50 characters, including @ and .',
            'Must contain only letters, numbers, and special characters.',
            'Must contain @ and .',
        ],
    },
    password: {
        title: 'Password requirments',
        rules: [
            '6 characters minimum',
            'At least one letter and one number.',
            'At least one special character.',
        ],
    },
    confirmPassword: {
        title: 'Passwords must match',
        rules: [],
    },
};

export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/;
