import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    useChangeCartMutation, useChangeComparisonMutation,
    useChangeFavoriteMutation,
    useGetProductsBySubdivisionQuery
} from "../../store/reducers/products";
import {useTranslation} from "react-i18next";
import Title from "../../components/Title/Title";
import {MdDoneAll} from "react-icons/md";
import {IoMdStats} from "react-icons/io";
import {AiOutlineHeart} from "react-icons/ai";
import {BsCheck} from "react-icons/bs";
import {FiShoppingCart} from "react-icons/fi";

const Sales = () => {
    const nav = useNavigate()
    const {category} = useParams()
    const [sort,setSort] = useState('')
    const {data = []} = useGetProductsBySubdivisionQuery({category,sort})
    const [changeFavorite] = useChangeFavoriteMutation()
    const handleChangeFavorite = async (id) => {
        let body = data.find(item => item.id === id)
        await changeFavorite({favorite:body.favorite, id})
    }
    const {t,i18n} = useTranslation()
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
        <section className={'favorites'}>
            <div className="container">
                <div className="category__top">
                    <p onClick={() => nav('/')} className="category__top__pages">{i18n.language === 'ru' ? 'Главная /' : 'Home /'}</p>
                    <p  className="category__top__pages">{i18n.language === 'ru' ? 'Акции'  : 'Sales' }</p>
                </div>
                <Title title={ i18n.language === 'ru' ? 'Акции' : 'Sales'}/>
                <div className="favorites__cont">
                    <p>
                        {
                            `${data.filter(item => item.salesEn).length} ${i18n.language === 'ru' ?  'товаров' : 'product' }`
                        }
                    </p>
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
                </div>

                <div className="favorites__block">
                    {
                        data.filter(item1 => item1.salesEn )
                            .map(item => (
                                <div key={item.id} className={'catalog__card'}>
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
                                                    <span style={{cursor: 'pointer'}} onClick={() => handleChangeFavorite(item.id)}>
                                                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8421 4.61012C20.3313 4.09912 19.7249 3.69376 19.0574 3.4172C18.39 3.14064 17.6746 2.99829 16.9521 2.99829C16.2296 2.99829 15.5142 3.14064 14.8467 3.4172C14.1793 3.69376 13.5728 4.09912 13.0621 4.61012L12.0021 5.67012L10.9421 4.61012C9.91038 3.57842 8.51111 2.99883 7.05207 2.99883C5.59304 2.99883 4.19376 3.57842 3.16207 4.61012C2.13038 5.64181 1.55078 7.04108 1.55078 8.50012C1.55078 9.95915 2.13038 11.3584 3.16207 12.3901L4.22207 13.4501L12.0021 21.2301L19.7821 13.4501L20.8421 12.3901C21.3531 11.8794 21.7584 11.2729 22.035 10.6055C22.3115 9.93801 22.4539 9.2226 22.4539 8.50012C22.4539 7.77763 22.3115 7.06222 22.035 6.39476C21.7584 5.7273 21.3531 5.12087 20.8421 4.61012Z" fill="#FC573B" stroke="#FC573B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                                                   </span> :
                                                    <AiOutlineHeart style={{cursor: 'pointer'}} onClick={() => handleChangeFavorite(item.id)}/>

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
                                        <p className="catalog__card__end__price">{i18n.language === 'ru' ? `${item.price} ₽` : `${Math.ceil(item.price / 75)} $`}</p>
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

                </div>
            </div>
        </section>
    );
};

export default Sales;