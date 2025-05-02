import React from "react";
import sleepIcon from "../../assets/Sleeping Circle.svg";
import "./ProfilePage.css";
import { LogOut, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home"); // укажи нужный путь
  };
  const handleClick2 = () => {
    navigate("/basicFeaturesPage"); // укажи нужный путь
  };
  const handleClick3 = () => {
    navigate("/");
  };
  return (
    <div className="profile-page">
      {/* Верхняя часть */}
      <div className="text-center relative">
        {/* Кнопка Назад */}
        <button onClick={handleClick} className="back_btn">
          Назад
        </button>

        {/* Аватар */}
        <div className="flex flex-col items-center mt-10">
          <div className="profile_icon">
            <svg
              width="92"
              height="92"
              viewBox="0 0 92 92"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_i_86_1600)">
                <rect width="92" height="92" rx="46" fill="#6F35FF" />
                <circle cx="45.9999" cy="32.9999" r="8.66667" fill="white" />
                <path
                  d="M63.3334 57.9167C63.3334 63.3015 63.3334 67.6667 46.0001 67.6667C28.6667 67.6667 28.6667 63.3015 28.6667 57.9167C28.6667 52.532 36.4271 48.1667 46.0001 48.1667C55.573 48.1667 63.3334 52.532 63.3334 57.9167Z"
                  fill="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_i_86_1600"
                  x="0"
                  y="0"
                  width="92"
                  height="96"
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
                    result="effect1_innerShadow_86_1600"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="6" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_86_1600"
                  />
                </filter>
              </defs>
            </svg>
          </div>

          {/* Имя и номер */}
          <h2 className="text-xl font-semibold mt-4">Мой профиль</h2>
          <p className="text-lg mt-1">+7 (999) 999 99 99</p>
        </div>
      </div>

      {/* Середина - нет заказов */}
      <div className="flex flex-col items-center mt-10">
        <img
          src={sleepIcon}
          alt="empty"
          className="w-20 h-20 opacity-30 mb-4"
        />
        <p className="text-center text-base text-black font-medium mb-6">
          Вы пока не сделали ни <br />
          одного заказа
        </p>

        <button onClick={handleClick2} className="order_btn">
          Заказать!
        </button>
      </div>

      {/* Низ - действия */}
      <div className="bottom_btn">
        <button onClick={handleClick3} className="exit_btn">
          <LogOut size={18} />
          <span>Выйти</span>
        </button>

        <button className="delete_btn">
          <Trash2 size={18} />
          <span>Удалить аккаунт</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
