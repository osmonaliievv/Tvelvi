import React, { useState } from "react";
import "./FeatureCard.css";

const FeatureCard = ({
  id,
  title,
  price,
  description,
  image,
  onPriceChange,
  onCardSelect,
  className = "",
  hint,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleToggle = () => {
    setIsSelected(!isSelected);
    if (typeof onPriceChange === "function") {
      onPriceChange(isSelected ? -price : price);
    }

    // передаем информацию о карточке в родительский компонент
    if (onCardSelect) {
      onCardSelect({
        id: id,
        card_name: title,
        price,
        description,
        image,
        hint,
      }); // Включаем hint
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
      className={`feature-card ${className} ${isSelected ? "selected" : ""}`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      key={id}
    >
      <div className="feature_content">
        <div className="feature_up">
          <div className="feature_left">
            <div className="feature_flex">
              <div className="feature_priceHint">
                <div className="feature-price">
                  {(price || 0).toLocaleString()} ₽
                </div>
                <div className="feature-hint">{hint}</div>
              </div>
              {image && (
                <div className="feature_image">
                  {typeof image === "string" ? (
                    <img src={image} alt={title} />
                  ) : (
                    image // Предполагается, что это JSX.Element
                  )}
                </div>
              )}
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
