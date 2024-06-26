import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from 'src/context/auth-context';
import { useRefreshToken } from 'src/hooks/refresh-token.hook';

export const PersistLogin = () => {
    const { fetchRefreshToken } = useRefreshToken();
    const [isLoading, setIsLoading] = useState(true);
    const { authState } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await fetchRefreshToken();
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        const isUserNotLoggedIn = !authState.accessToken;
        if (isUserNotLoggedIn) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <span>Loading...</span>;

    return <Outlet />;
};
