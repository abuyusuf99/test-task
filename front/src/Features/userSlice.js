import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  oneuser: [],
  error: null,
  loading: false
};


export const findUser = createAsyncThunk(
  "findUser/fetch",
  async ({ email, number }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3000/find", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, number }),
      });
      const user = await res.json();
      if(user.error){
        return thunkAPI.rejectWithValue(user.error)
      }
      return thunkAPI.fulfillWithValue(user)
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);


const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findUser.fulfilled, (state, action) => {
        state.loading = false
        state.oneuser = action.payload;
        
      })
      .addCase(findUser.pending, (state) => {
        state.error = null
        state.loading = true
      })
   
    .addCase(findUser.rejected, (state,action)=>{
      state.loading = false
      state.error = action.payload
      
    })
  },
});
export default userSlice.reducer;
