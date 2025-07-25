import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { refreshAccessToken } from "../../features/utils/refreshToken"; // Путь к вашей утилите обновления токена

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    let token = localStorage.getItem("access_token");

    const postOrder = async (current_token) => {
      const response = await axios.post(
        "https://api.tvelvi.ru/api/orders/", // ЗАМЕНИТЕ НА ВАШ АДРЕС API для создания заказа
        orderData,
        {
          headers: {
            Authorization: `Bearer ${current_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    };

    try {
      if (!token) {
        token = await refreshAccessToken();
        if (!token) {
          throw new Error("Токен не найден и не удалось обновить.");
        }
      }
      return await postOrder(token);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            return await postOrder(newToken);
          } else {
            window.location.href = "/register";
            return rejectWithValue(
              "Сессия истекла. Пожалуйста, войдите снова."
            );
          }
        } catch (refreshError) {
          // window.location.href = "/register";
          return rejectWithValue("Сессия истекла. Пожалуйста, войдите снова.");
        }
      }
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    status: "idle",
    error: null,
    currentOrder: null, // Здесь можно хранить данные созданного заказа
  },
  reducers: {
    // Возможно, здесь будут редьюсеры для очистки текущего заказа и т.д.
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload; // Сохраняем данные созданного заказа
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
