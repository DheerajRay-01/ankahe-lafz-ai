import { configureStore } from '@reduxjs/toolkit'
import responseReducer from './slices/responseSlice.js'
import  userReducer  from './slices/userSlice.js'

export const store = configureStore({
  reducer: {
    response : responseReducer,
    user : userReducer
  },
})