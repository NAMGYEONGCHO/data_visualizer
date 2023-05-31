import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * At this point, this reducer is not currently in use. 
 * The existing query client adequately manages our data handling needs. 
 * However, this reducer remains available for potential future requirements.
 * */  
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
