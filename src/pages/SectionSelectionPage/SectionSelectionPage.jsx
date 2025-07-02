import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../../pages/FeatureCard/FeatureCard";
import Loading from "../../components/Loading/Loading";
import {
  fetchSectionCards,
  generateOrderFromSectionCard,
} from "../../features/sectionCards/sectionCardsSlice";
import "./SectionSelectionPage.css"; // Создадим этот CSS файл

const SectionSelectionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sectionCards = useSelector((state) => state.sectionCards.sections);
  const status = useSelector((state) => state.sectionCards.status);
  const error = useSelector((state) => state.sectionCards.error);
  const generateOrderStatus = useSelector(
    (state) => state.sectionCards.generateOrderStatus
  );
  const generateOrderError = useSelector(
    (state) => state.sectionCards.generateOrderError
  );

  const [selectedSectionCardId, setSelectedSectionCardId] = useState(null);

  useEffect(() => {
    dispatch(fetchSectionCards());
  }, [dispatch]);

  const handleCardSelect = (cardData, isNowSelected) => {
    // В этой логике мы хотим, чтобы была выбрана только одна SectionCard.
    // При клике, если это не уже выбранная карточка, она становится выбранной.
    // Если нажимаем на ту же, она остается выбранной.
    // Если мы хотим снять выбор, если пользователь кликает на выбранную карточку:
    // setSelectedSectionCardId(currentId => (currentId === cardData.id && !isNowSelected) ? null : cardData.id);
    // Но по задаче "отобразить... и сделать заказ", проще всегда иметь одну выбранную.
    setSelectedSectionCardId(cardData.id);
  };

  const handleGenerateOrder = async () => {
    if (!selectedSectionCardId) {
      alert("Пожалуйста, выберите пакет услуг для создания заказа.");
      return;
    }

    // Отправляем запрос на создание заказа
    const resultAction = await dispatch(
      generateOrderFromSectionCard(selectedSectionCardId)
    );

    if (generateOrderFromSectionCard.fulfilled.match(resultAction)) {
      alert("Заказ успешно создан!");
      // Можно перенаправить на страницу успешно созданного заказа или главную
      navigate("/successfully/"); // Или другая страница успеха
    } else if (generateOrderFromSectionCard.rejected.match(resultAction)) {
      // payload может быть объектом ошибок, если возвращается JSON
      const errorMessage =
        resultAction.payload && typeof resultAction.payload === "object"
          ? JSON.stringify(resultAction.payload)
          : resultAction.payload;
      alert(`Ошибка при создании заказа: ${errorMessage}`);
    }
  };

  return (
    <div className="page section-selection-page">
      {/* Шаги можно убрать, если они не нужны для этой страницы, или адаптировать */}
      {/* <div className="steps">
        <div className="active"></div>
        <span></span>
        <div></div>
        <span></span>
        <div></div>
        <span></span>
        <div></div>
      </div> */}
      <h2 className="page-title">Выберите пакет услуг</h2>
      <div className="features-list">
        {status === "loading" && <Loading />}
        {status === "failed" && <p>Ошибка загрузки пакетов услуг: {error}</p>}
        {sectionCards.length > 0
          ? sectionCards.map((card) => (
              <FeatureCard
                key={card.id}
                id={card.id}
                title={card.title} // SectionCard использует "title"
                description={card.description}
                price={parseFloat(card.price)}
                image={card.image}
                hint={null} // SectionCard не имеет поля hint в твоей модели
                onCardSelect={handleCardSelect}
                isSelected={selectedSectionCardId === card.id} // <-- Передаем состояние выбора
              />
            ))
          : status === "succeeded" && (
              <p>Нет доступных пакетов услуг для отображения.</p>
            )}
      </div>
      <div className="fixed-button-container">
        {generateOrderStatus === "loading" && <p>Создание заказа...</p>}
        {generateOrderError && (
          <p style={{ color: "red" }}>Ошибка: {generateOrderError}</p>
        )}
        <button
          onClick={handleGenerateOrder}
          className="action-button"
          disabled={!selectedSectionCardId || generateOrderStatus === "loading"}
        >
          Создать заказ
        </button>
      </div>
    </div>
  );
};

export default SectionSelectionPage;
