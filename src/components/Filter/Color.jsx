import React from 'react';
import {useTranslation} from "react-i18next";
import {RiArrowRightSLine} from "react-icons/ri";

const Color = () => {
    const {i18n} = useTranslation()
    return (
        <li className="category__navigation__end__line">
            <div className={'category__navigation__end__line__top'}>
                {i18n.language === 'ru' ? 'Цвет' : 'color'}
                <RiArrowRightSLine style={{fontSize: '32px'}}/>
            </div>
        </li>
    );
};

export default Color;