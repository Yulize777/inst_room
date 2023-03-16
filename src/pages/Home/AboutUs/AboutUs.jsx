import React from 'react';
import {useTranslation} from "react-i18next";

const AboutUs = () => {
    const {t} = useTranslation()
    return (
        <section className={'us'}>
            <div className="container">
                <div className="us__row">
                    <div className="us__left"></div>
                    <div className="us__right">
                        <h2 className="us__right__title">
                            {t('home.aboutUs.title')}
                        </h2>
                        <p className="us__right__desc">
                            {t('home.aboutUs.desc')}
                        </p>
                        <button className="us__right__btn">
                            {t('home.aboutUs.btn')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;