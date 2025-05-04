import React, { useState } from "react";
import axios from "axios";
import PhoneInput from "./PhoneInput"; // Убедись, что у тебя есть компонент PhoneInput
import { useNavigate } from "react-router-dom"; // Подключаем useNavigate для навигации
import "./RegisterPage.css"; // Подключаем стили
import main_image from "../../assets/Black.svg"; // Логотип для страницы

const RegisterPage = () => {
  const [phone, setPhone] = useState(""); // Состояние для номера телефона
  const [loading, setLoading] = useState(false); // Состояние для отображения загрузки
  const [errorMessage, setErrorMessage] = useState(""); // Сообщение об ошибке
  const navigate = useNavigate(); // Инициализируем useNavigate для перехода на другие страницы

  // Функция для отправки номера телефона на сервер
  const handleSubmit = async () => {
    setErrorMessage(""); // Очищаем старую ошибку

    // Убедимся, что номер телефона содержит только цифры
    const cleanPhone = phone.replace(/\D/g, "");

    // Проверяем длину номера телефона
    if (cleanPhone.length !== 11) {
      setErrorMessage("Номер телефона должен содержать 11 цифр.");
      return;
    }

    setLoading(true); // Включаем индикатор загрузки

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/send-code/",
        {
          phone_number: cleanPhone, // Отправляем только цифры номера телефона
        }
      );

      console.log("Ответ сервера:", response.data); // Ответ сервера

      // Дальше можно выполнить действия, если код был успешно отправлен
      alert("Код отправлен на номер телефона.");

      // Переходим на страницу подтверждения (например, /message)
      navigate("/message"); // Укажите путь, на который хотите перейти
    } catch (error) {
      setLoading(false); // Отключаем индикатор загрузки

      if (error.response) {
        console.error("Ошибка ответа:", error.response.data);
        setErrorMessage(
          `Ошибка: ${error.response.data.error || "Что-то пошло не так."}`
        );
      } else {
        console.error("Ошибка запроса:", error);
        setErrorMessage("Ошибка при отправке запроса.");
      }
    }
  };

  return (
    <div className="registerPage">
      <div className="register-container">
        {/* Логотип */}
        <div className="register-logo-container">
          <img src={main_image} alt="logo" />
        </div>
        <p className="register_name">Регистрация</p> {/* Заголовок страницы */}
        {/* Поле для ввода номера телефона */}
        <PhoneInput
          label="Номер телефона"
          value={phone}
          onChange={setPhone}
          classImg="phoneImg"
          name="phone"
          classInput="phoneInput"
        />
        {/* Подсказка для пользователя */}
        <p className="register_name_sms">
          Для подтверждения, мы вышлем СМС-код на указанный номер
        </p>
        {/* Кнопка для отправки номера телефона */}
        <button
          onClick={handleSubmit}
          className={`register_button ${
            phone.replace(/\D/g, "").length === 11 ? "button-active" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Отправка..." : "Продолжить"}
        </button>
        {/* Отображение сообщения об ошибке */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
