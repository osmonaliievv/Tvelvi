import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'

export default function RegisterPage() {
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleInput = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        setPhone(val.slice(0, 11));
    };

    const handleContinue = () => {
        if (phone.length === 11) {
            navigate('/message');
        }
    };

    const isActive = phone.length === 11;

    return (
        <div className="registerPage">
            <div className="register-container">

                <p className="register_name">Регистрация</p>
                <p className="register_tel">Номер телефона</p>
                <input
                    type="tel"
                    value={phone}
                    onChange={handleInput}
                    placeholder="+7 (___) ___-__-__"
                    className="input"
                />
                <button
                    onClick={handleContinue}
                    className={`button ${isActive ? 'button-active' : ''}`}
                    disabled={!isActive}
                >
                    Продолжить
                </button>
            </div>
        </div>
    );
}