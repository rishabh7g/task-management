import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LocalStorageKeys } from 'src/constant/local-storage.constant';
import { useAuth } from 'src/context/auth-context';
import { useRefreshToken } from 'src/hooks/refresh-token.hook';
import { localStorageService } from 'src/services/local-storage/local-storage';

export const PersistLogin = () => {
    const { fetchRefreshToken } = useRefreshToken();
    const [isLoading, setIsLoading] = useState(true);
    const { authState } = useAuth();
    const isPersistLogin = localStorageService.get(
        LocalStorageKeys.IS_PERSIST_LOGIN,
        false,
    );

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await fetchRefreshToken();
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        const isUserNotLoggedIn = !authState.accessToken;
        const shouldVerifyRefreshToken = isUserNotLoggedIn && isPersistLogin;

        if (shouldVerifyRefreshToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <span>Loading...</span>;

    return <Outlet data-testid='outlet' />;
};
