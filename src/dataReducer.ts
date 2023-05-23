import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  data: any[];
}

const initialState: DataState = {
  data: [],
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<any>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addData } = dataSlice.actions;
export default dataSlice.reducer;
