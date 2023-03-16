import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Title from "../../components/Title/Title";
import {category} from "../../utils/list";
import {
    useChangeCartMutation,
    useDeleteComparisonMutation,
    useGetProductsByCategoryQuery
} from "../../store/reducers/products";
import {MdDoneAll} from "react-icons/md";
import {FiShoppingCart} from "react-icons/fi";

const Comparison = () => {
    const {i18n} = useTranslation()
    const nav = useNavigate()
    const [categoryData,setCategoryData] = useState('paintingGoods')
    const [limit] = useState(4)
    const {data = []} = useGetProductsByCategoryQuery({categoryData,limit})
    const [deleteComparison] = useDeleteComparisonMutation()
    const handleDeleteComparison = async (id) => {
        await deleteComparison({id})
    }
    const [changeCart] = useChangeCartMutation()
    const handleChangeCart = async (id) => {
        let body = data.find(item => item.id === id)
        await changeCart({cart: body.cart,id})
    }
    return (
        <section className={'comparison'}>
            <div className="container">
                <div className="category__top">
                    <p onClick={() => nav('/')} className="category__top__pages">{i18n.language === 'ru' ? 'Главная /' : 'Home /'}</p>
                    <p  className="category__top__pages">{i18n.language === 'ru' ? 'Сравнение товаров'  : 'Comparison' }</p>
                </div>
                <Title title={i18n.language === 'ru' ? 'Сравнение товаров'  : 'Comparison' }/>
                <div className="comparison__menu">
                    {
                        category.map(item => (
                            <li style={{background: categoryData === item.textEN ? '#F05A00' : ''}} key={item.id} onClick={() => setCategoryData(item.textEN)} className="comparison__line">
                                {
                                    i18n.language === 'ru' ? item.textRu : item.textEN
                                }
                            </li>
                        ))
                    }
                </div>
                <div className="comparison__row">
                    <div className="comparison__left">
                        <p className="comparison__left__desc">Сравнение</p>
                        <h2 className="comparison__left__title">Основные характеристики</h2>
                        <div className="comparison__left__parameter">Тип</div>
                        <div className="comparison__left__parameter">Наименование</div>
                        <div style={{height: '144.3px'}} className="comparison__left__parameter">Назначение</div>
                        <div style={{height: '70.3px'}} className="comparison__left__parameter">Тип работ</div>
                        <div className="comparison__left__parameter">Основа</div>
                        <div className="comparison__left__parameter">Разбавитель</div>
                        <div className="comparison__left__parameter">Цвет</div>
                        <div className="comparison__left__parameter">Степень глянца</div>
                        <div className="comparison__left__parameter">Вес</div>
                        <div className="comparison__left__parameter">Расход</div>
                    </div>
                    <div className="comparison__right">
                            {
                                data.filter(item => item.comparison)
                                    .map(item => (
                                        <div  key={item.id} className={'comparison__right__cont'}>
                                        <div className="comparison__right__card">
                                            <img width={80} height={80} src={`../${item.bg}`} alt="" className="comparison__right__card__img"/>
                                            <h3 className="comparison__right__card__title">{i18n.language === 'ru' ? item.titleRu : item.titleEn}</h3>
                                            <p className="comparison__right__card__price">{i18n.language === 'ru' ? `${item.price} ₽` : `${Math.ceil(item.price / 75)} $`}</p>
                                            <span className="comparison__right__card__cart">
                                                 {
                                                     item.cart ? <MdDoneAll onClick={() => handleChangeCart(item.id)}/>
                                                         :   <FiShoppingCart onClick={() => handleChangeCart(item.id)}/>
                                                 }
                                            </span>
                                            <span onClick={() => handleDeleteComparison(item.id)} className="comparison__right__card__close">
                                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6.07031L6 18.1306" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6 6.07031L18 18.1306" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                                            </span>
                                        </div>
                                            <div  className="comparison__right__data">
                                                <div className="comparison__right__data__parameter">Эмаль</div>
                                                <div className="comparison__right__data__parameter">Эмаль</div>
                                                <div className="comparison__right__data__parameter">для фасадов, для стен, для потолков, для кухонных/ванных комнат, для детских комнат</div>
                                                <div className="comparison__right__data__parameter">внутренние, наружные</div>
                                                <div className="comparison__right__data__parameter">акриловая</div>
                                                <div className="comparison__right__data__parameter">вода</div>
                                                <div className="comparison__right__data__parameter">Красный</div>
                                                <div className="comparison__right__data__parameter">матовая</div>
                                                <div className="comparison__right__data__parameter">1 кг</div>
                                                <div className="comparison__right__data__parameter">0,1 кг/м2</div>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>

                </div>
            </div>
        </section>
    );
};

export default Comparison;