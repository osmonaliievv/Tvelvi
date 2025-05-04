import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./slice/cardsSlice";

export const store = configureStore({
  reducer: {
    cardsSlice,
  },
});
