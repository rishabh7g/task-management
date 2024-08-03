import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { HttpStatusCode } from 'axios';
import { apiRoutes } from 'src/constant/api-routes';
import { apiClient } from 'src/services/api/api-service';
import { RootState } from 'src/store/store';

interface UserSliceState {
    userData: UserData;
    isLoading: boolean;
    errorMessage: string;
}

interface UserData {
    id: string;
    email: string;
    accessToken: string;
}

const initialState: UserSliceState = {
    userData: { id: '', email: '', accessToken: '' },
    isLoading: false,
    errorMessage: '',
};

export interface LoginPayload {
    email: string;
    password: string;
}

interface ResponseType {
    id: string;
    accessToken: string;
}

const loginApiCall = async (payload: LoginPayload) =>
    apiClient
        .post<ResponseType>(apiRoutes.createLoginUrl(), payload, {
            withCredentials: true,
        })
        .then((response) => response.data)
        .catch((error) => {
            return Promise.reject({
                message: _getErrorMessage(error.response.status),
            });
        });

const logoutApiCall = async () => {
    apiClient.delete(apiRoutes.createLogoutUrl(), {
        withCredentials: true,
    });
};

const refreshTokenApiCall = async () =>
    apiClient
        .post<ResponseType>(apiRoutes.createRefreshTokenUrl(), EMPTY_PAYLOAD, {
            withCredentials: true,
        })
        .then((response) => response.data);

const EMPTY_PAYLOAD = {};
const SLICE_NAME = 'user';

export const loginUser = createAsyncThunk(`${SLICE_NAME}/login`, loginApiCall);
export const logoutUser = createAsyncThunk(
    `${SLICE_NAME}/logout`,
    logoutApiCall,
);
export const refreshToken = createAsyncThunk(
    `${SLICE_NAME}/refresh`,
    refreshTokenApiCall,
);

const extraReducers = (builder: ActionReducerMapBuilder<UserSliceState>) => {
    //Login builder case
    builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.errorMessage = '';
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = {
                email: action.meta.arg.email,
                id: action.payload.id,
                accessToken: action.payload.accessToken,
            };
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message || '';
        });

    //Logout builder case
    builder
        .addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
            state.errorMessage = '';
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.userData = { id: '', email: '', accessToken: '' };
            state.isLoading = false;
            state.errorMessage = '';
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message || '';
        });

    //Refresh token builder case
    builder
        .addCase(refreshToken.pending, (state) => {
            state.isLoading = true;
            state.errorMessage = '';
        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData.accessToken = action.payload.accessToken;
        })
        .addCase(refreshToken.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error.message || '';
        });
};

const reducers = {
    //add reducer to reset errorMessage
    resetErrorMessage: (state: UserSliceState) => ({
        ...state,
        errorMessage: '',
    }),
};

export const userSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers,
    extraReducers,
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

export const userSelectors = {
    getAccessToken: (state: RootState) => state.user.userData.accessToken,
    isLoading: (state: RootState) => state.user.isLoading,
    getErrorMessage: (state: RootState) => state.user.errorMessage,
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
