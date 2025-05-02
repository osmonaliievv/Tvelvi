import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import BasicFeaturesPage from "../BasicFeaturesPage/BasicFeaturesPage";
import AdditionalFeaturesPage from "../AdditionalFeaturesPage/AdditionalFeaturesPage";
import DesignPage from "../DesighPage/DesighPage";
import FinalPricePage from "../FinalPricePage/FinalPricePage";
import "../../App.css";

const FeaturesFlow = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const pages = [
    { path: "basic", title: "Базовые функции", component: BasicFeaturesPage },
    {
      path: "additional",
      title: "Дополнительные функции",
      component: AdditionalFeaturesPage,
    },
    { path: "design", title: "Дизайн", component: DesignPage },
    {
      path: "final-price",
      title: "Финальная стоимость",
      component: FinalPricePage,
    },
  ];

  const handlePriceChange = (priceDelta) => {
    console.log("handlePriceChange called with:", priceDelta);
    setTotalPrice((prev) => {
      const newPrice = prev + priceDelta;
      console.log("New totalPrice:", newPrice);
      return newPrice;
    });
  };

  const currentPath = window.location.pathname.split("/").pop();
  const currentPageIndex = pages.findIndex((page) => page.path === currentPath);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentPageIndex >= 0 && currentPageIndex < pages.length - 1) {
        navigate(`/features/${pages[currentPageIndex + 1].path}`);
      }
    },
    onSwipedRight: () => {
      if (currentPageIndex > 0) {
        navigate(`/features/${pages[currentPageIndex - 1].path}`);
      } else {
        navigate("/");
      }
    },
    trackMouse: true,
  });

  const handleNext = () => {
    if (currentPageIndex >= 0 && currentPageIndex < pages.length - 1) {
      navigate(`/features/${pages[currentPageIndex + 1].path}`);
    }
  };

  const handleBack = () => {
    if (currentPageIndex > 0) {
      navigate(`/features/${pages[currentPageIndex - 1].path}`);
    } else {
      navigate("/");
    }
  };

  console.log(
    "Current path:",
    currentPath,
    "Current page index:",
    currentPageIndex
  );
  console.log("Total price in FeaturesFlow:", totalPrice);

  return (
    <div className="app" {...handlers}>
      <div className="container">
        {/* Progress Indicator */}
        <div className="progress-bar">
          {pages.map((_, index) => (
            <div key={index} className="progress-step">
              <div
                className={`progress-dot ${
                  index <= currentPageIndex && currentPageIndex >= 0
                    ? "active"
                    : ""
                }`}
              ></div>
              {index < pages.length - 1 && (
                <div
                  className={`progress-line ${
                    index < currentPageIndex && currentPageIndex > 0
                      ? "active"
                      : ""
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {pages.map((page, index) => (
            <div
              key={index}
              className={`category-tab ${
                currentPageIndex === index ? "active" : ""
              }`}
              onClick={() => navigate(`/features/${page.path}`)}
            >
              {page.title}
              {index < pages.length - 1 && <span className="tab-arrow">→</span>}
            </div>
          ))}
        </div>

        {/* Page Content */}
        <div className="page-content">
          <Routes>
            {pages.map((page, index) => (
              <Route
                key={index}
                path={page.path}
                element={
                  page.path === "final-price" ? (
                    <page.component totalPrice={totalPrice} />
                  ) : (
                    <page.component onPriceChange={handlePriceChange} />
                  )
                }
              />
            ))}
            <Route
              path="*"
              element={<BasicFeaturesPage onPriceChange={handlePriceChange} />}
            />
          </Routes>
        </div>

        {/* Total Price and Buttons */}
        {currentPath !== "final-price" && (
          <div className="total-section">
            <div className="total-price">
              Итого: {(totalPrice || 0).toLocaleString()} ₽
            </div>
            <div className="navigation-buttons">
              <button className="nav-button back-button" onClick={handleBack}>
                Назад
              </button>
              <button className="nav-button action-button" onClick={handleNext}>
                Далее
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturesFlow;
