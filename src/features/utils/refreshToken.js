import axios from "axios";

export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("refresh_token");

  if (!refresh) throw new Error("Refresh token отсутствует");

  try {
    const response = await axios.post(
      "http://localhost:8000/api/users/token/refresh/",
      {
        refresh,
      }
    );

    const { access } = response.data;
    localStorage.setItem("access_token", access);
    return access;
  } catch (error) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    throw new Error("Не удалось обновить access токен");
  }
};
