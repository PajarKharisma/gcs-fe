import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

export const fetchParam = createAsyncThunk(
  "gcs/fetchParam",
  async (params = null, thunkAPI) => {
    let response = null;
    try {
      response = await api.get(`context`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setParam = createAsyncThunk(
  "gcs/setParam",
  async (params = null, thunkAPI) => {
    let response = null;
    try {
      response = await api.post(`context`, params?.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const gcsSlice = createSlice({
  name: "gcs",
  initialState: {
    params: {},
    setParam: {
      status: null,
      data: null,
      error: null,
    },
  },
  reducers: {
    resetAllStatus: (state, action) => {
      state.setParam.status = null;
      state.setParam.data = null;
      state.setParam.error = null;
    },
  },
  extraReducers: (builder) => {
    // FETCH PARAMS
    builder.addCase(fetchParam.fulfilled, (state, action) => {
      state.params = action.payload?.data;
    });

    // SET PARAMS
    builder.addCase(setParam.pending, (state, action) => {
      state.setParam.status = "loading";
    });
    builder.addCase(setParam.fulfilled, (state, action) => {
      state.setParam.status = "success";
      state.setParam.data = action.payload.data;
    });
    builder.addCase(setParam.rejected, (state, action) => {
      state.setParam.status = "error";
      state.setParam.error = action.payload.message;
    });
  },
});

export default gcsSlice.reducer;
