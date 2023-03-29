import React from 'react';
import {RiArrowRightSLine} from "react-icons/ri";
import {useTranslation} from "react-i18next";

const Manufactor = () => {
    const {i18n} = useTranslation()
    return (
        <li className="category__navigation__end__line">
            <div className={'category__navigation__end__line__top'}>
                {i18n.language === 'ru' ? 'Страна производитель' : 'Manufacturer country'}
                <RiArrowRightSLine style={{fontSize: '32px'}}/>
            </div>
        </li>
    );
};

export default Manufactor;