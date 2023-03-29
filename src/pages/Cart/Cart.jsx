import React, {useState} from 'react';
import Title from "../../components/Title/Title";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {FcCalculator} from "react-icons/fc"
import {
    useAddNumberMutation,
    useDeleteCartMutation,
    useGetProductsQuery,
    useSubtractNumberMutation
} from "../../store/reducers/products";
import Calculator from "../../components/Calculator/Calculator";

const Cart = () => {
    const [showCalc,setShowCalc] = useState(false)
    const {t,i18n} = useTranslation()
    const nav = useNavigate()
    const {data = []} = useGetProductsQuery()
    const [subtractNumber] = useSubtractNumberMutation()
    const [addNumber] = useAddNumberMutation()
    const [deleteCart] = useDeleteCartMutation()
    const handleCountMinus = async (id) => {
        let body = data.find(item => item.id === id)
        await subtractNumber({count : body.count,id})
    }
    const handleCountPlus = async (id) => {
        let body = data.find(item => item.id === id)
        await addNumber({count : body.count,id})
    }
    const handleDeleteCart = async (id) => {
        let body = data.find(item => item.id === id)
        await deleteCart({cart: body.cart,id})
    }
    const total = () => {
       let discount =  data.filter(item => item.cart && item.discount)
            .reduce((acc,rec) => (
                acc + ((rec.discount - rec.price) * rec.count)
            ),0)
        let sum =  data.filter(item => item.cart)
            .reduce((acc,rec) => (
                acc + (rec.price + (rec.discount === 0 ? 0 : rec.discount - rec.price)) * rec.count
            ),0)
        return sum - discount
    }
    return (
        <section className={'cart'}>
            <div className="container">
                <div className="category__top">
                    <p onClick={() => nav('/')} className="category__top__pages">{i18n.language === 'ru' ? 'Главная /' : 'Home /'}</p>
                    <p  className="category__top__pages">{i18n.language === 'ru' ? 'Избранное'  : 'Favorites' }</p>
                </div>
                <div className="cart__top">
                    <Title title={ i18n.language === 'ru' ? 'Корзина' : 'Basket'}/>
                    <FcCalculator onClick={() => setShowCalc(prev => !prev)} style={{marginRight:'550px',fontSize: '32px',cursor: 'pointer'}}/>
                    <Calculator style={showCalc}/>
                    <button onClick={() => nav('/catalog')} className="cart__top__btn">{i18n.language === 'ru' ? 'ПРОДОЛЖИТЬ ПОКУПКИ' : 'Continue Shopping'}</button>
                </div>

                <div className="cart__block">
                    <div className="cart__names">
                        <p className="cart__name">{i18n.language === 'ru'? 'Название' : 'name'}</p>
                        <p className="cart__name">{i18n.language === 'ru'? 'Стоимость' : 'price'}</p>
                        <p className="cart__name">{i18n.language === 'ru'? 'Количество' : 'entity'}</p>
                        <p className="cart__name">{i18n.language === 'ru'? 'Итого' : 'total'}</p>
                    </div>
                    {
                        data.filter(item => item.cart)
                            .map(item => (
                                <div key={item.id} className={'cart__card'}>
                                    <img width={60} height={60} src={`../${item.bg}`} alt="" className="cart__card__img"/>
                                    <h3 className="cart__card__title">{i18n.language === 'ru' ? item.titleRu : item.titleEn}</h3>
                                    <div style={{width: '140px'}} className="category__horizontal__card__right">
                                        <p className="catalog__card__end__price">{i18n.language === 'ru' ? `${item.price} ₽` : `${Math.ceil(item.price / 75)} $`}</p>
                                        <p className="catalog__card__end__discount">{i18n.language === 'ru' ? item.discount ? `${item.discount} ₽` : '' : item.discount ? `${Math.round(item.discount / 75)} $` : ''}</p>
                                    </div>
                                    <div className="cart__card__count">
                                        <span className="cart__card__count__minus" onClick={() => handleCountMinus(item.id)}>-</span>
                                        <span className="cart__card__count__number">{item.count}</span>
                                        <span className="cart__card__count__plus" onClick={() => handleCountPlus(item.id)}>+</span>
                                    </div>
                                    <p className="cart__card__total">{`${item.price * item.count} ₽`}</p>
                                    <span onClick={() => handleDeleteCart(item.id)} className="cart__card__close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg></span>
                                </div>
                            ))
                    }
                    <div className="cart__bills">
                        <div className="cart__bills__sum">
                            <p className="cart__bills__sumText">
                                {i18n.language === 'ru' ? 'Сумма' : 'sum'}
                            </p>
                            <p className="cart__bills__sumText">
                                {
                                    data.filter(item => item.cart)
                                        .reduce((acc,rec) => (
                                            acc + (rec.price + (rec.discount === 0 ? 0 : rec.discount - rec.price)) * rec.count
                                        ),0)
                                } ₽
                            </p>
                        </div>
                        <div className="cart__bills__discount">
                            <p className="cart__bills__discountText">{i18n.language === 'ru' ? 'Скидка' : 'discount'}</p>
                            <p className="cart__bills__discountText">
                                {
                                    data.filter(item => item.cart && item.discount)
                                        .reduce((acc,rec) => (
                                            acc + ((rec.discount - rec.price) * rec.count)
                                        ),0)
                                } ₽
                            </p>
                        </div>
                        <div className="cart__bills__total">
                            <p className="cart__bills__totalText">{i18n.language === 'ru' ? 'К оплате' : 'To pay'}</p>
                            <p className="cart__bills__totalPrice">
                                {
                                   total()
                                } ₽
                            </p>
                        </div>
                        <button onClick={() => nav('/order')} className="cart__bills__btn">
                            {i18n.language === 'ru' ? 'ПЕРЕЙТИ К ОФОРМЛЕНИЮ' : 'GO TO CHECKOUT'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;