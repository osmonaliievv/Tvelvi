import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeatureCard from "../FeatureCard/FeatureCard";
import "./BasicFeaturesPage.css";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../features/cards/cardsSlice";
import {
  addBasicCard,
  removeBasicCard,
  selectSelectedBasicCards,
} from "../../features/selectedCards/selectedCardsSlice";

const BasicFeaturesPage = ({ onPriceChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cards.products);
  const status = useSelector((state) => state.cards.status);
  const error = useSelector((state) => state.cards.error);
  const selectedBasicCards = useSelector(selectSelectedBasicCards);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const basicCards = products
    ? products.filter((card) => card.category === "basic")
    : [];

  const handleCardSelection = (card) => {
    const isSelected = selectedBasicCards.some(
      (selectedCard) => selectedCard.id === card.id
    );
    if (isSelected) {
      dispatch(removeBasicCard(card));
      if (onPriceChange) {
        onPriceChange(-parseFloat(card.price));
      }
    } else {
      dispatch(addBasicCard(card));
      if (onPriceChange) {
        onPriceChange(parseFloat(card.price));
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
      <div className="features-list">
        {status === "loading" && <p>Загрузка...</p>}
        {status === "failed" && <p>Ошибка: {error}</p>}
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
