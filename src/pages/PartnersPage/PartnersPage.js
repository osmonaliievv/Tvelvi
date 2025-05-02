import React from "react";
import "./PartnersPage.css";
import partnersImg from "../../assets/Frame 217.svg";
import { useNavigate } from "react-router-dom";
const partners = [
  {
    id: 1,
    title: "Название партнёра",
    description: "Безопасность, разработка приложений, сайтов",
    image: partnersImg,
  },
  {
    id: 2,
    title: "Название партнёра",
    description: "Безопасность, разработка приложений, сайтов",
    image: partnersImg,
  },
  {
    id: 3,
    title: "Название партнёра",
    description: "Безопасность, разработка приложений, сайтов",
    image: partnersImg,
  },
  {
    id: 4,
    title: "Название партнёра",
    description: "Безопасность, разработка приложений, сайтов",
    image: partnersImg,
  },
  {
    id: 5,
    title: "Название партнёра",
    description: "Безопасность, разработка приложений, сайтов",
    image: partnersImg,
  },
];

const PartnersPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home"); // укажи нужный путь
  };
  const handleClick2 = () => {
    navigate("/nextPartners"); // укажи нужный путь
  };
  return (
    <div className="p-4">
      <div className="name_page">
        <h1 onClick={handleClick} className="text-xl font-semibold">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L9 12L15 19"
              stroke="#0D0D0D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Наши партнёры
        </h1>
      </div>

      <div className="space-y-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm partners-card "
          >
            <img
              src={partner.image}
              alt={partner.title}
              className="w-full object-cover"
            />
            <div onClick={handleClick2} className="p-3">
              <h2 className="text-base font-semibold">{partner.title}</h2>
              <p className="text-sm text-gray-500">{partner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersPage;
