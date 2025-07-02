import React from "react";
import { useNavigate } from "react-router-dom";
import "./FinalPricePage.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedBasicCards,
  selectSelectedAdditionalCards,
  selectSelectedDesignCards,
  clearSelectedCards, // Опционально
} from "../../features/selectedCards/selectedCardsSlice";
import { createOrder } from "../../features/orders/ordersSlice"; // <-- НОВЫЙ ИМПОРТ
import {
  selectProduct,
  clearSelectedProduct,
} from "../../features/selectedProducts/selectedProductSlice"; // <-- НОВЫЙ ИМПОРТ

const FinalPricePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedBasic = useSelector(selectSelectedBasicCards);
  const selectedAdditional = useSelector(selectSelectedAdditionalCards);
  const selectedDesign = useSelector(selectSelectedDesignCards);
  const selectedProduct = useSelector(selectProduct); // Получаем выбранный продукт с HomePage
  const orderStatus = useSelector((state) => state.orders.status); // Статус отправки заказа
  const orderError = useSelector((state) => state.orders.error); // Ошибка отправки заказа

  const handleGoToPayment = async () => {
    // 1. Подготовьте данные заказа (массив ID выбранных карт)
    const selectedCardIds = [
      ...selectedBasic.map((card) => card.id),
      ...selectedAdditional.map((card) => card.id),
      ...selectedDesign.map((card) => card.id),
    ];

    if (selectedCardIds.length === 0 && !selectedProduct) {
      alert("Пожалуйста, выберите услуги или пакет для заказа.");
      return;
    }

    // Если заказ создается на основе SectionCard (выбранной на HomePage),
    // то selected_cards уже привязаны к SectionCard на бэкенде.
    // Если же это пошаговый выбор, то отправляем ID выбранных OrderCard.
    // Здесь мы объединяем оба сценария, если это возможно,
    // или выбираем один, если логика строго разделена.

    let orderData = {};

    // Если выбран продукт с HomePage (SectionCard), то мы используем эндпоинт generate-order
    // В этом случае, мы не отправляем selected_cards, так как они будут взяты из SectionCard на бэкенде.
    // Если же это обычный пошаговый заказ, то отправляем selected_cards.
    // Для простоты, если selectedProduct есть, мы будем использовать его ID для generate-order.
    // В противном случае, мы используем выбранные карточки.

    // ВНИМАНИЕ: Здесь нужно решить, какой путь создания заказа вы используете.
    // Если пользователь пришел сюда после выбора SectionCard на HomePage,
    // то логика должна быть через generateOrderFromSectionCard.
    // Если пользователь пришел сюда после пошагового выбора Basic/Additional/Design,
    // то логика должна быть через createOrder с selected_cards.

    // Предположим, что эта страница используется для агрегации всех выбранных OrderCard
    // и создания заказа на их основе. Если пользователь пришел сюда через SectionSelectionPage,
    // то он уже создал заказ там.
    // Таким образом, на этой странице мы работаем только с selected_cards.

    orderData = {
      selected_cards: selectedCardIds, // Отправляем массив ID выбранных карт
    };

    console.log("Данные заказа перед отправкой:", orderData);

    // 2. Отправьте данные заказа
    const result = await dispatch(createOrder(orderData)); // Используем createOrder

    // 3. Обработайте результат отправки
    if (createOrder.fulfilled.match(result)) {
      console.log("Заказ успешно отправлен:", result.payload);
      dispatch(clearSelectedCards()); // Очищаем выбранные карточки
      dispatch(clearSelectedProduct()); // Очищаем выбранный продукт с HomePage
      navigate("/successfully/");
    } else if (createOrder.rejected.match(result)) {
      console.error("Ошибка при отправке заказа:", result.payload);
      const errorMessage =
        result.payload && typeof result.payload === "object"
          ? JSON.stringify(result.payload)
          : result.payload;
      alert(`Ошибка при оформлении заказа: ${errorMessage}`);
    }
  };

  const totalSum = [...selectedBasic, ...selectedAdditional, ...selectedDesign]
    .reduce((sum, card) => sum + parseFloat(card.price || 0), 0)
    .toLocaleString();

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
        <span className="active"></span>
        <div className="active" onClick={() => navigate("/finalPrice")}></div>
      </div>
      <h2 className="page-title">Финальная стоимость</h2>
      {selectedProduct && (
        <h3 className="page-subtitle">для: {selectedProduct.title}</h3>
      )}
      <div className="final-price-container">
        <div className="amount">
          {selectedBasic.length > 0 && (
            <>
              <div className="amount-flex">
                <h2 className="amount-category">Базовые функции</h2>
                <h4
                  className="amount-put"
                  onClick={() => navigate("/basicFeaturesPage")}
                >
                  Изменить ›
                </h4>
              </div>
              {selectedBasic.map((card) => (
                <div key={card.id} className="amount-cardwithMinus">
                  <div className="amount-name">{card.card_name}</div>
                  <div className="amount-price">
                    {card.price.toLocaleString()} ₽
                  </div>
                  <div className="minus-circle">
                    <span className="minus-sign"></span>
                  </div>
                </div>
              ))}
            </>
          )}

          {selectedAdditional.length > 0 && (
            <>
              <div className="amount-flex">
                <h2 className="amount-category">Дополнительные функции</h2>
                <h4
                  className="amount-put"
                  onClick={() => navigate("/additionalFeaturesPage")}
                >
                  Изменить ›
                </h4>
              </div>
              {selectedAdditional.map((card) => (
                <div key={card.id} className="amount-cardwithMinus">
                  <div className="amount-name">{card.card_name}</div>
                  <div className="amount-price">
                    {card.price.toLocaleString()} ₽
                  </div>
                  <div className="minus-circle">
                    <span className="minus-sign"></span>
                  </div>
                </div>
              ))}
            </>
          )}

          {selectedDesign.length > 0 && (
            <>
              <div className="amount-flex">
                <h2 className="amount-category">Дизайн</h2>
                <h4
                  className="amount-put"
                  onClick={() => navigate("/designPage")}
                >
                  Изменить ›
                </h4>
              </div>
              {selectedDesign.map((card) => (
                <div key={card.id} className="amount-cardwithMinus">
                  <div className="amount-name">{card.card_name}</div>
                  <div className="amount-price">
                    {card.price.toLocaleString()} ₽
                  </div>
                  <div className="minus-circle">
                    <span className="minus-sign"></span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="priceAndButton">
          <div className="finalPrice">Итого: {totalSum} ₽</div>
          <div className="final-price-buttonCover">
            {orderStatus === "loading" && <p>Отправка заказа...</p>}
            {orderError && <p style={{ color: "red" }}>Ошибка: {orderError}</p>}
            <button
              className="final-price-buttonn"
              onClick={handleGoToPayment}
              disabled={orderStatus === "loading"}
            >
              Перейти к оплате
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalPricePage;
