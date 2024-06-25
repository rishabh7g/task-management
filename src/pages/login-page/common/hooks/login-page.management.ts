import { HttpStatusCode } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiRoutes } from 'src/constant/api-routes';
import { useAuth } from 'src/context/auth-context';
import { RoutePath } from 'src/routes';
import { apiClient } from 'src/services/api/api-service';

export const useLoginPageManagement = () => {
    const { loginUser } = useAuth();

    const emailRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || RoutePath.Home;

    useEffect(() => {
        const isEmailFieldExist = !!emailRef.current;
        if (isEmailFieldExist) emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        apiClient
            .post(
                apiRoutes.createLoginUrl(),
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                },
            )
            .then((response) => {
                const { accessToken, roles } = response.data;
                loginUser(email, password, accessToken, roles);
                navigate(from);
            })
            .catch((error) => {
                const status = error.response?.status;
                setErrorMessage(_getErrorMessage(status));

                const isErrorRefExist = !!errorRef.current;
                if (isErrorRefExist) errorRef.current.focus();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleRegister = () => {
        navigate(RoutePath.Register);
    };

    const isLoginButtonDisabled = isLoading || !email || !password;

    return {
        email,
        setEmail,
        password,
        setPassword,
        errorMessage,
        errorRef,
        handleLogin,
        handleRegister,
        isLoading,
        emailRef,
        isLoginButtonDisabled,
    };
};

const _getErrorMessage = (status: number | null) => {
    const isStatusNotExist = status === null;
    if (isStatusNotExist) return '';

    switch (status) {
        case HttpStatusCode.NotFound:
            return 'No account found for the entered email.';
        case HttpStatusCode.UnprocessableEntity:
            return 'Invalid email or password. Please try again.';
        case HttpStatusCode.Unauthorized:
            return 'Your session has expired. Please log in again.';
        case HttpStatusCode.InternalServerError:
            return 'An unexpected error occurred. Please try again later.';
        default:
            return 'An error occurred. Please check your connection and try again.';
    }
};
