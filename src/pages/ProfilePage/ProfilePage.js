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
import { deleteAccount, clearAuthState } from "../../features/auth/authSlice"; // ✅ Добавлено
import profileIcon from "../../assets/Frame 193.svg";
import { LogOut, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import goIcon from "../../assets/goIcon.svg";

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return "";
  }

  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
  }

  return phoneNumber;
};

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
  console.log("orders", orders);

  const handleDeleteAccount = async () => {
    if (!profile?.id) return;

    const confirmed = window.confirm("Вы уверены, что хотите удалить аккаунт?");
    if (!confirmed) return;

    const result = await dispatch(deleteAccount(profile.id));
    if (deleteAccount.fulfilled.match(result)) {
      dispatch(clearAuthState());
      navigate("/");
    } else {
      alert("Ошибка при удалении аккаунта: " + result.payload);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(clearAuthState());
    navigate("/");
  };

  if (status === "loading") {
    return <div>Загрузка...</div>;
  }

  if (status === "failed") {
    return <div>Ошибка: {error}</div>;
  }

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
            <p className="profile_phone_number">
              {formatPhoneNumber(profile.phone_number)}
            </p>
          )}
        </div>
      </div>

      {orders && Array.isArray(orders) && orders.length > 0 ? (
        <div className="orders-list">
          <div>
            {orders.map((order) => (
              <div key={order.id} className="order-item">
                <div>Заказ № {order.id}</div>
                <p style={{ color: "black" }}>Статус: {order.status}</p>
                {order.cards &&
                order.cards.length >
                  0 ? // Если у заказа есть карточки (ранее ты их отображал здесь)
                // Ты можешь добавить сюда любую информацию, которую ты хочешь отображать о заказе,
                // если у него есть карточки.
                null : (
                  // Если у заказа нет карточек, отображаем сообщение и кнопку "Заказать!"
                  <div className="flex flex-col items-center mt-10">
                    <p className="text-center text-base text-black font-medium mb-6">
                      В этом заказе пока нет деталей.
                    </p>
                    <button
                      onClick={() => navigate("/basicFeaturesPage")}
                      className="order_btn"
                    >
                      Заказать!
                    </button>
                  </div>
                )}
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
        <button onClick={handleLogout} className="exit_btn">
          <LogOut size={18} />
          <span>Выйти</span>
        </button>
        <button onClick={handleDeleteAccount} className="delete_btn">
          <Trash2 size={18} />
          <span>Удалить аккаунт</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
