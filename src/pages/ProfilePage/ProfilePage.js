import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserProfile,
  fetchUserOrders,
  selectUserProfile,
  selectUserOrders,
  selectUserStatus,
  selectUserError,
} from "../../features/user/userSlice";
import profileIcon from "../../assets/Frame 193.svg";
import { LogOut, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import goIcon from "../../assets/goIcon.svg";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Загрузка...</div>;
  }

  if (status === "failed") {
    return <div>Ошибка: {error}</div>;
  }
  console.log(orders);
  console.log(profile);

  return (
    <div className="profile-page">
      <div className="text-center relative">
        <button onClick={() => navigate("/home")} className="back_btn">
          Назад
        </button>
        <div className="flex flex-col items-center mt-10">
          <div className="profile_icon">
            <img
              src={profileIcon}
              alt="profile"
              className="w-20 h-20 rounded-full border-2 border-white"
            />
          </div>
          <h2 className="text-xl font-semibold mt-4">Мой профиль</h2>
          {profile && (
            <p className="text-lg mt-1">Телефон: {profile.phone_number}</p>
          )}
        </div>
      </div>

      {orders && Array.isArray(orders) && orders.length > 0 ? (
        <div className="orders-list">
          <div>
            {orders.map((order) => (
              <div key={order.id} className="order-item">
                <div className="flex flex-wrap">
                  {order.cards?.map((card) => (
                    <div key={card.id} className="card-items">
                      <div className="card-item-small" style={{}}>
                        <div>Ваш заказ № {card.id}</div>
                        <button className="card-item-small_btn">
                          <img
                            src={goIcon}
                            alt="card"
                            className="w-20 h-20 rounded-full border-2 border-white"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : status === "succeeded" ? (
        <div className="flex flex-col items-center mt-10">
          <p className="text-center text-base text-black font-medium mb-6">
            У вас пока нет заказов.
          </p>
          <button
            onClick={() => navigate("/basicFeaturesPage")}
            className="order_btn"
          >
            Заказать!
          </button>
        </div>
      ) : null}

      <div className="bottom_btn">
        <button
          onClick={() => {
            localStorage.removeItem("access_token");
            navigate("/");
          }}
          className="exit_btn"
        >
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
