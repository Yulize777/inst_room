import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {BiWorld} from "react-icons/bi";

const SwitchLang = () => {
    const [switcher,setSwitcher] = useState(false)
    const {i18n} = useTranslation()
    const changesLang = lang => {
         i18n.changeLanguage(lang)
    }

    return (
        <>
            <li style={{background: switcher ? '#FC573B' : ''}} onClick={() => setSwitcher(prev => !prev)} className="header__cube">
                <BiWorld/>
            </li>
            <div style={{display: switcher ? 'flex' : 'none'}} className="switchLang">
                <button  onClick={() => {
                    changesLang('ru')
                }} className={`switchLang__lang__cont ${i18n.language === 'ru' ? 'active' : ''}`}>
                    <p className="switch__lang">Russian</p>
                </button>
                <button onClick={() => {
                    changesLang('en')
                }} className={`switchLang__lang__cont ${i18n.language === 'en' ? 'active' : ''}`}>
                    <p className="switch__lang">English</p>
                </button>
            </div>
        </>

    );
};

export default SwitchLang;