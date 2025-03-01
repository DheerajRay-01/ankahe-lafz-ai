import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response : "", 
};

export const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    addResponse: (state, action) => {
        
        state.response = action.payload;
    }
  },
});

// Action creators
export const { addResponse } = responseSlice.actions;

export default responseSlice.reducer;
