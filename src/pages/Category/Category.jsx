import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {subdivision} from "../../utils/sibdivision";
import {useTranslation} from "react-i18next";
import {
    useChangeCartMutation, useChangeComparisonMutation,
    useChangeFavoriteMutation,
    useGetProductsBySubdivisionQuery
} from "../../store/reducers/products";
import {IoMdStats} from "react-icons/io";
import {AiOutlineHeart, AiOutlineReload} from "react-icons/ai";
import {FiShoppingCart} from "react-icons/fi";
import {BsCheck} from "react-icons/bs";
import {RiArrowRightSLine} from "react-icons/ri";

import {categoryForMain, filter} from "../../utils/list";
import {MdDoneAll} from "react-icons/md";
import Price from "../../components/Filter/Price";
import Manufactor from "../../components/Filter/Manufactor";
import Color from "../../components/Filter/Color";
import Brand from "../../components/Filter/Brand";
import axios from "axios";

const Category = () => {
    const [range,setRange] = useState(0)

    const [text,setText] = useState('')

    const [turnOn,setTurnOn] = useState(false)
    const board = (text) => {
        setText(text)
        setTurnOn(prev => !prev)
    }
    const {category} = useParams()

    const {i18n,t} = useTranslation()
    const nav = useNavigate()
    const [limit,setLimit] = useState(9)
    const [sort,setSort] = useState('')
    const [view,setView] = useState(false)
    const {data = []} = useGetProductsBySubdivisionQuery({category,limit,sort,range})
    const [changeFavorite] = useChangeFavoriteMutation()
    const handleChangeFavorite = async (id) => {
        let body = data.find(item => item.id === id)
        await changeFavorite({favorite:body.favorite, id})
    }
    const [changeCart] = useChangeCartMutation()
    const handleChangeCart = async (id) => {
        let body = data.find(item => item.id === id)
        await changeCart({cart: body.cart,id})
    }
    const [changeComparison] = useChangeComparisonMutation()
    const handleChangeComparison = async (id) => {
        let body =  data.find(item => item.id === id).comparison
        await changeComparison({id,body: body})
    }
    return (
        <section className={'category'}>
            <div className="container">
              <div className="category__top">
                  <p onClick={() => nav('/')} className="category__top__pages">{i18n.language === 'ru' ? 'Главная /' : 'Home /'}</p>
                  <p onClick={() => nav('/catalog')} className="category__top__pages">{i18n.language === 'ru' ? 'Каталог /'  : 'Catalog /' }</p>
                  <p onClick={() => nav('/catalog')} className="category__top__pages">
                      {
                          i18n.language === 'ru' ? subdivision.find(item => item.subdivision === category).categoryRu + ' ' +'/' : subdivision.find(item => item.subdivision === category).category + ' ' +'/'

                      }
                  </p>
                  <p className="category__top__pages">
                      {
                          i18n.language === 'ru' ? subdivision.find(item => item.subdivision === category).subdivisionRu  : subdivision.find(item => item.subdivision === category).subdivision
                      }
                  </p>
              </div>
                <h1 className="category__title">{i18n.language === 'ru' ? subdivision.find(item => item.subdivision === category).subdivisionRu  : subdivision.find(item => item.subdivision === category).subdivision}</h1>
                <div className="category__sortAndView">
                    <div className="category__contSort">
                        <p className={'category__sortAndView__sort'}>{i18n.language === 'ru' ? 'Сортировать:' : 'Sort:'}</p>
                        <select onChange={(e) => setSort(e.target.value)} className="category__sortAndView__select">
                            <option value="">{i18n.language === 'ru' ? 'По умолчанию' : 'By default'}</option>
                            <option value="alpAsc">{i18n.language === 'ru' ? 'От А до Я' : 'From A to Z'}</option>
                            <option value="alpDesc">{i18n.language === 'ru' ? 'От Я до А' : 'From Z to A'}</option>
                            <option value="asc">{i18n.language === 'ru' ? 'По возрастанию цены' : 'Ascending price'}</option>
                            <option value="desc">{i18n.language === 'ru' ? 'По убыванию цены' : 'Descending price'}</option>
                        </select>
                    </div>
                    <div className="category__contView">
                        <p className="category__contView__text">
                            {
                                i18n.language === 'ru' ? 'Вид :' : 'View :'
                            }
                        </p>
                        <span onClick={() => setView(false)} className={'category__contView__view'}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="6" height="6" rx="2" fill="#212526"/>
<rect y="8" width="6" height="6" rx="2" fill="#212526"/>
<rect y="16" width="6" height="6" rx="2" fill="#212526"/>
<rect x="8" width="6" height="6" rx="2" fill="#212526"/>
<rect x="8" y="8" width="6" height="6" rx="2" fill="#212526"/>
<rect x="8" y="16" width="6" height="6" rx="2" fill="#212526"/>
<rect x="16" width="6" height="6" rx="2" fill="#212526"/>
<rect x="16" y="8" width="6" height="6" rx="2" fill="#212526"/>
<rect x="16" y="16" width="6" height="6" rx="2" fill="#212526"/>
</svg>
                        </span>
                        <span onClick={() => setView(true)} className={'category__contView__view'}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="22" height="6" rx="1" fill="#DEDBDB"/>
<rect y="8" width="22" height="6" rx="1" fill="#DEDBDB"/>
<rect y="16" width="22" height="6" rx="1" fill="#DEDBDB"/>
</svg>

                        </span>
                    </div>
                </div>
                <div className="category__row">
                    <div className="category__navigation">
                        <div className="category__navigation__top">
                            {
                                categoryForMain.map(item => (
                                    <li style={{background: turnOn && text === item.textEN ? '#F05A00' : '#212526'}} key={item.id} onClick={() => board(item.textEN)} className="category__navigation__line">
                                        {
                                            i18n.language === 'ru' ? item.textRu : item.textEN
                                        }
                                        <RiArrowRightSLine style={{fontSize: '32px'}}/>
                                    </li>
                                ))
                            }
                        </div>
                        <div className="category__navigation__end">
                            <Price range={range} setRange={setRange}/>
                            <Manufactor/>
                            <Color/>
                            <Brand/>
                        </div>
                    </div>
                    <div style={{display: turnOn ? 'flex' : 'none'}} className="category__board">
                        {
                            categoryForMain.filter(item => (
                                text === item.textEN && Array.isArray(item.subdivisions)
                            )).map(filteredItem => (
                                filteredItem.subdivisions.map(subdivision => (
                                    <li onClick={() => nav(`/catalog/${subdivision.subdivision}`)} key={subdivision.id} className="category__board__line">
                                        { i18n.language === 'ru' ?  subdivision.subdivisionRu :  subdivision.subdivision}
                                    </li>
                                ))
                            ))
                        }

                    </div>
                    {
                        view === false ?
                            <div className="category__vertical">
                                {
                                    data.map(item => (
                                        <div key={item.id} style={{width: subdivision.find(item => item.subdivision === category).subdivision && 'calc(33.33333% - 13.33333px)',height: '340px'}} className="catalog__card">
                                            <div className="catalog__card__top">
                                                <h3 style={{background: item.noveltyRu || item.salesRu ? item.noveltyRu ? 'black' : '#FC573B' : 'none'}} className={'catalog__card__top__title'}>
                                                    {
                                                        item.noveltyRu || item.salesRu ? item.noveltyRu ?  i18n.language === 'ru'? item.noveltyRu : item.noveltyEn : i18n.language === 'ru' ? item.salesRu : item.salesEn : ''
                                                    }
                                                </h3>
                                                <div className="catalog__card__top__cont">
                                                    {
                                                        item.comparison ?  <MdDoneAll  onClick={() => handleChangeComparison(item.id)}/> : <IoMdStats onClick={() => handleChangeComparison(item.id)}/>
                                                    }
                                                    {
                                                        item.favorite ?
                                                            <span style={{cursor:'pointer'}} onClick={() => handleChangeFavorite(item.id)}>
                                                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8421 4.61012C20.3313 4.09912 19.7249 3.69376 19.0574 3.4172C18.39 3.14064 17.6746 2.99829 16.9521 2.99829C16.2296 2.99829 15.5142 3.14064 14.8467 3.4172C14.1793 3.69376 13.5728 4.09912 13.0621 4.61012L12.0021 5.67012L10.9421 4.61012C9.91038 3.57842 8.51111 2.99883 7.05207 2.99883C5.59304 2.99883 4.19376 3.57842 3.16207 4.61012C2.13038 5.64181 1.55078 7.04108 1.55078 8.50012C1.55078 9.95915 2.13038 11.3584 3.16207 12.3901L4.22207 13.4501L12.0021 21.2301L19.7821 13.4501L20.8421 12.3901C21.3531 11.8794 21.7584 11.2729 22.035 10.6055C22.3115 9.93801 22.4539 9.2226 22.4539 8.50012C22.4539 7.77763 22.3115 7.06222 22.035 6.39476C21.7584 5.7273 21.3531 5.12087 20.8421 4.61012Z" fill="#FC573B" stroke="#FC573B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                                                   </span> :
                                                            <AiOutlineHeart style={{cursor:'pointer'}} onClick={() => handleChangeFavorite(item.id)}/>

                                                    }
                                                </div>
                                            </div>
                                            <div onClick={() => nav(`/catalog/${item.subdivisionEn}/${item.id}`)} className="catalog__card__cont">
                                                <img src={`../${item.bg}`} alt=''  className="catalog__card__cont__img"/>
                                            </div>
                                            <p className="catalog__card__underTitle">
                                                {
                                                    i18n.language === 'ru'? item.titleRu : item.titleEn
                                                }
                                            </p>
                                            <div className="catalog__card__end">
                                                <p className="catalog__card__end__price">{i18n.language === 'ru' ? `${item.price} ₽` : `${Math.round(item.price / 75)} $`}</p>
                                                <p className="catalog__card__end__discount">{i18n.language === 'ru' ? item.discount ? `${item.discount} ₽` : '' : item.discount ? `${Math.round(item.discount / 75)} $` : ''}</p>
                                                <p style={{color: item.availability ? "#126935" : '#F05A00'}} className="catalog__card__end__availability">
                                                    {
                                                        item.availability ? <span className={'catalog__card__end__availability__check'} > {t('home.catalog.availability')} <BsCheck/></span> : t('home.catalog.nonAvailability')
                                                    }
                                                </p>
                                            </div>
                                            <span style={{background: item.cart ? '#F05A00' : '',color: item.cart ? 'white' : ''}} onClick={() => handleChangeCart(item.id)} className="catalog__card__cart">
                                                         {
                                                               item.cart ? <MdDoneAll/>
                                                                 :   <FiShoppingCart/>
                                                         }
                                            </span>
                                        </div>
                                    ))
                                }
                                {
                                    data.length >= 9 &&
                                    <button  onClick={() => setLimit(prev => prev + 9)} className="MCatalog__end__btn">
                                        <AiOutlineReload style={{color: '#F05A00',fontSize:'20px'}}/>
                                        {
                                            i18n.language === 'ru' ? 'Показать еще' : 'Show more'
                                        }
                                    </button>
                                }
                            </div> :
                            <div className="category__horizontal">
                                {
                                    data.map(item => (
                                        <div key={item.id} className={'category__horizontal__card'}>
                                            <h3 style={{background: item.noveltyRu || item.salesRu ? item.noveltyRu ? 'black' : '#FC573B' : 'none',position: 'absolute',top: '20px',left: '20px'}} className={'catalog__card__top__title'}>
                                                {
                                                    item.noveltyRu || item.salesRu ? item.noveltyRu ?  i18n.language === 'ru'? item.noveltyRu : item.noveltyEn : i18n.language === 'ru' ? item.salesRu : item.salesEn : ''
                                                }
                                            </h3>
                                            <div style={{position: 'absolute',top: '20px',right: '70px'}} className="catalog__card__top__cont">
                                                {
                                                    item.comparison ?  <MdDoneAll  onClick={() => handleChangeComparison(item.id)}/> : <IoMdStats onClick={() => handleChangeComparison(item.id)}/>
                                                }
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
                                            <div onClick={() => nav(`/catalog/${item.subdivisionEn}/${item.id}`)} className="category__horizontal__card__imgWrapper">
                                                <img src={`../${item.bg}`} alt="" className="category__horizontal__card__img"/>
                                            </div>
                                            <div className="category__horizontal__card__left">
                                                <p className="category__horizontal__card__left__title">
                                                    {
                                                        i18n.language === 'ru'? item.titleRu : item.titleEn
                                                    }
                                                </p>
                                                <p className="category__horizontal__card__left__desc">
                                                    {
                                                        i18n.language === 'ru' ? item.descRu : item.descEn
                                                    }
                                                </p>
                                                <p style={{color: item.availability ? "#126935" : '#F05A00'}} className="catalog__card__end__availability">
                                                    {
                                                        item.availability ? <span className={'catalog__card__end__availability__check'} > {t('home.catalog.availability')} <BsCheck/></span> : t('home.catalog.nonAvailability')
                                                    }
                                                </p>
                                            </div>
                                            <div className="category__horizontal__card__right">
                                                <p className="catalog__card__end__price">{i18n.language === 'ru' ? `${item.price} ₽` : `${Math.ceil(item.price / 75)} $`}</p>
                                                <p className="catalog__card__end__discount">{i18n.language === 'ru' ? item.discount ? `${item.discount} ₽` : '' : item.discount ? `${Math.round(item.discount / 75)} $` : ''}</p>
                                            </div>
                                            <span style={{background: item.cart ? '#F05A00' : '',color: item.cart ? 'white' : ''}} onClick={() => handleChangeCart(item.id)} className="category__horizontal__card__cart">
                            {
                                item.cart ? <MdDoneAll/>
                                    :   <FiShoppingCart/>
                            }
                        </span>
                                        </div>
                                    ))
                                }
                                {
                                    data.length >= 9 &&
                                    <button  onClick={() => setLimit(prev => prev + 9)} className="MCatalog__end__btn">
                                        <AiOutlineReload style={{color: '#F05A00',fontSize:'20px'}}/>
                                        {
                                            i18n.language === 'ru' ? 'Показать еще' : 'Show more'
                                        }

                                    </button>
                                }
                            </div>

                    }
                </div>
            </div>
        </section>
    );
};

export default Category;
