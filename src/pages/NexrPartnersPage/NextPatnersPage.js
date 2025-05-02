import React, { useState } from "react";
import "./NexrPartnersPage.css";
import { useNavigate } from "react-router-dom";

const NextPartnersPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/partners"); // укажи нужный путь
  };
  const [items, setItems] = useState([
    { id: 1, added: false },
    { id: 2, added: true },
    { id: 3, added: false },
    { id: 4, added: false },
  ]);

  const toggleAdd = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, added: !item.added } : item
      )
    );
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div
          onClick={handleClick}
          style={{ display: "flex", alignItems: "center" }}
        >
          <svg
            className="back-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <h1>Назвние партнёра</h1>
        </div>
      </div>

      {/* Service List */}
      <div className="service-list">
        {items.map((item) => (
          <div key={item.id} className="service-card">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="icon-container">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_i_83_350)">
                    <rect width="40" height="40" rx="10" fill="#2C1E4F" />
                    <path
                      d="M10 20C10 15.286 10 12.9289 11.4645 11.4645C12.9289 10 15.286 10 20 10C24.714 10 27.0711 10 28.5355 11.4645C30 12.9289 30 15.286 30 20C30 24.714 30 27.0711 28.5355 28.5355C27.0711 30 24.714 30 20 30C15.286 30 12.9289 30 11.4645 28.5355C10 27.0711 10 24.714 10 20Z"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="24"
                      cy="16"
                      r="2"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 20.5001L11.7516 18.9675C12.6629 18.1702 14.0363 18.2159 14.8925 19.0721L19.1822 23.3618C19.8694 24.0491 20.9512 24.1428 21.7464 23.5839L22.0446 23.3744C23.1888 22.5702 24.7369 22.6634 25.7765 23.599L29 26.5001"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_i_83_350"
                      x="0"
                      y="0"
                      width="40"
                      height="42"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feMorphology
                        radius="2"
                        operator="erode"
                        in="SourceAlpha"
                        result="effect1_innerShadow_83_350"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="6" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_83_350"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="text-container">
                <p className="title">Название услуги</p>
                <p className="price">от 20 000 ₽</p>
              </div>
            </div>
            {item.added ? (
              <div className="added-container">
                <span className="added-text">Добавлено</span>
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
            ) : (
              <button onClick={() => toggleAdd(item.id)} className="add-button">
                Добавить в заказ
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPartnersPage;
