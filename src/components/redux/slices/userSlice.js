import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null  
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => { 
        state.user = action.payload;
    },
    deleteUser: (state) => { 
        state.user = null;
    }
  },
});

// Action creators
export const { setUser,deleteUser } = userSlice.actions;

export default userSlice.reducer;
