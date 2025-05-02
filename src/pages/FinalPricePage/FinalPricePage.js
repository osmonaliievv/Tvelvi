import React from 'react';
import { useNavigate } from 'react-router-dom';

const FinalPricePage = ({ totalPrice = 0 }) => {
    const navigate = useNavigate();

    return (
        <div className="page">
            <div className="steps">
                <div className='active' onClick={() => navigate('/basicFeaturesPage')}></div>
                <span className='active'></span>
                <div className='active' onClick={() => navigate('/additionalFeaturesPage')}></div>
                <span className='active'></span>
                <div className='active' onClick={() => navigate('/designPage')}></div>
                <span className='active'></span>
                <div className='active' onClick={() => navigate('/finalPrice')}></div>
            </div>
            <h2 className="page-title">Финальная стоимость</h2>
            <div className="final-price-container">
                <div className='amount'>
                    <h2 className="final-price-text">
                        Итого: {(totalPrice || 0).toLocaleString()} ₽
                    </h2>
                    <button
                        className="action-button final-price-button"
                        onClick={() => navigate('')}
                    >
                        Перейти к оплате
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinalPricePage;