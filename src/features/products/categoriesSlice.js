import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Экшен для начала загрузки
    fetchCategoriesStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    // Экшен для успешного завершения загрузки
    fetchCategoriesSuccess: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    },
    // Экшен для ошибки загрузки
    fetchCategoriesFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.items = []; // Очищаем данные при ошибке
    },
    // Вы можете добавить другие синхронные редьюсеры по необходимости
  },
});

// Экспортируем экшены для использования в компоненте
export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
