// src/components/ProductsList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../features/cards/cardsSlice"; // Импортируем асинхронную функцию для получения данных
import "./ProductsList.css"; // Импортируем CSS файл для стилей

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.cards);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCards());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Загрузка...</div>;
  }

  if (status === "failed") {
    return <div>Ошибка: {error}</div>;
  }
  console.log(products);

  return (
    <div>
      <h2>Продукты</h2>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.card_name}</h3>
            <p>{product.description}</p>
            <p>{product.price} руб.</p>
            <p>Категория: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
