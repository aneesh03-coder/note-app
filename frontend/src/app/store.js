import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userLoginSlice';
import userRegistrationReducer from '../features/user/userRegistrationSlice';
import notesReducer from "../features/notes/noteListSlice"

export const store = configureStore({
  
  reducer: {
    userLogin: userReducer,
    userRegistration:userRegistrationReducer,
    noteList:notesReducer,
  },
});
