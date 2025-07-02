import React, { useState, useEffect } from "react";
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
  // isSelected - этот пропс теперь будет опциональным
  // и будет использоваться для внешнего контроля (как на SectionSelectionPage)
  isSelected: propIsSelected, // Переименовываем пропс, чтобы избежать конфликта с внутренним состоянием
}) => {
  // Используем внутреннее состояние isSelected,
  // если propIsSelected не передан (т.е. карточка управляет собой сама)
  const [internalIsSelected, setInternalIsSelected] = useState(false);

  // Определяем фактическое состояние isSelected:
  // Если propIsSelected передан, используем его (для SectionSelectionPage)
  // Иначе используем внутреннее состояние (для BasicFeaturesPage и т.д.)
  const currentIsSelected =
    propIsSelected !== undefined ? propIsSelected : internalIsSelected;

  // Обновляем внутреннее состояние, если propIsSelected меняется (для случаев, когда родитель контролирует)
  useEffect(() => {
    if (propIsSelected !== undefined && propIsSelected !== internalIsSelected) {
      setInternalIsSelected(propIsSelected);
    }
  }, [propIsSelected]);

  const handleToggle = () => {
    // Определяем, какое состояние будет изменено
    const newSelectedState = !currentIsSelected;

    // Обновляем внутреннее состояние, если родитель не контролирует
    if (propIsSelected === undefined) {
      setInternalIsSelected(newSelectedState);
    }

    // Если функция onCardSelect предоставлена, вызываем ее.
    // Она будет использоваться для внешнего управления (например, на SectionSelectionPage)
    // или для уведомления родителя о выборе на других страницах.
    if (onCardSelect) {
      onCardSelect(
        {
          id: id,
          card_name: title, // Сохраняем как card_name для совместимости с OrderCard
          description: description,
          price: price,
          photo: image, // Сохраняем как photo для совместимости с OrderCard
          hint: hint,
        },
        newSelectedState
      ); // Передаем новое состояние выбора
    }

    // Логика изменения общей цены (только для страниц, где это применимо,
    // например, BasicFeaturesPage, AdditionalFeaturesPage, DesignPage).
    // SectionSelectionPage не будет передавать onPriceChange.
    if (typeof onPriceChange === "function") {
      onPriceChange(newSelectedState ? parseFloat(price) : -parseFloat(price));
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
      className={`feature-card ${className} ${
        currentIsSelected ? "selected" : ""
      }`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={currentIsSelected}
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
                {hint && <div className="feature-hint">{hint}</div>}
              </div>
              {image && (
                <div className="feature_image">
                  {typeof image === "string" ? (
                    <img src={image} alt={title} />
                  ) : (
                    image
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
      {currentIsSelected && (
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
