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
import { deleteAccount, clearAuthState } from "../../features/auth/authSlice";
import profileIcon from "../../assets/Frame 193.svg";
import { LogOut, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import goIcon from "../../assets/goIcon.svg";
import Loading from "../../components/Loading/Loading"; // Убедись, что путь правильный

// Функция для форматирования номера телефона
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
    if (!profile?.id) {
      alert("Невозможно удалить аккаунт: профиль не найден.");
      return;
    }

    const confirmed = window.confirm("Вы уверены, что хотите удалить аккаунт?");
    if (!confirmed) return;

    const result = await dispatch(deleteAccount(profile.id));
    if (deleteAccount.fulfilled.match(result)) {
      dispatch(clearAuthState());
      navigate("/register");
    } else {
      alert(
        "Ошибка при удалении аккаунта: " +
          (result.payload || "Неизвестная ошибка.")
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(clearAuthState());
    navigate("/register");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  // !!! УДАЛЯЕМ ЭТОТ БЛОК
  // if (status === "loading") {
  //   return <Loading />;
  // }
  // !!!

  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="text-center relative">
          <button onClick={() => navigate("/")} className="back_btn">
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
            {profile && profile.phone_number ? (
              <p className="profile_phone_number">
                {formatPhoneNumber(profile.phone_number)}
              </p>
            ) : (
              <button
                onClick={handleRegisterClick}
                className="register_button-style"
              >
                Зарегистрироваться
              </button>
            )}
          </div>
        </div>

        {/* НОВЫЙ БЛОК: Условный рендеринг загрузки или контента */}
        {status === "loading" ? (
          <div className="orders-loading-container">
            <Loading />
          </div>
        ) : (
          <>
            {/* Отображение заказов, если есть */}
            {orders && Array.isArray(orders) && orders.length > 0 ? (
              <div className="orders-list">
                <div>
                  {orders.map((order) => (
                    <div key={order.id} className="order-item">
                      <div className="cards-cover">
                        <div className="card-items">
                          <div className="cards_id_status">
                            <div className="cards_id">Заказ № {order.id}</div>
                            <p className="cards_status">
                              Статус: {order.status_display}
                            </p>
                          </div>
                          <img src={goIcon} alt={goIcon} />
                        </div>
                      </div>

                      {order.cards && order.cards.length > 0 ? null : (
                        <div className="flex flex-col items-center mt-10">
                          <p className="text-center text-base text-black font-medium mb-6">
                            В этом заказе пока нет деталей.
                          </p>
                          {/* Кнопка "Заказать!" только если профиль существует */}
                          {profile && (
                            <button
                              onClick={() => navigate("/basicFeaturesPage")}
                              className="order_btn"
                            >
                              Заказать!
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Отображение сообщения о регистрации или отсутствии заказов
              <div className="flex flex-col items-center mt-10">
                <p className="text-center text-base text-black font-medium mb-6">
                  {profile
                    ? "У вас пока нет заказов."
                    : "Для просмотра заказов, пожалуйста, зарегистрируйтесь."}
                </p>
                {/* Кнопка "Заказать!" только если профиль существует */}
                {profile && (
                  <button
                    onClick={() => navigate("/basicFeaturesPage")}
                    className="order_btn"
                  >
                    Заказать!
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className="bottom_btn">
        {/* Кнопки "Выйти" и "Удалить аккаунт" показываем только если профиль существует */}
        {profile ? (
          <>
            <button onClick={handleLogout} className="exit_btn">
              <LogOut size={18} />
              <span>Выйти</span>
            </button>
            <button onClick={handleDeleteAccount} className="delete_btn">
              <Trash2 size={18} />
              <span>Удалить аккаунт</span>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProfilePage;
