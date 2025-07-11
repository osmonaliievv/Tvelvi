import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../../features/products/categoriesSlice";
import { selectProduct } from "../../features/selectedProducts/selectedProductSlice"; // <-- НОВЫЙ ИМПОРТ

import "./HomePage.scss";
import left_card from "../../assets/Frame 168.svg";
import center_card from "../../assets/Frame 169.svg";
import right_card from "../../assets/Frame 170.svg";

import burgerPhoto from "../../assets/Remove-bg.ai_1732349357302 1.png";

import img_partners from "../../assets/Remove-bg.ai_1732383936587 1.svg";
import main_image from "../../assets/Black.svg";
import { useNavigate } from "react-router-dom";
import profilesvg from "../../assets/Frame 193.svg";
import Loading from "../../components/Loading/Loading";

// MOCK DATA (оставил как есть, но помни, что реальные данные придут с сервера)
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
        id: 105, // ВНИМАНИЕ: Дублирующийся ID. В реальных данных такого быть не должно.
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
      {
        id: 107,
        title: "Корпоративный сайт",
        description: "Сайт для представления компании и ее услуг.",
        image: burgerPhoto,
        price: 40000,
      },
      {
        id: 108,
        title: "Промо-страница",
        description:
          "Одностраничный сайт для продвижения продукта или события.",
        image: burgerPhoto,
        price: 25000,
      },
    ],
  },
  {
    id: 3,
    name: "Разработка игр",
    cards: [
      {
        id: 109,
        title: "Мобильная игра",
        description: "Простая казуальная игра для мобильных устройств.",
        image: burgerPhoto,
        price: 90000,
      },
      {
        id: 110,
        title: "Компьютерная игра",
        description: "Небольшая инди-игра для ПК.",
        image: burgerPhoto,
        price: 120000,
      },
    ],
  },
];

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    items: categoriesData,
    status,
    error,
  } = useSelector((state) => state.categories);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Это для отображения в модальном окне
  const navigate = useNavigate();

  const productListRef = useRef(null);

  useEffect(() => {
    if (status === "idle") {
      const getCategories = () => {
        dispatch(fetchCategoriesStart());

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
            // Предполагаем, что ваш API возвращает данные в формате,
            // который совпадает с MOCK_CATEGORIES_DATA
            // Если формат отличается, вам нужно будет его преобразовать
            // Например: data.map(category => ({ ...category, cards: category.products || [] }))
            dispatch(fetchCategoriesSuccess(data));
          })
          .catch((error) => {
            console.error("Ошибка при получении категорий:", error);
            dispatch(
              fetchCategoriesFailure(
                error.message || "Произошла неизвестная ошибка."
              )
            );
            // Используем моковые данные в случае ошибки
            dispatch(fetchCategoriesSuccess(MOCK_CATEGORIES_DATA));
          });
      };

      getCategories();
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (
      (status === "succeeded" || status === "failed") &&
      categoriesData.length > 0 &&
      activeCategoryIndex === 0 // Только если еще не выбран индекс
    ) {
      setActiveCategoryIndex(0);
    }
  }, [status, categoriesData, activeCategoryIndex]);

  const handleClickForPartners = () => {
    navigate("/partners");
  };
  const handleClick2 = () => {
    navigate("/profile");
  };

  // !!! ИЗМЕНЕНИЕ ЗДЕСЬ: Теперь эта функция диспатчит выбранный продукт в Redux
  const handleConfigureClick = () => {
    if (selectedItem) {
      dispatch(selectProduct(selectedItem)); // Сохраняем выбранный продукт в Redux
      navigate("/basicFeaturesPage"); // Переходим на страницу настройки
    } else {
      console.warn("No item selected for configuration.");
    }
    closeModal(); // Закрываем модальное окно после перехода
  };

  const handleGoToClick = () => {
    if (selectedItem) {
      dispatch(selectProduct(selectedItem)); // Сохраняем выбранный продукт в Redux
      // Здесь можно реализовать другую логику, например,
      // перейти на страницу с деталями продукта, если такая есть
      // navigate(`/product/${selectedItem.id}`);
      alert("Функция 'Перейти' пока не реализована. Продукт сохранен в Redux.");
    } else {
      console.warn("No item selected for 'Go To'.");
    }
    closeModal();
  };

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

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      if (activeCategoryIndex < categoriesData.length - 1) {
        setActiveCategoryIndex(activeCategoryIndex + 1);
      }
    }

    if (touchEndX - touchStartX > 50) {
      if (activeCategoryIndex > 0) {
        setActiveCategoryIndex(activeCategoryIndex - 1);
      }
    }
  };

  const handleCategoryButtonClick = (index) => {
    setActiveCategoryIndex(index);
  };

  return (
    <div className="home-container">
      <div className="home-container__inner">
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
            {categoriesData.map((category, index) => (
              <button
                className="category-button"
                key={category.id}
                onClick={() => handleCategoryButtonClick(index)}
                style={{
                  backgroundColor:
                    activeCategoryIndex === index ? "#7B61FF" : "#FFFFFF",
                  color: activeCategoryIndex === index ? "#FFFFFF" : "#000000",
                  fontSize: "14px",
                  padding: "8px",
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
          {status === "loading" ? (
            <div className="product-loading-container">
              <Loading />
            </div>
          ) : (
            <div
              className="product-list-wrapper"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              ref={productListRef}
            >
              <div
                className="product-list-inner"
                style={{
                  transform: `translateX(-${activeCategoryIndex * 100}%)`,
                }}
              >
                {categoriesData.map((category, catIndex) => (
                  <div
                    key={category.id}
                    className="category-products-container"
                  >
                    {category.cards.length > 0 ? (
                      category.cards.map((item) => (
                        <div key={item.id} className="home-cardds">
                          <div
                            className="home-cardds__imggg"
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={item.image || burgerPhoto}
                              alt={item.title}
                              onClick={() => openModal(item)} // onClick ТОЛЬКО на изображении
                            />
                          </div>

                          <p className="home-cardds__texttt">{item.title}</p>
                        </div>
                      ))
                    ) : (
                      <p className="no-products-message">
                        Нет товаров в этой категории.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-full max-w-[600px] p-6 rounded-2xl bg-gradient-to-r from-[#E0D8FF] to-[#EAE4FF] flex justify-between items-center relative overflow-hidden shadow-md">
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
                  <h3 className="Model_flex-text-title">
                    {selectedItem.title}
                  </h3>
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
                <button onClick={handleConfigureClick} className="Model_btn1">
                  {" "}
                  {/* ИЗМЕНЕНО */}
                  Настроить
                </button>
                <button onClick={handleConfigureClick} className="Model_btn2">
                  {" "}
                  {/* ИЗМЕНЕНО */}
                  Перейти
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
