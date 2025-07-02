import { createSlice } from "@reduxjs/toolkit";

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState: {
    product: null, // Здесь будем хранить выбранный продукт
  },
  reducers: {
    selectProduct: (state, action) => {
      state.product = action.payload; // Записываем выбранный продукт
    },
    clearSelectedProduct: (state) => {
      state.product = null; // Очищаем выбранный продукт
    },
  },
});

export const { selectProduct, clearSelectedProduct } =
  selectedProductSlice.actions;

export default selectedProductSlice.reducer;
