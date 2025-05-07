import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendCode = createAsyncThunk(
  "auth/sendCode",
  async (phoneNumber, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/send-code/",
        { phone_number: phoneNumber }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Ошибка при отправке кода"
      );
    }
  }
);

export const verifyCode = createAsyncThunk(
  "auth/verifyCode",
  async ({ phone_number, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/verify-code/",
        { phone_number, code }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Ошибка при верификации кода"
      );
    }
  }
);

// ✅ Удаление аккаунта
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (userId, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.delete(
        `http://localhost:8000/api/users/user/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Ошибка при удалении аккаунта"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: "",
    success: false,
    token: localStorage.getItem("access_token") || null,
  },
  reducers: {
    clearAuthState: (state) => {
      state.loading = false;
      state.error = "";
      state.success = false;
      state.token = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCode.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(sendCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const accessToken = action.payload.access || action.payload.token;
        const refreshToken = action.payload.refresh;

        if (accessToken) {
          localStorage.setItem("access_token", accessToken);
          state.token = accessToken;
        }

        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken);
        }
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
