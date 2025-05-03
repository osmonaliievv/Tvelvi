import React from "react";
import { useNavigate } from "react-router-dom";
import "./FinalPricePage.css";

const FinalPricePage = ({ totalPrice = 0 }) => {
  const navigate = useNavigate();

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
          <div className="amount-flex">
            <h2 className="amount-category">категория</h2>
            <h4 className="amount-put">Изменить ›</h4>
          </div>
          <div className="amount-card">
            <div className="amount-name">Фудтех приложения</div>
            <div className="amount-price">от 100 000 ₽</div>
          </div>
          <div className="amount-flex">
            <h2 className="amount-category">Базовые функции</h2>
            <h4 className="amount-put">Изменить ›</h4>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 14px",
            }}
          >
            <div className="amount-cardwithMinus">
              <div className="amount-name">Регистрация и авторизация</div>
              <div className="amount-price">от 100 000 ₽</div>
            </div>
            <div class="minus-circle">
              <span class="minus-sign"></span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 14px",
            }}
          >
            <div className="amount-cardwithMinus">
              <div className="amount-name">Регистрация и авторизация</div>
              <div className="amount-price">от 100 000 ₽</div>
            </div>
            <div class="minus-circle">
              <span class="minus-sign"></span>
            </div>
          </div>
          <div className="amount-flex">
            <h2 className="amount-category">категория</h2>
            <h4 className="amount-put">Изменить ›</h4>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 14px",
            }}
          >
            <div className="amount-cardwithMinus">
              <div className="amount-name">Регистрация и авторизация</div>
              <div className="amount-price">от 100 000 ₽</div>
            </div>
            <div class="minus-circle">
              <span class="minus-sign"></span>
            </div>
          </div>{" "}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 14px",
            }}
          >
            <div className="amount-cardwithMinus">
              <div className="amount-name">Регистрация и авторизация</div>
              <div className="amount-price">от 100 000 ₽</div>
            </div>
            <div class="minus-circle">
              <span class="minus-sign"></span>
            </div>
          </div>
          <div className="amount-flex">
            <h2 className="amount-category">категория</h2>
            <h4 className="amount-put">Изменить ›</h4>
          </div>
          <div className="amount-card">
            <div className="amount-name">Фудтех приложения</div>
            <div className="amount-price">от 100 000 ₽</div>
          </div>
          <div className="priceAndButton">
            <div className="finalPrice">Итого: 202 000 ₽</div>
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
    </div>
  );
};

export default FinalPricePage;
