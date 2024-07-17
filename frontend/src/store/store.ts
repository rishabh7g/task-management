import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { userSlice } from 'src/store/slices/user-slice';

const reducer = {
    user: userSlice.reducer,
};

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
