import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { refreshAccessToken } from "../../features/utils/refreshToken"; // Убедитесь, что путь корректный

// Асинхронный thunk для загрузки SectionCard
export const fetchSectionCards = createAsyncThunk(
  "sectionCards/fetchSectionCards",
  async (_, { rejectWithValue }) => {
    let token = localStorage.getItem("access_token");

    const fetchData = async (current_token) => {
      const response = await axios.get(
        "https://api.tvelvi.ru/api/section-card/",
        {
          headers: {
            Authorization: `Bearer ${current_token}`,
          },
        }
      );
      return response.data;
    };

    try {
      if (!token) {
        token = await refreshAccessToken(); // Попытка обновить токен, если его нет
        if (!token) {
          throw new Error("Токен не найден и не удалось обновить.");
        }
      }
      return await fetchData(token);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            return await fetchData(newToken);
          } else {
            window.location.href = "/register";
            return rejectWithValue(
              "Сессия истекла. Пожалуйста, войдите снова."
            );
          }
        } catch (refreshError) {
          window.location.href = "/register";
          return rejectWithValue("Сессия истекла. Пожалуйста, войдите снова.");
        }
      }
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Асинхронный thunk для создания заказа из SectionCard
export const generateOrderFromSectionCard = createAsyncThunk(
  "sectionCards/generateOrderFromSectionCard",
  async (sectionCardId, { rejectWithValue }) => {
    let token = localStorage.getItem("access_token");

    const postData = async (current_token) => {
      const response = await axios.post(
        `https://api.tvelvi.ru/api/section-card/${sectionCardId}/generate-order/`,
        {}, // Пустое тело запроса
        {
          headers: {
            Authorization: `Bearer ${current_token}`,
          },
        }
      );
      return response.data;
    };

    try {
      if (!token) {
        token = await refreshAccessToken(); // Попытка обновить токен, если его нет
        if (!token) {
          throw new Error("Токен не найден и не удалось обновить.");
        }
      }
      return await postData(token);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            return await postData(newToken);
          } else {
            window.location.href = "/register";
            return rejectWithValue(
              "Сессия истекла. Пожалуйста, войдите снова."
            );
          }
        } catch (refreshError) {
          window.location.href = "/register";
          return rejectWithValue("Сессия истекла. Пожалуйста, войдите снова.");
        }
      }
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const sectionCardsSlice = createSlice({
  name: "sectionCards",
  initialState: {
    sections: [],
    status: "idle",
    error: null,
    generateOrderStatus: "idle",
    generateOrderError: null,
    // createdOrder: null, // Если нужно хранить данные созданного заказа
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectionCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSectionCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sections = action.payload;
      })
      .addCase(fetchSectionCards.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload || "Не удалось загрузить карточки разделов.";
      })
      .addCase(generateOrderFromSectionCard.pending, (state) => {
        state.generateOrderStatus = "loading";
        state.generateOrderError = null;
      })
      .addCase(generateOrderFromSectionCard.fulfilled, (state, action) => {
        state.generateOrderStatus = "succeeded";
        // state.createdOrder = action.payload; // Сохраняем данные созданного заказа
      })
      .addCase(generateOrderFromSectionCard.rejected, (state, action) => {
        state.generateOrderStatus = "failed";
        state.generateOrderError =
          action.payload || "Не удалось создать заказ.";
      });
  },
});

export default sectionCardsSlice.reducer;
