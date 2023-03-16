import React from 'react';
import Card from "../../../components/Card/Card";
import {useTranslation} from "react-i18next";
const Catalog = () => {
    const {t} = useTranslation()

    return (
        <section className={'catalog'}>
            <div className="container">
                <h2 className="catalog__title">
                    {
                        t('home.catalog.title')
                    }
                </h2>
                <div className="catalog__block">
                   <Card/>
                </div>
            </div>
        </section>
    );
};

export default Catalog;