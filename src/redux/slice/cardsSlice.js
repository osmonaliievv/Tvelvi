import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const getCards = createAsyncThunk(
  "cards/getCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://randomuser.me/api/`);
      if (response.status !== 200) {
        throw new Error("Ошибка при запросе");
      }
      return response.data;
    } catch (err) {
      return rejectWithValue({ message: "Ошибка при запросе", error: err });
    }
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload.message;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});

export default cardsSlice.reducer;
