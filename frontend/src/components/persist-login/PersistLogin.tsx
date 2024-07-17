import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { LocalStorageKeys } from 'src/constant/local-storage.constant';
import { useRefreshToken } from 'src/hooks/refresh-token.hook';
import { localStorageService } from 'src/services/local-storage/local-storage';
import { userSelectors } from 'src/store/slices/user-slice';

export const PersistLogin = () => {
    const { fetchRefreshToken } = useRefreshToken();
    const [isLoading, setIsLoading] = useState(true);
    const accessToken = useSelector(userSelectors.getAccessToken);
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

        const isUserNotLoggedIn = !accessToken;
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
