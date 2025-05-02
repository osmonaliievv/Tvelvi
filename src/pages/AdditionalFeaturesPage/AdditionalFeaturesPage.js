import React from "react";
import FeatureCard from "../FeatureCard/FeatureCard";

import icon_1 from "../../assets/image 73.svg";
import icon_2 from "../../assets/image 77.svg";
import icon_3 from "../../assets/image 78.svg";
import { useNavigate } from "react-router-dom";
const AdditionalFeaturesPage = ({ onPriceChange }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/designPage"); // укажи нужный путь
  };
  const features = [
    {
      title:
        "Удерживайте клиентов с помощью напоминаний — они будут возвращаться к вам!",
      price: 15000,
      description:
        "Удерживайте клиентов с помощью напоминаний — они будут возвращаться к вам!",
      image: (
        <img src={icon_1} alt="Лёгкий вход" className="feature-image-img" />
      ),
    },
    {
      title: "Повышаает user experience",
      price: 10000,
      description: "Поиск по каталогу",
    },
    {
      title: "Упомяните клиентов получить ответ — это повышает лояльность",
      price: 12000,
      description: "Отзывы и рейтинг",
      image: (
        <img src={icon_2} alt="Лёгкий вход" className="feature-image-img" />
      ),
    },
    {
      title: "Отслеживание курьеров — повышает уверенность клиентов и удобство",
      price: 20000,
      description:
        "Геолокация и отслеживание. Отслеживание местоположения курьеров в реальном времени.",
      image: <img src={icon_3} alt="" />,
    },
    {
      title: "Сделайте оплату легкой и удобной — клиенты оценят удобство",
      price: 30000,
      description:
        "Интеграция с платежными системами. Поддержка оплаты через банковские карты, электронные кошельки.",
      image: <img src={icon_3} alt="" />,
    },
  ];

  return (
    <div className="page">
      <div className="steps">
        <div
          className="active"
          onClick={() => navigate("/basicFeaturesPage")}
        ></div>
        <span className="active"></span>
        <div
          className="active"
          onClick={() => navigate("/additionalFeaturesPage")}
        ></div>
        <span></span>
        <div onClick={() => navigate("/designPage")}></div>
        <span></span>
        <div onClick={() => navigate("/finalPrice")}></div>
      </div>
      <h2 className="page-title">Дополнительные функции</h2>
      <div className="features-list">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            price={feature.price}
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

export default AdditionalFeaturesPage;
