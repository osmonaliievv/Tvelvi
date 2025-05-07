import React from "react";
import { useNavigate } from "react-router-dom";
import "./FinalPricePage.css";
import { useSelector } from "react-redux";
import {
  selectSelectedBasicCards,
  selectSelectedAdditionalCards,
  selectSelectedDesignCards,
} from "../../features/selectedCards/selectedCardsSlice";

const FinalPricePage = () => {
  const navigate = useNavigate();
  const selectedBasic = useSelector(selectSelectedBasicCards);
  const selectedAdditional = useSelector(selectSelectedAdditionalCards);
  const selectedDesign = useSelector(selectSelectedDesignCards);

  // Рассчитываем общую стоимость
  const totalPrice = [
    ...selectedBasic,
    ...selectedAdditional,
    ...selectedDesign,
  ].reduce((sum, card) => sum + parseFloat(card.price || 0), 0);

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
            Итого: {totalPrice.toLocaleString()} ₽
          </div>
          <div className="final-price-buttonCover">
            <button
              className="final-price-buttonn"
              onClick={() => navigate("/successfully/")}
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
