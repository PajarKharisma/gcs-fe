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

export const setAntenaPos = createAsyncThunk(
  "gcs/setAntenaPos",
  async (params = null, thunkAPI) => {
    let response = null;
    try {
      response = await api.get(`context/set-antena-pos`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetAntenaPos = createAsyncThunk(
  "gcs/resetAntenaPos",
  async (params = null, thunkAPI) => {
    let response = null;
    try {
      response = await api.get(`context/reset-antena-pos`);
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
    setAntenaPos: {
      status: null
    },
    resetAntenaPos: {
      status: null
    }
  },
  reducers: {
    resetAllStatus: (state, action) => {
      state.setParam.status = null;
      state.setParam.data = null;
      state.setParam.error = null;
      state.setAntenaPos.status = null;
      state.resetAntenaPos.status = null;
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

    // SET ANTENA POS
    builder.addCase(setAntenaPos.pending, (state, action) => {
      state.setAntenaPos.status = "loading";
    });
    builder.addCase(setAntenaPos.fulfilled, (state, action) => {
      state.setAntenaPos.status = "success";
    });
    builder.addCase(setAntenaPos.rejected, (state, action) => {
      state.setAntenaPos.status = "error";
    });

    // RESET ANTENA POS
    builder.addCase(resetAntenaPos.pending, (state, action) => {
      state.resetAntenaPos.status = "loading";
    });
    builder.addCase(resetAntenaPos.fulfilled, (state, action) => {
      state.resetAntenaPos.status = "success";
    });
    builder.addCase(resetAntenaPos.rejected, (state, action) => {
      state.resetAntenaPos.status = "error";
    });
  },
});

export default gcsSlice.reducer;
