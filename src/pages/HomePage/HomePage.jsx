import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Импортируем синхронные экшены из нашего Redux Slice
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../../features/products/categoriesSlice";

import "./HomePage.scss";
import left_card from "../../assets/Frame 168.svg";
import center_card from "../../assets/Frame 169.svg";
import right_card from "../../assets/Frame 170.svg";

// Локальные импорты изображений для карточек
import burgerPhoto from "../../assets/Remove-bg.ai_1732349357302 1.png"; // This will be used for all mock items

import img_partners from "../../assets/Remove-bg.ai_1732383936587 1.svg";
import main_image from "../../assets/Black.svg";
import { useNavigate } from "react-router-dom";
import profilesvg from "../../assets/Frame 193.svg";
import Loading from "../../components/Loading/Loading"; // Убедись, что путь правильный

// MOCK DATA based on the provided image, using burgerPhoto for all items
const MOCK_CATEGORIES_DATA = [
  {
    id: 1,
    name: "Приложения",
    cards: [
      {
        id: 101,
        title: "Фудтех-приложение",
        description: "Приложение для заказа еды и напитков с доставкой.",
        image: burgerPhoto,
        price: 50000,
      },
      {
        id: 102,
        title: "Интернет-магазин",
        description: "Полнофункциональный интернет-магазин для любых товаров.",
        image: burgerPhoto,
        price: 70000,
      },
      {
        id: 103,
        title: "Сервис бронирования",
        description: "Приложение для бронирования услуг, столиков или билетов.",
        image: burgerPhoto,
        price: 60000,
      },
      {
        id: 104,
        title: "Сервис доставки",
        description: "Приложение для организации и отслеживания доставки.",
        image: burgerPhoto,
        price: 55000,
      },
      {
        id: 105,
        title: "Сервис доставки",
        description: "Приложение для организации и отслеживания доставки.",
        image: burgerPhoto,
        price: 55000,
      },
    ],
  },
  {
    id: 2,
    name: "Разработка сайтов",
    cards: [
      {
        id: 105,
        title: "Приложение соцсети",
        description: "Платформа для общения и обмена контентом.",
        image: burgerPhoto,
        price: 80000,
      },
      {
        id: 106,
        title: "Приложение обучения",
        description: "Образовательная платформа с курсами и уроками.",
        image: burgerPhoto,
        price: 75000,
      },
    ],
  },
  {
    id: 3,
    name: "Разработка игр",
    cards: [],
  },
];

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    items: categoriesData,
    status,
    error,
  } = useSelector((state) => state.categories);

  const [activeCategory, setActiveCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  // Логика получения данных теперь здесь, внутри useEffect
  useEffect(() => {
    // Проверяем статус, чтобы не делать повторные запросы
    if (status === "idle") {
      const getCategories = () => {
        // Диспатчим экшен начала загрузки
        dispatch(fetchCategoriesStart());

        // Используем fetch для получения данных
        fetch("https://api.tvelvi.ru/api/section/")
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Ошибка HTTP: ${response.status} - ${response.statusText}`
              );
            }
            return response.json();
          })
          .then((data) => {
            // При успешном получении данных, диспатчим экшен успеха с данными
            dispatch(fetchCategoriesSuccess(data));
          })
          .catch((error) => {
            // При ошибке, диспатчим экшен ошибки, но также передаем mock data
            console.error("Ошибка при получении категорий:", error);
            dispatch(
              fetchCategoriesFailure(
                error.message || "Произошла неизвестная ошибка."
              )
            );
            // Dispatch success with mock data on failure to display content
            dispatch(fetchCategoriesSuccess(MOCK_CATEGORIES_DATA));
          });
      };

      getCategories(); // Вызываем функцию получения данных
    }
  }, [status, dispatch]); // Зависимости: status и dispatch

  // Устанавливаем активную категорию по умолчанию после загрузки данных
  useEffect(() => {
    if (
      status === "succeeded" &&
      categoriesData.length > 0 &&
      activeCategory === ""
    ) {
      setActiveCategory(categoriesData[0].name);
    } else if (
      status === "failed" && // If status is failed and we're showing mock data
      categoriesData.length > 0 &&
      activeCategory === ""
    ) {
      setActiveCategory(categoriesData[0].name);
    }
  }, [status, categoriesData, activeCategory]);

  const handleClickForPartners = () => {
    navigate("/partners");
  };
  const handleClick2 = () => {
    navigate("/profile");
  };
  const handleClick22 = () => {
    navigate("/basicFeaturesPage");
  };

  const currentCategoryItems =
    categoriesData.find((category) => category.name === activeCategory)
      ?.cards || [];

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    document.body.classList.remove("modal-open");
  };

  return (
    <div className="home-container">
      <div className="profile_button-cover">
        <div onClick={handleClick2} className="profile_button">
          <img src={profilesvg} alt="Профиль" />
        </div>
      </div>

      <div className="profile_main-photo">
        <img src={main_image} alt="Главное изображение" />
      </div>
      <div className="home-info-cover">
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
          {categoriesData.map((category) => (
            <button
              className="category-button"
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              style={{
                backgroundColor:
                  activeCategory === category.name ? "#7B61FF" : "#FFFFFF",
                color: activeCategory === category.name ? "#FFFFFF" : "#000000",
                fontSize: "14px",
                padding: "8px",
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
        {/* Условный рендеринг загрузки в разделе товаров */}
        {status === "loading" ? (
          <div className="product-loading-container">
            <Loading />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {currentCategoryItems.map((item) => (
              <div
                key={item.id}
                style={{
                  textAlign: "center",
                  cursor: "pointer",
                  marginBottom: "16px",
                }}
                onClick={() => openModal(item)}
                className="home-cardds"
              >
                <div className="home-cardds__imggg">
                  <img src={item.image || burgerPhoto} alt={item.title} />
                </div>

                <p className="home-cardds__texttt">{item.title}</p>
              </div>
            ))}
          </div>
        )}
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
                <h3 className="Model_flex-text-title">{selectedItem.title}</h3>
                <p className="Model_flex-text-img__text">
                  {selectedItem.description}
                </p>
              </div>
              <div>
                <img
                  src={selectedItem.image || burgerPhoto}
                  alt={selectedItem.title}
                  className="Model_flex-text-img__img"
                />
              </div>
            </div>
            <div className="Model_flex">
              <h3 className="Model_price">{selectedItem.price} ₽+</h3>
              <button onClick={handleClick22} className="Model_btn1">
                Настроить
              </button>
              <button onClick={handleClick22} className="Model_btn2">
                Перейти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
