import { HttpStatusCode } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRoutes } from 'src/constant/api-routes';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'src/constant/login-form.constant';

import { RoutePath } from 'src/routes';
import { apiClient } from 'src/services/api/api-service';

export const useRegistrationPageManagement = () => {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsValidPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatching, setIsPasswordMatching] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const errorRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password, confirmPassword]);

    useEffect(() => {
        const isEmailValid = EMAIL_REGEX.test(email);
        setIsEmailValid(isEmailValid);
    }, [email]);

    useEffect(() => {
        const isPasswordValid = PASSWORD_REGEX.test(password);
        setIsValidPassword(isPasswordValid);
    }, [password]);

    useEffect(() => {
        const match = password === confirmPassword;
        setIsPasswordMatching(match);
    }, [confirmPassword, password]);

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        apiClient
            .post(apiRoutes.createRegisterUrl(), {
                email,
                password,
            })
            .then((response) => {
                const status = response.status;
                const isUserRegistered = status === HttpStatusCode.Created;
                if (isUserRegistered) {
                    navigate(RoutePath.Login);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const navigateToLoginPage = () => {
        navigate(RoutePath.Login);
    };

    const isRegistrationButtonDisabled =
        isLoading || !isEmailValid || !isPasswordValid || !isPasswordMatching;

    return {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        handleRegister,
        isEmailValid,
        isPasswordValid,
        isPasswordMatching,
        errorMessage,
        errorRef,
        navigateToLoginPage,
        isLoading,
        isRegistrationButtonDisabled,
    };
};
