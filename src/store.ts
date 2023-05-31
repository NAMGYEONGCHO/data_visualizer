import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataReducer';

/**
 * At this point, this store is not currently in use. 
 * The existing query client adequately manages our data handling needs. 
 * However, this configureStore remains available for potential future requirements.
 * */ 
const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
