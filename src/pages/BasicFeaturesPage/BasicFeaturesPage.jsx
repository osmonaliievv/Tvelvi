import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeatureCard from "../../pages/FeatureCard/FeatureCard"; // Убедитесь, что путь правильный
import "./BasicFeaturesPage.css";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../features/cards/cardsSlice";
import {
  addBasicCard,
  removeBasicCard,
  selectSelectedBasicCards,
} from "../../features/selectedCards/selectedCardsSlice";
import Loading from "../../components/Loading/Loading";
import { clearSelectedProduct } from "../../features/selectedProducts/selectedProductSlice"; // <-- НОВЫЙ ИМПОРТ

const BasicFeaturesPage = ({ onPriceChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cards.products);
  const status = useSelector((state) => state.cards.status);
  const error = useSelector((state) => state.cards.error);
  const selectedBasicCards = useSelector(selectSelectedBasicCards);
  const selectedProduct = useSelector((state) => state.selectedProduct.product); // <-- ПОЛУЧАЕМ ВЫБРАННЫЙ ПРОДУКТ

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      console.log(
        "На страницу BasicFeaturesPage пришел выбранный продукт:",
        selectedProduct
      );
      // Здесь вы можете использовать selectedProduct.id, selectedProduct.title и т.д.
      // Например, загрузить связанные функции для этого продукта или обновить UI.

      // Если вы хотите очистить выбранный продукт после его использования на этой странице:
      // dispatch(clearSelectedProduct()); // Раскомментируйте, если нужно очищать после перехода
    } else {
      console.log(
        "На страницу BasicFeaturesPage не был передан выбранный продукт."
      );
      // Можно перенаправить пользователя обратно, если продукт обязателен
      // navigate('/');
    }
  }, [selectedProduct, dispatch, navigate]);

  const basicCards = products
    ? products.filter((card) => card.category === "basic")
    : [];

  const handleCardSelection = (card, isNowSelected) => {
    if (isNowSelected) {
      // Если карточка стала выбранной
      dispatch(addBasicCard(card));
      if (onPriceChange) {
        onPriceChange(parseFloat(card.price));
      }
    } else {
      // Если карточка стала невыбранной
      dispatch(removeBasicCard(card));
      if (onPriceChange) {
        onPriceChange(-parseFloat(card.price));
      }
    }
  };

  const handleClick = () => {
    navigate("/additionalFeaturesPage");
  };

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
      {/* {selectedProduct && (
        <h3 className="page-subtitle">для: {selectedProduct.title}</h3>
      )} */}
      <div className="features-list">
        {status === "loading" && <Loading />}
        {status === "failed" && (
          <p>Нет товаров для отображения базовых функций</p>
        )}
        {basicCards.length > 0
          ? basicCards.map((card) => (
              <FeatureCard
                key={card.id}
                id={card.id}
                title={card.card_name}
                description={card.description}
                price={parseFloat(card.price)}
                image={card.photo}
                hint={card.hint}
                onPriceChange={onPriceChange}
                onCardSelect={handleCardSelection}
                isSelected={selectedBasicCards.some(
                  (selectedCard) => selectedCard.id === card.id
                )} // Передаем isSelected для отображения галочки
              />
            ))
          : status === "succeeded" && (
              <p>Нет базовых функций для отображения.</p>
            )}
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
