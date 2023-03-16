import React from 'react';
import img from '../../../assets/images/news1.png'
import {useTranslation} from "react-i18next";
const News = () => {
    const {t} = useTranslation()
    return (
        <section className={'news'}>
            <div className="container">
                <div className="news__row">
                    <div className="news__left">
                        <h2 className="news__left__title">
                            {t('home.news.news')}
                        </h2>
                        <p className="news__left__desc">
                            {t('home.news.desc')}
                        </p>
                        <button className="news__left__btn">
                            {t('home.news.btn')}
                        </button>
                    </div>
                    <div className="news__right">
                        <div className="news__right__cube">
                            <img src={img} alt="" className="news__right__img"/>
                            <h3 className="news__right__title">
                                {t('home.news.newsName')}
                            </h3>
                            <p className="news__right__desc">
                                {t('home.news.data')}
                            </p>
                        </div>
                        <div className="news__right__cube">
                            <img src={img} alt="" className="news__right__img"/>
                            <h3 className="news__right__title">
                                {t('home.news.newsName')}
                            </h3>
                            <p className="news__right__desc">
                                {t('home.news.data')}
                            </p>
                        </div> <div className="news__right__cube">
                        <img src={img} alt="" className="news__right__img"/>
                        <h3 className="news__right__title">
                            {t('home.news.newsName')}
                        </h3>
                        <p className="news__right__desc">
                            {t('home.news.data')}
                        </p>
                    </div>
                        <div className="news__right__cube">
                            <img src={img} alt="" className="news__right__img"/>
                            <h3 className="news__right__title">
                                {t('home.news.newsName')}
                            </h3>
                            <p className="news__right__desc">
                                {t('home.news.data')}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default News;