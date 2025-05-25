import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Импортируем синхронные экшены из нашего Redux Slice
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../../features/products/categoriesSlice";

import "./HomePage.css";
import left_card from "../../assets/Frame 168.svg";
import center_card from "../../assets/Frame 169.svg";
import right_card from "../../assets/Frame 170.svg";

// Локальные импорты изображений для карточек
import burgerPhoto from "../../assets/image 69.svg";
import cart from "../../assets/image 72.svg";
import holdPhone from "../../assets/pngwing.com 1.svg";
import minivan from "../../assets/image 70.svg";
import like from "../../assets/image 71.svg";
import study from "../../assets/image 73.svg";

import img_partners from "../../assets/Remove-bg.ai_1732383936587 1.svg";
import main_image from "../../assets/Black.svg";
import { useNavigate } from "react-router-dom";
import profilesvg from "../../assets/Frame 193.svg";

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
            // При ошибке, диспатчим экшен ошибки
            console.error("Ошибка при получении категорий:", error);
            dispatch(
              fetchCategoriesFailure(
                error.message || "Произошла неизвестная ошибка."
              )
            );
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
    }
  }, [status, categoriesData, activeCategory]);

  const handleClickForPartners = () => {
    navigate("/partners");
  };
  const handleClick2 = () => {
    navigate("/profile");
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

  // Отображаем состояние загрузки
  if (status === "loading") {
    return <div className="loading-state">Загрузка категорий...</div>;
  }

  // Отображаем состояние ошибки
  if (status === "failed") {
    return (
      <div className="error-state">
        Ошибка загрузки данных: {error}. Пожалуйста, попробуйте еще раз.
      </div>
    );
  }

  // Если данные успешно загружены, но categoriesData пуста
  if (status === "succeeded" && categoriesData.length === 0) {
    return <div className="no-data-state">Нет доступных категорий.</div>;
  }

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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {currentCategoryItems.map((item) => (
            <div
              key={item.id}
              style={{
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => openModal(item)}
              className="home-cardds"
            >
              <img
                src={item.image || burgerPhoto}
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
                  src={selectedItem.image || burgerPhoto}
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
