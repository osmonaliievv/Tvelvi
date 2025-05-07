import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронный thunk для загрузки продуктов
export const fetchProducts = createAsyncThunk(
  "cards/fetchProducts",
  async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Access token not found in localStorage");
      }

      const response = await axios.get("http://localhost:8000/api/cards/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data); // Логируем ответ сервера

      return response.data; // Возвращаем данные продуктов
    } catch (error) {
      throw new Error(`Ошибка при запросе: ${error.message}`);
    }
  }
);

// Redux slice
const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cardsSlice.reducer;
