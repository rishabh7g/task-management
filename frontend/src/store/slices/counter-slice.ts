import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store/store';

export interface CounterState {
    counter: number;
}

const initialState: CounterState = { counter: 0 };

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.counter++;
        },
        decrement: (state) => {
            state.counter--;
        },
    },
});

export const counterActions = counterSlice.actions;

export const getCounter = (state: RootState) => state.counter.counter;
