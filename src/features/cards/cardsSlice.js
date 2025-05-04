// src/redux/cardsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Создаем асинхронную функцию для получения данных с API
export const fetchCards = createAsyncThunk("cards/fetchCards", async () => {
  const response = await axios.get("http://localhost:8000/api/cards/");
  return response.data;
});

// Инициализируем слайс
const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    products: [], // Массив для хранения данных о продуктах
    status: "idle", // Состояние запроса (idle, loading, succeeded, failed)
    error: null, // Ошибка, если есть
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading"; // Пока запрос в процессе
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded"; // Когда запрос завершен успешно
        state.products = action.payload; // Сохраняем данные о продуктах
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed"; // Когда запрос завершен с ошибкой
        state.error = action.error.message;
      });
  },
});

export default cardsSlice.reducer;
