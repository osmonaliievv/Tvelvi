import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MessagePage.css";

const MessagePage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [codeArray, setCodeArray] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCodeChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newCodeArray = [...codeArray];
      newCodeArray[index] = value;
      setCodeArray(newCodeArray);

      if (value && index < 5) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const code = codeArray.join("");

    const rawPhone = phoneNumber.replace(/\D/g, "");

    if (rawPhone.length !== 11 || !rawPhone.startsWith("7")) {
      setError(
        "Введите корректный номер телефона без знака '+', например: 7XXXXXXXXX"
      );
      return;
    }

    const formattedPhone = rawPhone;

    if (!formattedPhone || code.length !== 6) {
      setError("Пожалуйста, введите номер телефона и 6-значный код.");
      return;
    }

    console.log("Отправляемые данные:", {
      phone_number: formattedPhone,
      code: code,
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/verify-code/",
        {
          phone_number: formattedPhone,
          code: code,
        }
      );

      console.log("Ответ сервера:", response.data);

      if (response.data.detail === "Код подтверждён") {
        navigate("/home");
      } else {
        setError("Неверный код. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка при отправке кода:", error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Произошла ошибка. Попробуйте позже.");
      }
    }
  };

  return (
    <div className="MessagePage">
      <h2 className="title">Подтверждение номера</h2>

      <div>
        <label htmlFor="phoneNumber">Номер телефона:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="7XXXXXXXXX"
          maxLength="11"
        />
      </div>

      <div className="codeContainer">
        {codeArray.map((digit, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="text"
            className="codeInput"
            maxLength="1"
            value={digit}
            onChange={(e) => handleCodeChange(e, index)}
          />
        ))}
      </div>

      {error && <div className="error">{error}</div>}

      <button onClick={handleSubmit} className="submitBtn">
        Подтвердить
      </button>
    </div>
  );
};

export default MessagePage;
