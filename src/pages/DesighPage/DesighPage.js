import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeatureCard from "../FeatureCard/FeatureCard";
import "./DesighPage.css";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../features/cards/cardsSlice";
import {
  addDesignCard,
  removeDesignCard,
  selectSelectedDesignCards,
} from "../../features/selectedCards/selectedCardsSlice";

const DesignPage = ({ onPriceChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cards.products);
  const status = useSelector((state) => state.cards.status);
  const error = useSelector((state) => state.cards.error);
  const selectedDesignCards = useSelector(selectSelectedDesignCards);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const designOptions = products
    ? products.filter((card) => card.category === "design")
    : [];

  const handleClick = () => {
    navigate("/finalPrice");
  };

  const handleCardSelection = (card) => {
    const isSelected = selectedDesignCards.some(
      (selectedCard) => selectedCard.id === card.id
    );
    if (isSelected) {
      dispatch(removeDesignCard(card));
      if (onPriceChange) {
        onPriceChange(-parseFloat(card.price));
      }
    } else {
      dispatch(addDesignCard(card));
      if (onPriceChange) {
        onPriceChange(parseFloat(card.price));
      }
    }
  };

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
        <span className="active"></span>
        <div className="active" onClick={() => navigate("/designPage")}></div>
        <span></span>
        <div onClick={() => navigate("/finalPrice")}></div>
      </div>
      <h2 className="page-title">Дизайн</h2>
      <div className="features-list">
        {status === "loading" && <p>Загрузка...</p>}
        {status === "failed" && <p>Ошибка: {error}</p>}
        {designOptions.length > 0
          ? designOptions.map((card) => (
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
          : status === "succeeded" && <p>Нет опций дизайна для отображения.</p>}
      </div>
      <div className="fixed-button-container">
        <button onClick={handleClick} className="action-button">
          Готово
        </button>
      </div>
    </div>
  );
};

export default DesignPage;
