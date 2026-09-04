import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import procurementReducer from './slices/procurementSlice';
import standardReducer from './slices/standardSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    procurement: procurementReducer,
    standards: standardReducer,
    chat: chatReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
