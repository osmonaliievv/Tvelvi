import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyCode } from "../../features/auth/authSlice";
import "./MessagePage.css";
import main_image from "../../assets/Black.svg";

const MessagePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [codeArray, setCodeArray] = useState(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(150);

  const { loading, error, success, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (location.state?.phone_number) {
      setPhoneNumber(location.state.phone_number);
    }
  }, [location.state]);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [secondsLeft]);

  useEffect(() => {
    if (success) {
      // Переход на домашнюю страницу после успешной верификации
      navigate("/home");
    }
  }, [success, navigate]);

  useEffect(() => {
    // Проверка токена при монтировании компонента
    if (token) {
      navigate("/home"); // Если токен есть, переходим на главную страницу
    }
  }, [token, navigate]);

  const formatTime = () => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

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

  const handleSubmit = () => {
    const code = codeArray.join("");
    const rawPhone = phoneNumber.replace(/\D/g, "");

    if (!rawPhone || code.length !== 6) {
      alert("Пожалуйста, введите 6-значный код.");
      return;
    }

    dispatch(verifyCode({ phone_number: rawPhone, code }));
  };

  return (
    <div className="MessagePage">
      <div className="MessagePage-container">
        <div className="MessagePage-logo">
          <img src={main_image} alt="logo" />
        </div>
        <h2 className="title">Регистрация</h2>
        <p className="subtitle">СМС-код</p>

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
              placeholder="0"
            />
          ))}
        </div>

        {error && <div className="error">{error}</div>}
        <div className="timer">
          Код действует: <span className="timer-bold">{formatTime()}</span>
        </div>

        <button onClick={handleSubmit} className="submitBtn" disabled={loading}>
          {loading ? "Проверка..." : "Подтвердить"}
        </button>
      </div>
    </div>
  );
};

export default MessagePage;
