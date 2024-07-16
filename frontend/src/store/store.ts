import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from 'src/store/slices/counter-slice';

const reducer = {
    counter: counterSlice.reducer,
};

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
