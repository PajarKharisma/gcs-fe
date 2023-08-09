import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const fetchParam = createAsyncThunk(
  "data/fetchParam",
  async (params = null, thunkAPI) => {
    let response = null;
    try {
      response = await api.get(`context/get-output`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    params: {},
  },
  extraReducers: (builder) => {
    // FETCH DATA
    builder.addCase(fetchParam.fulfilled, (state, action) => {
      state.params = action.payload?.data;
    });
  },
});

export default dataSlice.reducer;
