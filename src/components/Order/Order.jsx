import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useGetProductsQuery} from "../../store/reducers/products";

const Order = ({item}) => {
    const {i18n} = useTranslation()
    const nav = useNavigate()
    const [accor,setAcoor] = useState(false)
    return (
        <>
            <li   onClick={() => setAcoor(prev => !prev)} className="myProfile__order">
                <h2 className="myProfile__order__title">
                    {i18n.language === 'ru' ? `Заказ номер ${item.id}` : `order\'s number is ${item.id}`}
                </h2>
                <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
            </span>
            </li>
            {
                accor &&
                <ul className="myProfile__order__list">
                    {
                        item.products && item.products.map(item => (
                            <li key={item.id} className="myProfile__order__list__line">
                                <img width={60} height={60} src={item.bg} alt=""/>
                                <h2 className="myProfile__order__list__title">
                                    {i18n.language === 'ru' ? item.titleRu : item.titleEn}
                                </h2>
                                <p className="myProfile__order__list__price">
                                    {item.price} x {item.count}
                                </p>
                                <p className="myProfile__order__list__price">
                                    {item.price * item.count} ₽
                                </p>
                            </li>
                        ))
                    }
                    <div  className="myProfile__order__list__total">
                        <p>
                            {i18n.language === 'ru' ? 'Итого' : 'Total'}
                        </p>
                        {
                            item.products.reduce((acc,rec) => {
                                return acc + rec.price * rec.count
                            },0)
                        }
                        ₽
                    </div>
                </ul>
            }
        </>

    );
};

export default Order;