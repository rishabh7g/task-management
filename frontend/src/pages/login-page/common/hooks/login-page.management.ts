import { HttpStatusCode } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiRoutes } from 'src/constant/api-routes';
import { LocalStorageKeys } from 'src/constant/local-storage.constant';
import { useAuth } from 'src/context/auth-context';
import { useInput } from 'src/hooks/input.hook';
import { RoutePath } from 'src/routes';
import { apiClient } from 'src/services/api/api-service';
import { localStorageService } from 'src/services/local-storage/local-storage';

export const useLoginPageManagement = () => {
    const { authState, loginUser } = useAuth();

    const emailRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    const [email, setEmail] = useInput(LocalStorageKeys.EMAIL, '');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [isPersistUser, setIsPersistUser] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || RoutePath.Home;

    useEffect(() => {
        localStorageService.set(
            LocalStorageKeys.IS_PERSIST_LOGIN,
            isPersistUser,
        );
    }, [isPersistUser]);

    useEffect(() => {
        const isEmailFieldExist = !!emailRef.current;
        if (isEmailFieldExist) emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    const togglePersistUser = () => setIsPersistUser((prev) => !prev);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const payload = { email, password };
        if (isPersistUser)
            localStorageService.set(LocalStorageKeys.EMAIL, email);

        apiClient
            .post(apiRoutes.createLoginUrl(), payload, {
                withCredentials: true,
            })
            .then((response) => {
                const { accessToken } = response.data;
                loginUser({
                    ...authState,
                    accessToken,
                });
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
        isPersistUser,
        togglePersistUser,
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
