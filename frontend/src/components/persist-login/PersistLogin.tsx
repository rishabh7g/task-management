import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from 'src/context/auth-context';
import { useRefreshToken } from 'src/hooks/refresh-token.hook';

export const PersistLogin = () => {
    const { fetchRefreshToken } = useRefreshToken();
    const [isLoading, setIsLoading] = useState(true);
    const { authState } = useAuth();

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
        const shouldVerifyRefreshToken =
            isUserNotLoggedIn && authState.isPersistLogin;

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

    return <Outlet />;
};
