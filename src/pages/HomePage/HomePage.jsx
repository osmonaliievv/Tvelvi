import React, { useState } from "react";
import "./HomePage.css";
import left_card from "../../assets/Frame 168.svg";
import center_card from "../../assets/Frame 169.svg";
import right_card from "../../assets/Frame 170.svg";
import foodtech_app from "../../assets/Frame 208.svg";
import internet_marketplace from "../../assets/Frame 209.svg";
import service_block from "../../assets/Frame 210.svg";
import service_delivery from "../../assets/Frame 211.svg";
import messenger_app from "../../assets/Frame 212.svg";
import training_app from "../../assets/Frame 213.svg";
import img_partners from "../../assets/Remove-bg.ai_1732383936587 1.svg";
import main_image from "../../assets/Black.svg";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState(
    "Приложения",
    "Разработка сайтов",
    "Разработка игр"
  );
  const navigate = useNavigate();

  const handleClickForPartners = () => {
    navigate("/partners");
  };
  const handleClick2 = () => {
    navigate("/profile");
  };
  const categories = ["Приложения", "Разработка сайтов", "Разработка игр"];

  const data = {
    Приложения: [
      { title: "Фудтех-приложение", image: foodtech_app },
      { title: "Интернет-магазин", image: internet_marketplace },
      { title: "Сервис бронирования", image: service_block },
      { title: "Сервис доставки", image: service_delivery },
      { title: "Приложение соцсети", image: messenger_app },
      { title: "Приложение обучения", image: training_app },
    ],
    "Разработка сайтов": [
      { title: "Фудтех-приложение1", image: foodtech_app },
      { title: "Интернет-магазин", image: internet_marketplace },
      { title: "Сервис бронирования", image: service_block },
      { title: "Сервис доставки", image: service_delivery },
      { title: "Приложение соцсети", image: messenger_app },
      { title: "Приложение обучения", image: training_app },
    ],
    "Разработка игр": [
      { title: "Фудтех-приложение2", image: foodtech_app },
      { title: "Интернет-магазин", image: internet_marketplace },
      { title: "Сервис бронирования", image: service_block },
      { title: "Сервис доставки", image: service_delivery },
      { title: "Приложение соцсети", image: messenger_app },
      { title: "Приложение обучения", image: training_app },
    ],
  };
  return (
    <div className="home-container">
      <button onClick={handleClick2} className="profile_button">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="13"
            cy="6.49996"
            rx="4.33333"
            ry="4.33333"
            fill="white"
          />
          <path
            d="M21.6666 18.9584C21.6666 21.6508 21.6666 23.8334 13 23.8334C4.33331 23.8334 4.33331 21.6508 4.33331 18.9584C4.33331 16.266 8.21351 14.0834 13 14.0834C17.7864 14.0834 21.6666 16.266 21.6666 18.9584Z"
            fill="white"
          />
        </svg>
      </button>
      <img src={main_image} alt="" />
      <div className="info-box">
        <h3>
          Создайте приложение под <br />
          ваши задачи
        </h3>
        <p>
          Выберите тип, добавьте функции и <br />
          настройте под ваш бренд. Мы позаботимся о <br />
          простоте разработки и успешном запуске!
        </p>
        <div className="info-box_card">
          <div className="info-box_card__left">
            <img src={left_card} alt="" />
          </div>
          <div className="info-box_card__center">
            <img src={center_card} alt="" />
          </div>
          <div className="info-box_card__right">
            <img src={right_card} alt="" />
          </div>
        </div>
      </div>
      <div className="home-categories">
        <h2>Категории</h2>
        <div className="buttons-category">
          {categories.map((category) => (
            <button
              className="category-button"
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                backgroundColor:
                  activeCategory === category ? "#7B61FF" : "#FFFFFF",
                color: activeCategory === category ? "#FFFFFF" : "#000000",
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {data[activeCategory].map((item, index) => (
            <div
              key={index}
              style={{
                width: "150px",
                textAlign: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
                  background: "white",
                }}
              />
              <p
                style={{ marginTop: "12px", fontSize: "16px", fontWeight: 500 }}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-[680px] p-6 rounded-2xl bg-gradient-to-r from-[#E0D8FF] to-[#EAE4FF] flex justify-between items-center relative overflow-hidden shadow-md">
        <div className="home-partners">
          <div className="left-partners">
            <h2>Услуги партнёров</h2>
            <p>
              Вы можете обратиться не <br />
              только к нам, но ещё и к <br />
              нашим партнёрам
            </p>
          </div>
          <div className="right-partners">
            <img
              src={img_partners}
              alt="Partners Illustration"
              className="w-32 h-auto"
            />
            <button
              onClick={handleClickForPartners}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:scale-105 transition"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 13L13 1M13 1H1M13 1V13" stroke="#0D0D0D" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
