import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cardsReducer from "../features/cards/cardsSlice";
import userReducer from "../features/user/userSlice";
import selectedCardsReducer from "../features/selectedCards/selectedCardsSlice";
import categoriesReducer from "../features/products/categoriesSlice";
import sectionCardsReducer from "../features/sectionCards/sectionCardsSlice";
import selectedProductReducer from "../features/selectedProducts/selectedProductSlice";
import ordersReducer from "../features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
    user: userReducer,
    selectedCards: selectedCardsReducer,
    categories: categoriesReducer,
    sectionCards: sectionCardsReducer,
    selectedProduct: selectedProductReducer,
    orders: ordersReducer,
  },
});
