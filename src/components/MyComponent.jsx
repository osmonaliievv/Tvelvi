import React, { useState, useEffect } from "react";
import axios from "axios";

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cards/");
        setData(response.data); // Данные находятся в response.data
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  if (!data) {
    return <div>Данные не получены</div>;
  }

  return (
    <div>
      <h1>Данные из API (с использованием Axios):</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* ... дальнейшая обработка и отображение данных */}
    </div>
  );
}

export default MyComponent;
