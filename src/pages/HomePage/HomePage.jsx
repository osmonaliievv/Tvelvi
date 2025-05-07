import React, { useState, useEffect } from "react";
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
import burgerPhoto from "../../assets/image 69.svg";
import cart from "../../assets/image 72.svg";
import holdPhone from "../../assets/pngwing.com 1.svg";
import minivan from "../../assets/image 70.svg";
import like from "../../assets/image 71.svg";
import study from "../../assets/image 73.svg";
import profilesvg from "../../assets/Frame 193.svg";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("Приложения");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleClickForPartners = () => {
    navigate("/partners");
  };
  const handleClick2 = () => {
    navigate("/profile");
  };
  const categories = ["Приложения", "Разработка сайтов", "Разработка игр"];

  const list = {
    Приложения: [
      {
        title: "Фудтех-приложение",
        image: foodtech_app,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "100 000",
        image2: burgerPhoto,
      },
      {
        title: "Интернет-магазин",
        image: internet_marketplace,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "120 000",
        image2: cart,
      },
      {
        title: "Сервис бронирования",
        image: service_block,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "110 000",
        image2: holdPhone,
      },
      {
        title: "Сервис доставки",
        image: service_delivery,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "130 000",
        image2: minivan,
      },
      {
        title: "Приложение соцсети",
        image: messenger_app,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "200 000",
        image2: like,
      },
      {
        title: "Приложение обучения",
        image: training_app,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "150 000",
        image2: study,
      },
    ],
    "Разработка сайтов": [
      {
        title: "Фудтех-приложение",
        image: foodtech_app,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "100 000",
        image2: burgerPhoto,
      },
      {
        title: "Интернет-магазин",
        image: internet_marketplace,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "120 000",
        image2: cart,
      },
      {
        title: "Сервис бронирования",
        image: service_block,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "110 000",
        image2: holdPhone,
      },
      {
        title: "Сервис доставки",
        image: service_delivery,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "130 000",
        image2: minivan,
      },
      {
        title: "Приложение соцсети",
        image: messenger_app,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "200 000",
        image2: like,
      },
      {
        title: "Приложение обучения",
        image: training_app,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "150 000",
        image2: study,
      },
    ],
    "Разработка игр": [
      {
        title: "Фудтех-приложение",
        image: foodtech_app,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "100 000",
        image2: burgerPhoto,
      },
      {
        title: "Интернет-магазин",
        image: internet_marketplace,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "120 000",
        image2: cart,
      },
      {
        title: "Сервис бронирования",
        image: service_block,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "110 000",
        image2: holdPhone,
      },
      {
        title: "Сервис доставки",
        image: service_delivery,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "130 000",
        image2: minivan,
      },
      {
        title: "Приложение соцсети",
        image: messenger_app,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "200 000",
        image2: like,
      },
      {
        title: "Приложение обучения",
        image: training_app,
        description:
          "Полный набор функций для работы с заказами на доставку. Подходит для ресторанов, сервисов по доставке готовой еды или продуктов.",
        price: "150 000",
        image2: study,
      },
    ],
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.classList.add("modal-open"); // Добавляем класс к body
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    document.body.classList.remove("modal-open"); // Удаляем класс с body
  };

  return (
    <div className="home-container">
      <div className="profile_button-cover">
        <div onClick={handleClick2} className="profile_button">
          <img src={profilesvg} alt="" />
        </div>
      </div>

      <div className="profile_main-photo">
        <img src={main_image} alt="" />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
                fontSize: "14px",
                padding: "8px",
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
          {list[activeCategory].map((item, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => openModal(item)}
              className="home-cardds"
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
      {isModalOpen && selectedItem && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
          className="modal-overlay"
        >
          <div
            style={{
              background: "white",
              padding: "12px 14px",
              borderRadius: "12px",
            }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="Model_flex-text-img">
              <div>
                <h3>{selectedItem.title}</h3>
                <p className="Model_flex-text-img__text">
                  {selectedItem.description}
                </p>
              </div>
              <div>
                <img
                  src={selectedItem.image2}
                  alt={selectedItem.title}
                  className="Model_flex-text-img__img"
                />
              </div>
            </div>
            <div className="Model_flex">
              <h3 className="Model_price">{selectedItem.price} ₽+</h3>
              <button className="Model_btn1">Настроить</button>
              <button className="Model_btn2">Перейти</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
