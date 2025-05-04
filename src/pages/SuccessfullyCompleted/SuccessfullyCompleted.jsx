import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessfullyCompleted.css";
import galochka from "../../assets/Frame 193.svg";
import photo01 from "../../assets/01.svg";
import photo02 from "../../assets/02.svg";
import photo03 from "../../assets/03.svg";
import question from "../../assets/Frame 206.svg";

const SuccessfullyCompleted = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const handleOkayClick = () => {
    navigate("/profile");
  };
  return (
    <div className="successfully">
      <div className="successfully-container">
        {/* Содержание страницы */}
        <div className="successfully-image">
          <img src={galochka} alt="Галочка" />
        </div>
        <h2 className="successfully-title">Заказ успешно сформирован</h2>
        <div className="successfully-question-title">Что дальше?</div>
        <div className="successfully-question-section-1">
          <div className="successfully-question-section-1_img">
            <img src={photo01} alt="" />
          </div>
          <div className="successfully-question-section-1_text">
            Скачайте счёт на оплату
          </div>
        </div>
        <div className="successfully-question-section-2">
          <div className="successfully-question-section-1_img">
            <img src={photo02} alt="" />
          </div>
          <div className="successfully-question-section-1_text">
            Оплатите счёт
          </div>
        </div>
        <div className="successfully-question-section-3">
          <div className="successfully-question-section-1_img">
            <img src={photo03} alt="" />
          </div>
          <div className="successfully-question-section-1_text">
            Мы свяжемся с вами в течение дня
          </div>
        </div>
        <div className="successfully-call-us">
          <div className="successfully-call-us-img">
            <img src={question} alt="" />
          </div>
          <div className="successfully-call-us-text">
            Остались вопросы? <br /> Мы ответим!
          </div>
        </div>
        <div className="successfully-call-us-button">
          <button
            className="successfully-call-us-button-text"
            onClick={handleDownloadClick}
          >
            Скачать счет
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Счет загружен. Спасибо за заказ!</p>
            <button className="modal-button" onClick={handleOkayClick}>
              ОК
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessfullyCompleted;
