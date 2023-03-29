import React, {useState} from 'react';
import Title from "../../components/Title/Title";
import {useTranslation} from "react-i18next";
import {useGetProductsByCategoryQuery} from "../../store/reducers/products";
import {category} from "../../utils/list";
import {useLocation, useNavigate} from "react-router-dom";
import {AiOutlineReload} from 'react-icons/ai'
import {subdivision} from "../../utils/sibdivision";
import Clock from "../../components/Clock/Clock";

const Catalog = () => {
    const location = useLocation()
    const {i18n} = useTranslation()
    const [limit,setLimit] = useState(12)
    const [categoryData,setCategoryData] = useState('')
    const {data = []} = useGetProductsByCategoryQuery({categoryData,limit})
    const nav = useNavigate()
    return (
        <section className={'MCatalog'}>
            <div className="container">
                {/*<Clock/>*/}
                <div className="MCatalog__top">
                    <p onClick={() => nav('/')} className="MCatalog__top__home">
                        {
                            i18n.language === 'ru' ? 'Главная' : 'Home'
                        }
                    </p>
                    <p  onClick={() => setCategoryData('')} className="MCatalog__top__page">
                        {
                            i18n.language === 'ru' ? '/ Католог' : '/ Catalog'
                        }
                    </p>
                    <p  onClick={() => setCategoryData('')} className="MCatalog__top__page">
                        {
                            i18n.language === 'ru' ? categoryData &&  '/' + subdivision.find(item => item.category === categoryData).categoryRu : categoryData &&  '/' + subdivision.find(item => item.category === categoryData).category
                        }
                    </p>
                </div>
                <Title title={i18n.language === 'ru' ? 'Каталог' : "Catalog"}/>
                <div className="MCatalog__list">
                    {
                        category.map(item => (
                            <li style={{background: categoryData === item.textEN ? '#F05A00' : ''}} onClick={() => setCategoryData(item.textEN)} key={item.id} className={'MCatalog__line'}>
                                {
                                    i18n.language === 'ru' ? item.textRu : item.textEN
                                }
                            </li>
                        ))
                    }
                </div>
                <div className="MCatalog__block">
                    {data.map(item => (
                        <div key={item.id} className={'MCatalog__block__card'}>
                            <div className="MCatalog__block__card__cont">
                                <img src={item.bg} alt="" className="MCatalog__block__card__img"/>
                            </div>
                            <div onClick={() => nav(`/catalog/${item.subdivisionEn}`)} className="MCatalog__block__card__subdivision">
                                {i18n.language === 'ru' ? item.subdivisionRu : item.subdivisionEn}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="MCatalog__end">
                    {
                        data.length >= 12 &&
                        <button  onClick={() => setLimit(prev => prev + 12)} className="MCatalog__end__btn">
                            <AiOutlineReload style={{color: '#F05A00',fontSize:'20px'}}/>
                            {
                                i18n.language === 'ru' ? 'Показать еще' : 'Show more'
                            }
                        </button>
                    }
                </div>

            </div>
        </section>
    );
};

export default Catalog;