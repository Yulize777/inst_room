import React, {useState} from 'react';
import {RiArrowRightSLine} from "react-icons/ri";
import {useTranslation} from "react-i18next";

const Price = ({range,setRange}) => {
    const {i18n} = useTranslation()

    return (
        <>
            <li className="category__navigation__end__line">
                <div className={'category__navigation__end__line__top'}>
                    {i18n.language === 'ru' ? 'Цена' : 'Price'}
                    <RiArrowRightSLine style={{fontSize: '32px'}}/>
                </div>
            </li>
            <div className="category__price">
                <input onChange={(e) => setRange(e.target.value)} min={0} max={5000} step={1}  type="range" value={range} className={'category__price__range'}/>
                <div className="category__price__sums">
                    <div className="category__price__first">{range}</div>
                    <span style={{margin: '0 15px'}}><svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.6 1.52H0.32V0.0799999H13.6V1.52Z" fill="white"/>
</svg></span>
                    <div className="category__price__second">5000</div>
                </div>
            </div>
        </>

    );
};

export default Price;