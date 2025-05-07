import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendCode } from "../../features/auth/authSlice";
import PhoneInput from "./PhoneInput";
import main_image from "../../assets/Black.svg";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 11) {
      alert("Номер телефона должен содержать 11 цифр.");
      return;
    }

    const resultAction = await dispatch(sendCode(cleanPhone));

    if (sendCode.fulfilled.match(resultAction)) {
      alert("Код отправлен на номер телефона.");
      navigate("/message", { state: { phone_number: phone } });
    }
  };

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
          onClick={handleSubmit}
          className={`register_button ${
            phone.replace(/\D/g, "").length === 11 ? "button-active" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Отправка..." : "Продолжить"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
