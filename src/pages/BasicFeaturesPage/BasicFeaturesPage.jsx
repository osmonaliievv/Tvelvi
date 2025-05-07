import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeatureCard from "../FeatureCard/FeatureCard";
import "./BasicFeaturesPage.css";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../features/cards/cardsSlice";

const BasicFeaturesPage = ({ onPriceChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.cards.products);
  const status = useSelector((state) => state.cards.status);
  const error = useSelector((state) => state.cards.error);

  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Маппим все карточки из всех объектов и фильтруем по категории "basic"
  const basicCards = products.flatMap((product) =>
    product.cards.filter((card) => card.category === "basic")
  );

  const handleCardSelection = (card) => {
    setSelectedCards((prevSelected) => {
      if (prevSelected.find((selectedCard) => selectedCard.id === card.id)) {
        return prevSelected.filter(
          (selectedCard) => selectedCard.id !== card.id
        );
      } else {
        return [...prevSelected, card];
      }
    });
  };

  const handleClick = () => {
    navigate("/additionalFeaturesPage");
    // передаем выбранные карточки на следующую страницу
    // например, можно сохранять их в Redux или передать через props
  };
  console.log("Selected cards:", selectedCards);
  console.log("Basic cards:", products);

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

        {/* Отображаем только карточки с категорией "basic" */}
        {basicCards.length > 0 &&
          basicCards.map((card) => (
            <FeatureCard
              key={card.id}
              title={card.card_name}
              description={card.description}
              price={parseFloat(card.price)}
              image={
                card.image_url ? (
                  <img
                    src={card.image_url}
                    alt={card.card_name}
                    className="feature-image-img"
                  />
                ) : (
                  <div className="placeholder-image">No Image</div>
                )
              }
              onPriceChange={onPriceChange}
              onCardSelect={handleCardSelection} // передаем функцию выбора карточки
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
