import React from "react";
import { useNavigate } from "react-router-dom";
import "./FinalPricePage.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedBasicCards,
  selectSelectedAdditionalCards,
  selectSelectedDesignCards,
  sendOrderData,
  selectSendOrderStatus,
  selectSendOrderError,
  clearSelectedCards, // Опционально
} from "../../features/selectedCards/selectedCardsSlice";

const FinalPricePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedBasic = useSelector(selectSelectedBasicCards);
  const selectedAdditional = useSelector(selectSelectedAdditionalCards);
  const selectedDesign = useSelector(selectSelectedDesignCards);
  const sendOrderStatus = useSelector(selectSendOrderStatus);
  const sendOrderError = useSelector(selectSendOrderError);

  const handleGoToPayment = async () => {
    // 1. Подготовьте данные заказа (массив ID выбранных карт)
    const selectedCardIds = [
      ...selectedBasic.map((card) => card.id),
      ...selectedAdditional.map((card) => card.id),
      ...selectedDesign.map((card) => card.id),
    ];

    if (selectedCardIds.length === 0) {
      alert("Пожалуйста, выберите товары для заказа.");
      return;
    }

    const orderData = {
      selected_cards: selectedCardIds, // Отправляем массив ID выбранных карт
    };

    console.log("Данные заказа перед отправкой:", orderData); // Проверяем, что отправляем массив ID

    // 2. Отправьте данные заказа
    const result = await dispatch(sendOrderData(orderData));

    // 3. Обработайте результат отправки
    if (sendOrderData.fulfilled.match(result)) {
      console.log("Заказ успешно отправлен:", result.payload);
      dispatch(clearSelectedCards()); // Опционально
      navigate("/successfully/");
    } else if (sendOrderData.rejected.match(result)) {
      console.error("Ошибка при отправке заказа:", result.payload);
      alert(`Ошибка при оформлении заказа: ${result.payload}`);
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
        <span className="active"></span>
        <div className="active" onClick={() => navigate("/finalPrice")}></div>
      </div>
      <h2 className="page-title">Финальная стоимость</h2>
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
          <div className="finalPrice">
            Итого:{" "}
            {[...selectedBasic, ...selectedAdditional, ...selectedDesign]
              .reduce((sum, card) => sum + parseFloat(card.price || 0), 0)
              .toLocaleString()}{" "}
            ₽
          </div>
          <div className="final-price-buttonCover">
            {sendOrderStatus === "loading" && <p>Отправка заказа...</p>}
            {sendOrderError && (
              <p style={{ color: "red" }}>Ошибка: {sendOrderError}</p>
            )}
            <button
              className="final-price-buttonn"
              onClick={handleGoToPayment}
              disabled={sendOrderStatus === "loading"}
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
