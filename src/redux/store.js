import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cardsReducer from "../features/cards/cardsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
  },
});
