import React, { useState } from 'react';

const FeatureCard = ({ title, price, description, image, onPriceChange, className = '' }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleToggle = () => {
        setIsSelected(!isSelected);
        if (typeof onPriceChange === 'function') {
            onPriceChange(isSelected ? -price : price);
        } else {
            console.warn('onPriceChange is not a function');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleToggle();
        }
    };

    return (
        <div
            className={`feature-card ${className}`}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={0}
        >
            {/* <div className="feature-content">
                <div className="feature-text">
                    <div className="feature-price">
                        {(price || 0).toLocaleString()} ₽
                    </div>
                    <div className="feature-price-top">
                        Выберите стиль — ваш бренд в минималистичном дизайне!
                    </div>
                    <h3 className="feature-title">{title}</h3>
                    <p className="feature-description">{description}</p>
                    <div className="feature-price-bottom">
                        Запомните ваш бренд — уникальный стиль привлечёт внимание
                    </div>
                </div>
                <div className="feature-image">{image || <div className="placeholder-image">No Image</div>}</div>
            </div>
            {isSelected && (
                <div className="feature-check">
                    <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )} */}

            <div className="feature_content">
                <div className='feature_up'>
                    <div className='feature_left'>
                        <div className="feature-price">
                            {(price || 0).toLocaleString()} ₽
                        </div>
                        <div className="feature-price-top">
                            Выберите стиль — ваш бренд в минималистичном дизайне!
                        </div>
                    </div>
                    <div className="feature_image">{image || <div className="placeholder-image">No Image</div>}</div>
                </div>
                <div className='feature_down'>
                    <h3>Регистрация и авторизация</h3>
                    <p>
                        Функция позволяет пользователям регистрироваться и входить через почту, соцсети или номер телефона.
                    </p>
                </div>
            </div>
            {isSelected && (
                <div className="feature-check">
                    <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )} 
        </div>
    );
};

export default FeatureCard;