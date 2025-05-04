import React, { useEffect, useState } from "react";
import "./MessagePage.css";
import { useNavigate } from "react-router-dom";

export default function MessagePage() {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(150); // 2:30 минуты
  const navigate = useNavigate();

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [secondsLeft]);

  const formatTime = () => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };
  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updated = [...code];
      updated[index] = value;
      setCode(updated);

      // автофокус на следующий
      if (value && index < 4) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };
  const handleSubmit = () => {
    if (isComplete) {
      navigate("/home"); // переход на главную страницу
    }
  };
  const isComplete = code.every((digit) => digit !== "");

  return (
    <div className="message-container">
      <p className="register_name">Регистрация</p>
      <p className="register_tel">Номер телефона</p>
      <label className="sms-label">СМС-код</label>
      <div className="sms-inputs">
        {code.map((val, i) => (
          <input
            key={i}
            id={`code-${i}`}
            maxLength="1"
            className="sms-input"
            value={val}
            placeholder="0"
            onChange={(e) => handleChange(i, e.target.value)}
            type="number"
          />
        ))}
      </div>
      <div className="timer">
        Код действует: <span className="timer-bold">{formatTime()}</span>
      </div>
      <button
        disabled={!isComplete}
        className={`submit-button ${
          isComplete ? "button-active" : "button-disabled"
        }`}
        onClick={handleSubmit}
      >
        Продолжить
      </button>
    </div>
  );
}
