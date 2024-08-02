import { refreshToken } from 'src/store/slices/user-slice';
import { useAppDispatch } from 'src/store/store';

export const useRefreshToken = () => {
    const dispatch = useAppDispatch();
    const fetchRefreshToken = async () => dispatch(refreshToken());

    return { fetchRefreshToken };
};
