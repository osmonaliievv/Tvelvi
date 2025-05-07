import React, { useState } from "react";

const FeatureCard = ({
  title,
  price,
  description,
  image,
  onPriceChange,
  onCardSelect, // добавляем обработчик выбора карточки
  className = "",
  key,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleToggle = () => {
    setIsSelected(!isSelected);
    if (typeof onPriceChange === "function") {
      onPriceChange(isSelected ? -price : price);
    }

    // передаем информацию о карточке в родительский компонент
    if (onCardSelect) {
      onCardSelect({ id: key, card_name: title, price, description, image });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      className={`feature-card ${className}`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      key={key}
    >
      <div className="feature_content">
        <div className="feature_up">
          <div className="feature_left">
            <div className="feature-price">
              {(price || 0).toLocaleString()} ₽
            </div>
            <div className="feature-price-top">{title}</div>
          </div>
        </div>
        <div className="feature_down">
          <p>{description}</p>
        </div>
      </div>
      {isSelected && (
        <div className="feature-check">
          <svg
            className="check-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
