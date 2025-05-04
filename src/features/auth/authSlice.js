import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendPhoneNumber = createAsyncThunk(
  "auth/sendPhoneNumber",
  async (phoneNumber, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/send-code/",
        {
          phone_number: phoneNumber,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Ошибка сервера");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    phone: "",
    status: null,
    error: null,
  },
  reducers: {
    setPhone(state, action) {
      state.phone = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPhoneNumber.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendPhoneNumber.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(sendPhoneNumber.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPhone } = authSlice.actions;
export default authSlice.reducer;
