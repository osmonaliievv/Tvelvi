import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "./PhoneInput";
import "./RegisterPage.css";
import main_image from "../../assets/Black.svg";

export default function RegisterPage() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (phone.replace(/\D/g, "").length === 11) {
      // 11 цифр для российского номера
      navigate("/message");
    }
  };

  const isActive = phone.replace(/\D/g, "").length === 11;

  return (
    <div className="registerPage">
      <div className="register-container">
        <div className="register-logo-container">
          <img src={main_image} alt="logo" />
        </div>

        <p className="register_name">Регистрация</p>

        <PhoneInput
          label="Номер телефона"
          value={phone}
          onChange={setPhone}
          classImg="phoneImg"
          name="phone"
          classInput="phoneInput"
        />
        <p className="register_name_sms">
          Для подтверждения, мы вышлем СМС-код на указанный номер
        </p>
        <button
          onClick={handleContinue}
          className={`register_button ${isActive ? "button-active" : ""}`}
          disabled={!isActive}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}
