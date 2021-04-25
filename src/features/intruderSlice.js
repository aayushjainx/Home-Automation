import { createSlice } from '@reduxjs/toolkit';

export const intruderSlice = createSlice({
  name: 'intruder',
  initialState: {
    intruder: false,
  },
  reducers: {
    on: (state) => {
      state.intruder = true;
    },
    off: (state) => {
      state.intruder = false;
    },
  },
});

export const { on, off } = intruderSlice.actions;

export const selectIntruder = (state) => state.intruder.intruder;

export default intruderSlice.reducer;
