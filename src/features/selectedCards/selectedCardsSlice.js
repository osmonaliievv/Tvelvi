import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { refreshAccessToken } from "../../features/utils/refreshToken"; // Убедитесь, что путь корректный

// Асинхронная функция для отправки данных заказа (POST запрос)
export const sendOrderData = createAsyncThunk(
  "selectedCards/sendOrderData",
  async (orderData, { rejectWithValue }) => {
    // Убрали orderId из аргументов
    const token = localStorage.getItem("access_token");
    if (!token) return rejectWithValue("Токен не найден");

    try {
      const response = await fetch(
        `http://localhost:8000/api/orders/`, // Изменили URL, убрали ${orderId}
        {
          method: "POST", // Изменили метод на POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.status === 401) {
        try {
          const newToken = await refreshAccessToken();
          const retryResponse = await fetch(
            `http://localhost:8000/api/orders/`, // Изменили URL и здесь
            {
              method: "POST", // Изменили метод и здесь
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newToken}`,
              },
              body: JSON.stringify(orderData),
            }
          );
          if (!retryResponse.ok) {
            const errorData = await retryResponse.json();
            return rejectWithValue(errorData);
          }
          const data = await retryResponse.json();
          console.log("Данные успешно отправлены (retry):", data);
          return data;
        } catch (error) {
          window.location.href = "/";
          return rejectWithValue("Сессия истекла. Пожалуйста, войдите снова.");
        }
      }

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      console.log("Данные успешно отправлены:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const selectedCardsSlice = createSlice({
  name: "selectedCards",
  initialState: {
    selectedBasic: [],
    selectedAdditional: [],
    selectedDesign: [],
    sendOrderStatus: "idle",
    sendOrderError: null,
  },
  reducers: {
    addBasicCard: (state, action) => {
      state.selectedBasic.push(action.payload);
    },
    removeBasicCard: (state, action) => {
      state.selectedBasic = state.selectedBasic.filter(
        (card) => card.id !== action.payload.id
      );
    },
    addAdditionalCard: (state, action) => {
      state.selectedAdditional.push(action.payload);
    },
    removeAdditionalCard: (state, action) => {
      state.selectedAdditional = state.selectedAdditional.filter(
        (card) => card.id !== action.payload.id
      );
    },
    addDesignCard: (state, action) => {
      state.selectedDesign.push(action.payload);
    },
    removeDesignCard: (state, action) => {
      state.selectedDesign = state.selectedDesign.filter(
        (card) => card.id !== action.payload.id
      );
    },
    clearSelectedCards: (state) => {
      state.selectedBasic = [];
      state.selectedAdditional = [];
      state.selectedDesign = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderData.pending, (state) => {
        state.sendOrderStatus = "loading";
        state.sendOrderError = null;
      })
      .addCase(sendOrderData.fulfilled, (state, action) => {
        state.sendOrderStatus = "succeeded";
      })
      .addCase(sendOrderData.rejected, (state, action) => {
        state.sendOrderStatus = "failed";
        state.sendOrderError = action.payload;
      });
  },
});

export const {
  addBasicCard,
  removeBasicCard,
  addAdditionalCard,
  removeAdditionalCard,
  addDesignCard,
  removeDesignCard,
  clearSelectedCards,
} = selectedCardsSlice.actions;

export const selectSelectedBasicCards = (state) =>
  state.selectedCards.selectedBasic;
export const selectSelectedAdditionalCards = (state) =>
  state.selectedCards.selectedAdditional;
export const selectSelectedDesignCards = (state) =>
  state.selectedCards.selectedDesign;
export const selectSendOrderStatus = (state) =>
  state.selectedCards.sendOrderStatus;
export const selectSendOrderError = (state) =>
  state.selectedCards.sendOrderError;

export default selectedCardsSlice.reducer;
