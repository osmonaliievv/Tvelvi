import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cardsReducer from "../features/cards/cardsSlice";
import userReducer from "../features/user/userSlice";
import selectedCardsReducer from "../features/selectedCards/selectedCardsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
    user: userReducer,
    selectedCards: selectedCardsReducer,
  },
});
