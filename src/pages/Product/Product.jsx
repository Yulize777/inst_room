import React, {useState} from 'react';
import {subdivision} from "../../utils/sibdivision";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {useAddReviewMutation, useChangeFavoriteMutation, useGetProductByIdQuery} from "../../store/reducers/products";
import {BsCheck} from "react-icons/bs";
import {IoMdStats} from "react-icons/io";
import {AiOutlineHeart} from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

const Product = () => {
    const [popup,setPopup] = useState(false)
    const [name,setName] = useState('')
    const [text,setText] = useState('')
    const [parameter,setParameter] = useState('Characteristic')
    const {i18n,t} = useTranslation()
    const {category,id} = useParams()
    const nav = useNavigate()
    const {data = []} = useGetProductByIdQuery(id)
    const [addReview] = useAddReviewMutation()
    const [changeFavorite] = useChangeFavoriteMutation()
    const handleChangeFavorite = async (id) => {
        let body = data.favorite
        await changeFavorite({favorite:body, id})
        console.log(body)
    }
    const handleAddReview = async (id) => {
        const review = {
            id: uuidv4(),
            name: name,
            text: text
        }
        const reviews =  data.reviews ? [...data.reviews, review] : [review]

        await addReview({reviews, id}).unwrap()
        setPopup(false)
        setName('')
        setText('')
    }
    return (
        <section className={'product'}>
            <div className="container">
                <div className="product__top">
                    <p onClick={() => nav('/')} className="product__top__pages">{i18n.language === 'ru' ? 'Главная /' : 'Home /'}</p>
                    <p onClick={() => nav('/catalog')} className="product__top__pages">{i18n.language === 'ru' ? 'Каталог /'  : 'Catalog /' }</p>
                    <p onClick={() => nav('/catalog')} className="product__top__pages">
                        {
                            i18n.language === 'ru' ? subdivision.find(item => item.subdivision === category).categoryRu + ' ' +'/' : subdivision.find(item => item.subdivision === category).category + ' ' +'/'

                        }
                    </p>
                    <p onClick={() => nav(`/catalog/${subdivision.find(item => item.subdivision === category).subdivision}`)} className="product__top__pages">
                        {
                            i18n.language === 'ru' ? subdivision.find(item => item.subdivision === category).subdivisionRu + ' ' + '/' : subdivision.find(item => item.subdivision === category).subdivision + ' ' + '/'
                        }
                    </p>
                    <p className="product__top__pages">{id}</p>
                </div>


                {
                    data.map(item => (
                        <div  key={item.id} className={'product__block'}>
                    <div  className="product__card">
                        <div className={'product__card__left'}>
                            <img src={`../../${item.bg}`} alt="" className="product__card__left__img"/>
                        </div>
                        <div className={'product__card__right'}>
                            <h1 className="product__card__right__title">
                                {
                                    i18n.language === 'ru' ? item.titleRu : item.titleEn
                                }
                            </h1>
                            <p style={{color: item.availability ? "#126935" : '#F05A00'}} className="product__card__right__availability">
                                {
                                    item.availability ? <span className={'catalog__card__end__availability__check'} > {t('home.catalog.availability')} <BsCheck/></span> : t('home.catalog.nonAvailability')
                                }
                            </p>
                            <p className="product__card__right__desc">
                                {
                                    i18n.language === 'ru' ? item.descRu : item.descEn
                                }
                            </p>
                            <div className="product__card__right__contPrice">
                                <p className="product__card__right__contPrice__price">{i18n.language === 'ru' ? `${item.price} ₽` : `${Math.ceil(item.price / 75)} $`}</p>
                                <p className="product__card__right__contPrice__discount">{i18n.language === 'ru' ? item.discount ? `${item.discount} ₽` : '' : item.discount ? `${Math.round(item.discount / 75)} $` : ''}</p>
                            </div>
                            <div className="product__card__right__end">
                                <button className="product__card__right__end__btn">
                                    { i18n.language === 'ru' ? 'В корзину' : 'Add to cart'}
                                </button>
                                <div  className="product__card__right__end__cont">
                                    <IoMdStats/>
                                    {
                                        item.favorite ?
                                            <span style={{cursor: 'pointer'}} onClick={() => handleChangeFavorite(item.id)}>
                                                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8421 4.61012C20.3313 4.09912 19.7249 3.69376 19.0574 3.4172C18.39 3.14064 17.6746 2.99829 16.9521 2.99829C16.2296 2.99829 15.5142 3.14064 14.8467 3.4172C14.1793 3.69376 13.5728 4.09912 13.0621 4.61012L12.0021 5.67012L10.9421 4.61012C9.91038 3.57842 8.51111 2.99883 7.05207 2.99883C5.59304 2.99883 4.19376 3.57842 3.16207 4.61012C2.13038 5.64181 1.55078 7.04108 1.55078 8.50012C1.55078 9.95915 2.13038 11.3584 3.16207 12.3901L4.22207 13.4501L12.0021 21.2301L19.7821 13.4501L20.8421 12.3901C21.3531 11.8794 21.7584 11.2729 22.035 10.6055C22.3115 9.93801 22.4539 9.2226 22.4539 8.50012C22.4539 7.77763 22.3115 7.06222 22.035 6.39476C21.7584 5.7273 21.3531 5.12087 20.8421 4.61012Z" fill="#FC573B" stroke="#FC573B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                                                   </span> :
                                            <AiOutlineHeart style={{cursor: 'pointer'}} onClick={() => handleChangeFavorite(item.id)}/>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                            <div className="product__data">
                                <div className="product__data__parameters">
                                    <li onClick={() => setParameter('Description')} className={`product__data__parameter ${parameter === 'Description' && 'active'}`}>{i18n.language === 'ru' ? 'Описание' : 'Description'}</li>
                                    <li onClick={() => setParameter('Characteristic')} className={`product__data__parameter ${parameter === 'Characteristic' && 'active'}`}>{i18n.language === 'ru' ? 'Характеристики' : 'Characteristic'}</li>
                                    <li onClick={() => setParameter('Ordering')} className={`product__data__parameter ${parameter === 'Ordering' && 'active'}`}>{i18n.language === 'ru' ? 'Доставка' : 'Ordering'}</li>
                                    <li onClick={() => setParameter('Reviews')} className={`product__data__parameter ${parameter === 'Reviews' && 'active'}`}>{i18n.language === 'ru' ? 'Отзывы' : 'Reviews'}</li>
                                </div>
                                {
                                    parameter === 'Description' &&
                                    <div className={'product__data__parameter__desc'}>

                                    </div>
                                }
                                {
                                    parameter === 'Characteristic' &&
                                    <div className={'product__data__parameter__character'}>

                                        <div className="product__data__parameter__character__cont">
                                            <p className="product__data__parameter__character__data1">
                                                {i18n.language === 'ru' ? 'Расход:' : 'Consumption:'}
                                            </p>
                                            <p className={'product__data__parameter__character__data2'}>
                                                {i18n.language === 'ru' ? item.consumptionRu : item.consumptionEn}
                                            </p>
                                        </div>

                                        <div className="product__data__parameter__character__cont">
                                            <p className="product__data__parameter__character__data1">
                                                {i18n.language === 'ru' ? 'Назначение:' : 'purpose:'}
                                            </p>
                                            <p className={'product__data__parameter__character__data2'}>
                                                {i18n.language === 'ru' ? item.purposeRu : item.purposeEn}
                                            </p>
                                        </div>

                                        <div className="product__data__parameter__character__cont">
                                            <p className="product__data__parameter__character__data1">
                                                {i18n.language === 'ru' ? 'Упаковка:' : 'package:'}
                                            </p>
                                            <p className={'product__data__parameter__character__data2'}>
                                                {i18n.language === 'ru' ? item.packageRu : item.packageEn}
                                            </p>
                                        </div>

                                        <div className="product__data__parameter__character__cont">
                                            <p className="product__data__parameter__character__data1">
                                                {i18n.language === 'ru' ? 'Время высыхания:' : 'drying Time:'}
                                            </p>
                                            <p className={'product__data__parameter__character__data2'}>
                                                {i18n.language === 'ru' ? item.dryingTimeRu : item.dryingTimeEn}
                                            </p>
                                        </div>
                                    </div>
                                }
                                {
                                    parameter === 'Ordering' &&
                                    <div className={'product__data__parameter__ordering'}>

                                    </div>
                                }
                                {
                                    parameter === 'Reviews' &&
                                    <div className={'product__data__parameter__reviews'}>
                                        <div style={{minHeight: '300px'}} className="product__data__parameter__reviews__forCard">
                                            {
                                                item.reviews[0].name ? item.reviews.map(item => (
                                                    <div key={item.id} className={'product__data__parameter__reviews__card'}>
                                                        <p className="product__data__parameter__reviews__name">
                                                            {item.name}
                                                        </p>
                                                        <p className="product__data__parameter__reviews__text">
                                                            {item.text}
                                                        </p>
                                                        <span className="product__data__parameter__reviews__further">
                                                             {i18n.language === 'ru' ? 'Далее' : 'Further'}
                                                        </span>
                                                    </div>
                                                )) : <h2  className="product__data__parameter__reviews__title">{i18n.language === 'ru' ? 'Нет отзывов' : 'No feedbacks'}</h2>
                                            }
                                        </div>
                                        <div className="product__data__parameter__reviews__forBtn">
                                            <button onClick={() => setPopup(true)} className="product__data__parameter__reviews__btn">
                                                {i18n.language === 'ru' ? 'ОСТАВИТЬ ОТЗЫВ' : 'Leave feedback'}
                                            </button>
                                        </div>
                                        <div style={{display: popup ? "flex" : 'none'}} className="product__data__parameter__reviews__popup">
                                            <h3 className="product__data__parameter__reviews__popup__title">
                                                {i18n.language === 'ru' ? 'Оставить отзыв' : 'Leave feedback'}
                                            </h3>
                                            <label className="product__data__parameter__reviews__popup__label">
                                                <p className="product__data__parameter__reviews__popup__subtitle">{i18n.language === 'ru' ? 'Ваше имя' : 'Your name'}</p>
                                                <input value={name} onChange={(e) => setName(e.target.value)} placeholder= {i18n.language === 'ru' ? 'Ваше имя' : 'Your name'} type="text" className="product__data__parameter__reviews__popup__field"/>
                                            </label>
                                            <label className="product__data__parameter__reviews__popup__label">
                                                <p className="product__data__parameter__reviews__popup__subtitle">{i18n.language === 'ru' ? 'Оставьте свой комментарий' : 'Leave your review'}</p>
                                                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={i18n.language === 'ru' ? 'Оставьте свой комментарий' : 'Leave your review'}  className="product__data__parameter__reviews__popup__field1"/>
                                            </label>
                                            <button onClick={() => handleAddReview(item.id)} className="product__data__parameter__reviews__popup__btn">
                                                {i18n.language === 'ru' ? 'ОПУБЛИКОВАТЬ' : 'PUBLISH'}
                                            </button>
                                            <span onClick={() => setPopup(false)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6L6 18" stroke="#8A8A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6 6L18 18" stroke="#8A8A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg></span>
                                        </div>
                                    </div>
                                }
                                <div style={{display: popup ? 'flex' : 'none'}} className="product__overlay"></div>
                            </div>
                        </div>
                ))}

            </div>
        </section>
    );
};

export default Product;