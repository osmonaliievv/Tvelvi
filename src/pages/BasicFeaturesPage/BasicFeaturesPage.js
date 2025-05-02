import React from "react";
import FeatureCard from "../FeatureCard/FeatureCard";
import icon_1 from "../../assets/image 79.svg";
import icon_2 from "../../assets/image 80.svg";
import icon_3 from "../../assets/freepik__background__70030 1.svg";
import icon_4 from "../../assets/image 72.svg";
import "./BasicFeaturesPage.css";
import { useNavigate } from "react-router-dom";
const BasicFeaturesPage = ({ onPriceChange }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/additionalFeaturesPage"); // укажи нужный путь
  };

  const features = [
    {
      title:
        "Лёгкий вход для ваших клиентов — повышение конверсии и лояльности.",
      price: 15000,
      title2: "Регистрация и авторизация",
      description:
        "Функция позволяет пользователям регистрироваться и входить через почту, соцсети или номер телефона.",
      image: (
        <img src={icon_1} alt="Лёгкий вход" className="feature-image-img" />
      ),
    },
    {
      title:
        "Каждый профиль помогает лучше узнать потребности клиента и удивить его.",
      price: 10000,
      title2: "Профили пользователя",
      description:
        " Позволяет пользователям настраивать свои данные, загрузить фото и контактную информацию.",
      image: (
        <img
          src={icon_2}
          alt="Профили пользователя"
          className="feature-image-img"
        />
      ),
    },
    {
      title: "Легкий доступ к важной информации — повышает оценку удобства",
      price: 10000,
      title2: "Навигация и главная страница",
      description:
        "Интуитивная система навигации и понятный главный экран с быстрым доступом к основным функциям.",
      image: <img src={icon_3} alt="Навигация" className="feature-image-img" />,
    },
    {
      title: "Ваши клиенты будут оформлять заказы быстрее и с удобством",
      price: 15000,
      title2: "Оформление заказов",
      description:
        "Позволяет пользователям быстро и удобно оформлять заказы через приложение.",
      image: (
        <img
          src={icon_4}
          alt="Оформление заказов"
          className="feature-image-img"
        />
      ),
    },
  ];

  return (
    <div className="page">
      <div className="steps">
        <div
          className="active"
          onClick={() => navigate("/basicFeaturesPage")}
        ></div>
        <span></span>
        <div onClick={() => navigate("/additionalFeaturesPage")}></div>
        <span></span>
        <div onClick={() => navigate("/designPage")}></div>
        <span></span>
        <div onClick={() => navigate("/finalPrice")}></div>
      </div>
      <h2 className="page-title">Базовые функции</h2>
      <div className="features-list">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            price={feature.price}
            title2={feature.title2}
            description={feature.description}
            image={feature.image}
            onPriceChange={onPriceChange}
          />
        ))}
      </div>
      <div className="fixed-button-container">
        <button onClick={handleClick} className="action-button">
          Готово
        </button>
      </div>
    </div>
  );
};

export default BasicFeaturesPage;
