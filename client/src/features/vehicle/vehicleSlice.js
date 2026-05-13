import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const uploadImage = createAsyncThunk(
  "vehicle/upload",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/upload`,
        formData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getLogs = createAsyncThunk(
  "vehicle/getLogs",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/logs`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const vehicleSlice = createSlice({
  name: "vehicle",

  initialState: {
    logs: [],
    loading: false,
    detectedPlate: "",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;

        state.detectedPlate =
          action.payload.plateNumber;

        state.logs.unshift(action.payload);
      })

      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getLogs.fulfilled, (state, action) => {
        state.logs = action.payload;
      });
  },
});

export default vehicleSlice.reducer;