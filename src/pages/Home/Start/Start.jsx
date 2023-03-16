import React from 'react';
import {HiArrowNarrowRight} from 'react-icons/hi'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
const Start = () => {
    const {t} = useTranslation()
    const nav = useNavigate()
    return (
        <section className={'start'}>
            <div className="container">
                <div className="start__row">
                    <div className="start__fBlock">
                        <h2 className="start__fBlock__title">
                            {t('home.start.start__fBlock__title')}
                        </h2>
                        <button onClick={() => nav('/catalog')} className="start__fBlock__btn">
                            {t('home.start.start__fBlock__btn')}
                        </button>
                        <span className="start__fBlock__arrow">
                            <HiArrowNarrowRight/>
                        </span>
                    </div>
                    <div className="start__sBlock">
                        <h2 className="start__sBlock__title">
                            {t('home.start.start__sBlock__title')}
                        </h2>
                        <span className="start__fBlock__arrow">
                            <HiArrowNarrowRight/>
                        </span>
                    </div>
                    <div className="start__tBlock">
                        <div className="start__tBlock__cube">
                            <h2 className="start__sBlock__title">
                                {t('home.start.start__sBlock__title1')}
                            </h2>
                            <span className="start__fBlock__arrow">
                                 <HiArrowNarrowRight/>
                            </span>
                        </div>
                        <div className="start__tBlock__cube">
                            <h2 className="start__sBlock__title">
                                {t('home.start.start__sBlock__title2')}
                            </h2>
                            <span className="start__fBlock__arrow">
                                 <HiArrowNarrowRight/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Start;