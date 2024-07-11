import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

export const fetchDb = createAsyncThunk(
  "namescreen/db",
  async (params = null, thunkAPI) => {
    let response = null;
    try {
      response = await api.post(`namescreen/db`, params?.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addDb = createAsyncThunk(
  "namescreen/add-db",
  async (params = null, thunkAPI) => {
    let response = null;
    try {
      response = await api.post(`namescreen/add-db`, params?.data);
      //   thunkAPI.dispatch(fetchDb({ data: { page: 1, search: null } }));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteDb = createAsyncThunk(
  "namescreen/delete-db",
  async (params = null, thunkAPI) => {
    let response = null;
    try {
      response = await api.delete(`namescreen/delete-db/${params.id}`);
      //   thunkAPI.dispatch(fetchDb({ data: { page: 1, search: null } }));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkName = createAsyncThunk(
  "namescreen/check",
  async (params = null, thunkAPI) => {
    let response = null;
    try {
      response = await api.post(`namescreen/check`, params?.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const namescreenSlice = createSlice({
  name: "namescreen",
  initialState: {
    getDb: {
      params: {},
      data: {
        list: [],
      },
      status: null,
    },
    addDb: {
      status: null,
      data: null,
      error: null,
    },
    deleteDb: {
      status: null,
      data: null,
      error: null,
    },
    checkName: {
      params: {},
      data: {},
      status: null,
    },
  },
  reducers: {
    resetAllStatus: (state, action) => {
      state.getDb.params = {};
      state.getDb.status = null;
      state.getDb.data.list = [];

      state.addDb.status = null;
      state.addDb.data = null;
      state.addDb.error = null;

      state.deleteDb.status = null;
      state.deleteDb.data = null;
      state.deleteDb.error = null;

      state.checkName.params = {};
      state.checkName.status = null;
      state.checkName.data = {};
    },
  },
  extraReducers: (builder) => {
    // FETCH DB
    builder.addCase(fetchDb.pending, (state, action) => {
      state.getDb.status = "loading";
    });
    builder.addCase(fetchDb.rejected, (state, action) => {
      state.getDb.status = "error";
    });
    builder.addCase(fetchDb.fulfilled, (state, action) => {
      state.getDb.status = "success";
      state.getDb.data = action.payload.data;
    });

    // ADD DB
    builder.addCase(addDb.pending, (state, action) => {
      state.addDb.status = "loading";
    });
    builder.addCase(addDb.rejected, (state, action) => {
      state.addDb.status = "error";
      state.addDb.error = action.payload.message;
    });
    builder.addCase(addDb.fulfilled, (state, action) => {
      state.addDb.status = "success";
      state.addDb.data = action.payload.data;
    });

    // DELETE DB
    builder.addCase(deleteDb.pending, (state, action) => {
      state.deleteDb.status = "loading";
    });
    builder.addCase(deleteDb.rejected, (state, action) => {
      state.deleteDb.status = "error";
      state.deleteDb.error = action.payload.message;
    });
    builder.addCase(deleteDb.fulfilled, (state, action) => {
      state.deleteDb.status = "success";
      state.deleteDb.data = action.payload.data;
    });

    // CHECK NAMESCREEN
    builder.addCase(checkName.pending, (state, action) => {
      state.checkName.status = "loading";
    });
    builder.addCase(checkName.rejected, (state, action) => {
      state.checkName.status = "error";
      state.checkName.error = action.payload.message;
    });
    builder.addCase(checkName.fulfilled, (state, action) => {
      state.checkName.status = "success";
      state.checkName.data = action.payload.data;
    });
  },
});

export default namescreenSlice.reducer;
