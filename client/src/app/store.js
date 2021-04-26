import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import intruderReducer from '../features/intruderSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    intruder: intruderReducer,
  },
});
