import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocalStorageKeys } from 'src/constant/local-storage.constant';
import { useInput } from 'src/hooks/input.hook';
import { RoutePath } from 'src/routes';
import {
    retryForbiddenRequestInterceptor,
    updateRequestHeaders,
} from 'src/services/api/api-service';
import { localStorageService } from 'src/services/local-storage/local-storage';
import {
    LoginPayload,
    loginUser,
    refreshToken,
    userSelectors,
} from 'src/store/slices/user-slice';
import { useAppDispatch } from 'src/store/store';

export const useLoginPageManagement = () => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(userSelectors.isLoading);
    const errorMessage = useSelector(userSelectors.getErrorMessage);

    const emailRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    const [email, setEmail] = useInput(LocalStorageKeys.EMAIL, '');
    const [password, setPassword] = useState('');

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

    const togglePersistUser = () => setIsPersistUser((prev) => !prev);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload: LoginPayload = { email, password };

        dispatch(loginUser(payload)).then((response) => {
            const { accessToken } = response.payload as { accessToken: string };
            updateRequestHeaders(accessToken);

            const generateNewAccessToken = async () => {
                const newAccessToken = await dispatch(refreshToken()).then(
                    (response) => {
                        const payload = response.payload as unknown as {
                            accessToken: string;
                        };
                        return payload.accessToken;
                    },
                );
                return newAccessToken;
            };

            retryForbiddenRequestInterceptor(generateNewAccessToken);
            return navigate(from);
        });

        if (isPersistUser)
            localStorageService.set(LocalStorageKeys.EMAIL, email);
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
