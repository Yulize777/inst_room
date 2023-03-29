import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import Title from "../../components/Title/Title";
import {useNavigate} from "react-router-dom";
import {useGetProductsQuery} from "../../store/reducers/products";
import {useAddOrderMutation} from "../../store/reducers/orders";

const Order = () => {
    const {data = []} = useGetProductsQuery()
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

    const [addOrder] = useAddOrderMutation()
    const handleAddOrder = async () => {
        const body = {
            name: customer.name,
            surname: customer.surname,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            order: order === 'courierOrder' ?
                {
                    city: courierOrder.city,
                    corps: courierOrder.corps,
                    street: courierOrder.street,
                    theNearestDeliveryData: courierOrder.theNearestDeliveryData,
                    house: courierOrder.house,
                    apartment: courierOrder.apartment,
                    deliveryPrise: courierOrder.deliveryPrise
                } :
                {
                    pickup: pickup
                },
            payment: payment === 'receipt' ?
                {
                    receipt: receipt === 'cash' ? 'cash' : 'creditCard'
                } :
                {
                    online: 'online'
                },
            products: data.filter(item => item.cart)

        }
        await addOrder(body)
    }

    const nav = useNavigate()
    const {t,i18n} = useTranslation()
    const [parameter,setParameter] = useState('customer\'s data')
    const [order,setOrder] = useState('')
    const [payment,setPayment] = useState('')
    const [customer,setCustomer] = useState({})
    const [courierOrder,setCourierOrder] = useState({})
    const [pickup,setPickup] = useState('')
    const [receipt,setReceipt] = useState('')
    return (
        <section className={'order'}>
            <div className="container">
                <div className="category__top">
                    <p onClick={() => nav('/')} className="category__top__pages">{i18n.language === 'ru' ? 'Главная /' : 'Home /'}</p>
                    <p  className="category__top__pages">{i18n.language === 'ru' ? 'Оформление заказа'  : 'Ordering' }</p>
                </div>
                <Title title={i18n.language === 'ru' ? 'Оформление заказа'  : 'Ordering' }/>
                <div className="order__row">
                    <div className="product__data__parameters">
                        <li onClick={() => setParameter('customer\'s data')} className={`product__data__parameter ${parameter === 'customer\'s data' && 'active'}`}>{i18n.language === 'ru' ? 'Данные покупателя' : 'customer\'s data' }</li>
                        <li onClick={() => setParameter('order')} className={`product__data__parameter ${parameter === 'order' && 'active'}`}>{i18n.language === 'ru' ? 'Доставка' : 'order'}</li>
                        <li onClick={() => setParameter('payment')} className={`product__data__parameter ${parameter === 'payment' && 'active'}`}>{i18n.language === 'ru' ? 'Оплата' : 'payment'}</li>
                    </div>

                    <form onSubmit={handleAddOrder} className="order__form">


                        {
                            parameter === 'customer\'s data' &&
                            <div className="order__form__data">
                                <label  className="order__form__data__label">
                                    <p className="order__form__data__text">
                                        {i18n.language === 'ru' ? 'Фамилия'  : 'surname' }
                                    </p>
                                    <input value={customer.surname} onChange={(e) => setCustomer(prev => {
                                        return {...prev,surname: e.target.value}
                                    })} type="text" className="order__form__data__input"/>
                                </label>
                                <label  className="order__form__data__label">
                                    <p className="order__form__data__text">
                                        {i18n.language === 'ru' ? 'Имя'  : 'name' }
                                    </p>
                                    <input value={customer.name} onChange={(e) => setCustomer(prev => {
                                        return {...prev,name: e.target.value}
                                    })} type="text" className="order__form__data__input"/>
                                </label>
                                <label  className="order__form__data__label">
                                    <p className="order__form__data__text">
                                        {i18n.language === 'ru' ? 'Телефон'  : 'phoneNumber' }
                                    </p>
                                    <input value={customer.phoneNumber} onChange={(e) => setCustomer(prev => {
                                        return {...prev,phoneNumber: e.target.value}
                                    })} type="tel" className="order__form__data__input"/>
                                </label>
                                <label  className="order__form__data__label">
                                      <p className="order__form__data__text">
                                          {i18n.language === 'ru' ? 'Электронная почта'  : 'email' }
                                      </p>
                                     <input value={customer.email} onChange={(e) => setCustomer(prev => {
                                         return {...prev,email: e.target.value}
                                     })} type="text" className="order__form__data__input"/>
                                </label>
                            </div>
                        }


                        {
                            parameter === 'order' &&
                            <div className="order__form__order">
                                <p className="order__form__order__title">
                                    {i18n.language === 'ru' ? 'Выберите подходящий вам вариант доставки:'  : 'choose the suitable delivery\'s option for you' }
                                </p>
                                <div className="order__form__order__contForLabels">
                                    <label  className="order__form__order__label">
                                        <input checked={order === 'courierOrder' && true} onClick={(e) => setOrder(e.target.value)} value={'courierOrder'} name={'order'} type="radio" className="order__form__order__input"/>
                                        <p className="order__form__order__label__text">
                                            {i18n.language === 'ru' ? 'Доставка курьером'  : 'Courier delivery' }
                                        </p>
                                    </label>
                                    <label  className="order__form__order__label">
                                        <input checked={order === 'pickup' && true} value={'pickup'} onClick={(e) => setOrder(e.target.value)} name={'order'} type="radio" className="order__form__order__input"/>
                                        <p className="order__form__order__label__text">
                                            {i18n.language === 'ru' ? 'Самовывоз'  : 'Pickup' }
                                        </p>
                                    </label>
                                </div>


                                {
                                    order === 'courierOrder' ?
                                        <h3 className="order__form__order__courierOrder__title">
                                            {i18n.language === 'ru' ? 'Введите адрес доставки'  : 'Enter shipping address' }
                                        </h3> :  order === 'pickup' ?
                                        <h3 className="order__form__order__courierOrder__title">
                                            {i18n.language === 'ru' ? 'Выберите пункт доставки'  : 'Choose a delivery point' }
                                        </h3> : ''
                                }

                                {
                                    order === 'courierOrder' &&
                                    <div className="order__form__order__courierOrder">
                                        <label  className="order__form__order__courierOrder__label">
                                            <p className="order__form__order__courierOrder__text">
                                                {i18n.language === 'ru' ? 'Город'  : 'city' }
                                            </p>
                                            <input value={courierOrder.city} onChange={(e) => setCourierOrder(prev => {
                                                return {...prev, city: e.target.value}
                                            })}
                                             type="text" className="order__form__order__courierOrder"/>
                                        </label>


                                        <label  className="order__form__order__courierOrder__label">
                                            <p className="order__form__order__courierOrder__text">
                                                {i18n.language === 'ru' ? 'Корпус'  : 'corps' }
                                            </p>
                                            <input value={courierOrder.corps} onChange={(e) => setCourierOrder(prev => {
                                                return {...prev, corps: e.target.value}
                                            })} type="text" className="order__form__order__courierOrder"/>
                                        </label>


                                        <label  className="order__form__order__courierOrder__label">
                                            <p className="order__form__order__courierOrder__text">
                                                {i18n.language === 'ru' ? 'Улица'  : 'street' }
                                            </p>
                                            <input value={courierOrder.street} onChange={(e) => setCourierOrder(prev => {
                                                return {...prev, street: e.target.value}
                                            })} type="text" className="order__form__order__courierOrder"/>
                                        </label>

                                        <div className="order__form__order__courierOrder__twoLabel">
                                            <label  className="order__form__order__courierOrder__twoLabel__label">
                                                <p className="order__form__order__courierOrder__text">
                                                    {i18n.language === 'ru' ? 'Дом'  : 'house' }
                                                </p>
                                                <input value={courierOrder.house} onChange={(e) => setCourierOrder(prev => {
                                                    return {...prev, house: e.target.value}
                                                })} type="text" className="order__form__order__courierOrder"/>
                                            </label>
                                            <label  className="order__form__order__courierOrder__twoLabel__label">
                                                <p className="order__form__order__courierOrder__text">
                                                    {i18n.language === 'ru' ? 'Квартира'  : 'apartment' }
                                                </p>
                                                <input value={courierOrder.apartment} onChange={(e) => setCourierOrder(prev => {
                                                    return {...prev, apartment: e.target.value}
                                                })} type="text" className="order__form__order__courierOrder"/>
                                            </label>
                                        </div>

                                        <label  className="order__form__order__courierOrder__label">
                                            <p className="order__form__order__courierOrder__text">
                                                {i18n.language === 'ru' ? 'Ближайшая дата доставки'  : 'theNearestDeliveryData' }
                                            </p>
                                            <input value={courierOrder.theNearestDeliveryData} onChange={(e) => setCourierOrder(prev => {
                                                return {...prev, theNearestDeliveryData: e.target.value}
                                            })} type="text" className="order__form__order__courierOrder"/>
                                        </label>


                                        <label  className="order__form__order__courierOrder__label">
                                            <p className="order__form__order__courierOrder__text">
                                                {i18n.language === 'ru' ? 'Сумма доставки'  : 'deliveryPrise' }
                                            </p>
                                            <input value={courierOrder.deliveryPrise} onChange={(e) => setCourierOrder(prev => {
                                                return {...prev, deliveryPrise: e.target.value}
                                            })} type="text" className="order__form__order__courierOrder"/>
                                        </label>
                                    </div>
                                }


                                {
                                    order === 'pickup' &&
                                    <div className="order__form__order__pickup">
                                        <select  value={pickup} onClick={(e) => setPickup(e.target.value)} className="order__form__order__pickup__select">
                                            <option value="Москва, ул Первомайская 14" className="order__form__order__pickup__opt">
                                                Москва, ул Первомайская 14
                                            </option>
                                            <option value="Москва" className="order__form__order__pickup__opt">
                                                Москва
                                            </option>
                                            <option value="ул Первомайская 14" className="order__form__order__pickup__opt">
                                                , ул Первомайская 14
                                            </option>
                                        </select>
                                        <p className="order__form__order__pickup__desc">
                                            <span className="order__form__order__pickup__desc__span">
                                                 {i18n.language === 'ru' ? 'Доставка бесплатно до пункта выдачии'  : 'delivery is free before the point' }
                                            </span>
                                            <br/>
                                            <br/>
                                            <span className="order__form__order__pickup__desc__span">
                                                 {i18n.language === 'ru' ? 'Дата доставки в пункт выдачи ориентировочно — 10 февраля.'  : 'delivery is free before the point' }
                                            </span>
                                            <br/>
                                            <br/>
                                            <span className="order__form__order__pickup__desc__span">
                                                 {i18n.language === 'ru' ? 'Срок хранения заказа 14 дней'  : 'Order storage period up to 14 days' }
                                            </span>
                                        </p>
                                    </div>

                                }
                            </div>
                        }


                        {
                            parameter === 'payment' &&
                            <div className="order__form__payment">
                                <p className="order__form__order__title">
                                    {i18n.language === 'ru' ? 'Выберите подходящий вам вариант оплаты:'  : 'choose the suitable payment\'s option for you' }
                                </p>
                                <div className="order__form__order__contForLabels">
                                    <label  className="order__form__order__label">
                                        <input checked={payment === 'receipt' && true} onClick={(e) => setPayment(e.target.value)} value={'receipt'} name={'payment'} type="radio" className="order__form__order__input"/>
                                        <p className="order__form__order__label__text">
                                            {i18n.language === 'ru' ? 'Оплата при получении'  : 'Payment upon receipt' }
                                        </p>
                                    </label>
                                    <label  className="order__form__order__label">
                                        <input checked={payment === 'online' && true} onClick={(e) => setPayment(e.target.value)} value={'online'} name={'payment'} type="radio" className="order__form__order__input"/>
                                        <p className="order__form__order__label__text">
                                            {i18n.language === 'ru' ? 'Оплата онлайн'  : 'Online payment' }
                                        </p>
                                    </label>
                                </div>

                                {
                                    payment === 'receipt' &&
                                    <div className="order__form__payment__options">
                                        <label  className="order__form__order__label">
                                            <input onClick={(e) => setReceipt(e.target.value)} value={'cash'} name={'payment'} type="radio" className="order__form__order__input"/>
                                            <p className="order__form__order__label__text">
                                                {i18n.language === 'ru' ? 'наличными'  : 'cash' }
                                            </p>
                                        </label>
                                        <label  className="order__form__order__label">
                                            <input onClick={(e) => setReceipt(e.target.value)} value={'creditCard'} name={'payment'} type="radio" className="order__form__order__input"/>
                                            <p className="order__form__order__label__text">
                                                {i18n.language === 'ru' ? 'банковской картой'  : 'credit card' }
                                            </p>
                                        </label>
                                    </div>
                                }

                            </div>
                        }



                        <button style={{padding: parameter === 'payment' ? '15px 67px': '15px 127px', background: parameter === 'payment' ? '#F05A00': '' }} onClick={() => parameter === 'customer\'s data' ? setParameter('order') : parameter === 'order' ? setParameter('payment') : ''} type={parameter === 'payment' ? 'submit': 'button'} className="order__form__btn">
                            {parameter === 'payment' ? i18n.language === 'ru' ? 'ПОДТВЕРДИТЬ ЗАКАЗ' : 'confirm': i18n.language === 'ru' ? 'ДАЛЕЕ': 'further'}
                        </button>
                    </form>

                    <div className="order__total">
                        <div className="cart__bills__total">
                            <p style={{color:'white'}} className="cart__bills__totalText">{i18n.language === 'ru' ? 'Итого' : 'total'} </p>
                            <p className="cart__bills__totalPrice">
                                {
                                    parameter === 'customer\'s data' ? total() : total() + 1500
                                } ₽
                            </p>
                        </div>
                        <p style={{color: 'white'}}>
                            {
                                `${data.filter(item => item.cart).length} ${i18n.language === 'ru' ?  'товаров' : 'product' }`
                            }
                        </p>
                        <div style={{border: 'none',color: 'white',marginTop: '16px'}} className="cart__bills__discount">
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
                        <div style={{border: 'none',color: 'white'}} className="cart__bills__discount">
                            <p style={{color: 'white'}}>
                                {i18n.language === 'ru' ? 'Доставка'  : 'delivering' }
                            </p>
                            <p style={{color: 'white'}}>
                                {parameter === 'customer\'s data' ? i18n.language === 'ru' ? 'Бесплатно'  : 'free' : '1500 ₽'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Order;