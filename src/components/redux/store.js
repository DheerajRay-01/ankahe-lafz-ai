import { configureStore } from '@reduxjs/toolkit'
import responseReducer from './slices/responseSlice.js'

export const store = configureStore({
  reducer: {
    response : responseReducer
  },
})