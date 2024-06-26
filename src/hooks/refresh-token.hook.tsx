import { apiRoutes } from 'src/constant/api-routes';
import { useAuth } from 'src/context/auth-context';
import { apiClient } from 'src/services/api/api-service';

export const useRefreshToken = () => {
    const { authState, loginUser } = useAuth();
    const fetchRefreshToken = async () => {
        const response = await apiClient.post<{
            accessToken: string;
            roles: string[];
        }>(apiRoutes.createRefreshTokenUrl(), {}, { withCredentials: true });

        const { accessToken, roles } = response.data;
        loginUser(authState.email, authState.password, accessToken, roles);
        return accessToken;
    };

    return { fetchRefreshToken };
};
