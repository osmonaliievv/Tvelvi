import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { refreshAccessToken } from "../../features/utils/refreshToken"; // Импорт функции обновления токена

// Асинхронная функция для получения профиля пользователя
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    if (!token) return rejectWithValue("Токен не найден");

    try {
      const response = await fetch("http://localhost:8000/api/users/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        try {
          const newToken = await refreshAccessToken();
          const retryResponse = await fetch(
            "http://localhost:8000/api/users/me/",
            {
              headers: { Authorization: `Bearer ${newToken}` },
            }
          );

          if (!retryResponse.ok)
            throw new Error("Ошибка при повторном запросе");

          const data = await retryResponse.json();
          return data[0];
        } catch (err) {
          window.location.href = "/";
          return rejectWithValue("Сессия истекла. Пожалуйста, войдите снова.");
        }
      }

      if (!response.ok) throw new Error(`Ошибка: ${response.statusText}`);

      const data = await response.json();
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "user/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    if (!token) return rejectWithValue("Токен не найден");

    try {
      const response = await fetch(
        "http://localhost:8000/api/users/my_orders/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 401) {
        try {
          // Попробуем обновить access токен через refresh токен
          const newToken = await refreshAccessToken();
          const retryResponse = await fetch(
            "http://localhost:8000/api/users/my_orders/",
            {
              headers: { Authorization: `Bearer ${newToken}` },
            }
          );

          if (!retryResponse.ok)
            throw new Error("Ошибка при повторном запросе");

          const data = await retryResponse.json();
          return data;
        } catch (err) {
          window.location.href = "/";
          return rejectWithValue("Сессия истекла. Пожалуйста, войдите снова.");
        }
      }

      if (!response.ok) throw new Error(`Ошибка: ${response.statusText}`);

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    orders: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectUserProfile = (state) => state.user.profile;
export const selectUserOrders = (state) => state.user.orders;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
