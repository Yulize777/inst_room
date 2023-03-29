import React, {useState} from 'react';
import {AiOutlineInstagram} from 'react-icons/ai'
import {BiSearchAlt} from 'react-icons/bi'
import {RxHamburgerMenu} from 'react-icons/rx'
import {SlSocialVkontakte} from 'react-icons/sl'
import {FaFacebookF} from 'react-icons/fa'
import SwitchLang from "./switchLang/SwitchLang";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import {icons} from "./HeaderList/HeaderList";
import {useGetProductsBySearchQuery} from "../../../store/reducers/products";
import {MdAdminPanelSettings} from "react-icons/md";
import {categoryForMain} from "../../../utils/list";
import {RiArrowRightSLine} from "react-icons/ri";
const Header = () => {
    const [catalog,setCatalog] = useState(false)
    const [text,setText] = useState('')
    const [turnOn,setTurnOn] = useState(false)
    const catalogFunc = () => {
        setCatalog(prev => !prev)
        if (turnOn){
            return setTurnOn(false)
        }
    }
    const board = (text) => {
        setText(text)
        setTurnOn(prev => !prev)
    }
    const { t,i18n } = useTranslation()
    const location = useLocation()
    const nav = useNavigate()
    const [search,setSearch] = useState('')
     const {data = []} = useGetProductsBySearchQuery(search)

    return (
        <>

       <header className="header">
           <div className="container">
               <div className="header__nav">
                   <h1 className="header__logo" onClick={() => nav('/')}>
                       <svg width="90" height="56" viewBox="0 0 90 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <rect x="16" y="31" width="16" height="16" transform="rotate(90 16 31)" fill="#F05A00"/>
                           <path d="M32.16 36.2H29.28C28.192 36.2 27.36 36.496 26.784 37.088C26.208 37.664 25.92 38.528 25.92 39.68V47H22.56V39.68C22.56 38.048 23.072 36.784 24.096 35.888C25.136 34.976 26.624 34.52 28.56 34.52H32.16V36.2ZM40.0641 45.92C40.5761 45.92 41.0561 45.824 41.5041 45.632C41.9521 45.44 42.3441 45.144 42.6801 44.744C43.0161 44.328 43.2801 43.792 43.4721 43.136C43.6801 42.48 43.7841 41.688 43.7841 40.76C43.7841 39.832 43.6801 39.04 43.4721 38.384C43.2801 37.728 43.0161 37.2 42.6801 36.8C42.3441 36.384 41.9521 36.08 41.5041 35.888C41.0561 35.696 40.5761 35.6 40.0641 35.6C39.5521 35.6 39.0721 35.696 38.6241 35.888C38.1761 36.08 37.7841 36.384 37.4481 36.8C37.1121 37.2 36.8401 37.728 36.6321 38.384C36.4401 39.04 36.3441 39.832 36.3441 40.76C36.3441 41.688 36.4401 42.48 36.6321 43.136C36.8401 43.792 37.1121 44.328 37.4481 44.744C37.7841 45.144 38.1761 45.44 38.6241 45.632C39.0721 45.824 39.5521 45.92 40.0641 45.92ZM40.0641 34.04C41.1361 34.04 42.1201 34.192 43.0161 34.496C43.9281 34.784 44.7041 35.216 45.3441 35.792C45.9841 36.352 46.4801 37.056 46.8321 37.904C47.2001 38.736 47.3841 39.688 47.3841 40.76C47.3841 41.848 47.2001 42.808 46.8321 43.64C46.4801 44.472 45.9841 45.176 45.3441 45.752C44.7041 46.312 43.9281 46.736 43.0161 47.024C42.1201 47.328 41.1361 47.48 40.0641 47.48C38.9761 47.48 37.9841 47.328 37.0881 47.024C36.1921 46.736 35.4241 46.312 34.7841 45.752C34.1441 45.176 33.6401 44.472 33.2721 43.64C32.9201 42.808 32.7441 41.848 32.7441 40.76C32.7441 39.688 32.9201 38.736 33.2721 37.904C33.6401 37.056 34.1441 36.352 34.7841 35.792C35.4241 35.216 36.1921 34.784 37.0881 34.496C37.9841 34.192 38.9761 34.04 40.0641 34.04ZM56.8688 45.92C57.3808 45.92 57.8608 45.824 58.3088 45.632C58.7568 45.44 59.1488 45.144 59.4848 44.744C59.8208 44.328 60.0848 43.792 60.2768 43.136C60.4848 42.48 60.5887 41.688 60.5887 40.76C60.5887 39.832 60.4848 39.04 60.2768 38.384C60.0848 37.728 59.8208 37.2 59.4848 36.8C59.1488 36.384 58.7568 36.08 58.3088 35.888C57.8608 35.696 57.3808 35.6 56.8688 35.6C56.3568 35.6 55.8768 35.696 55.4288 35.888C54.9808 36.08 54.5888 36.384 54.2528 36.8C53.9168 37.2 53.6448 37.728 53.4368 38.384C53.2448 39.04 53.1488 39.832 53.1488 40.76C53.1488 41.688 53.2448 42.48 53.4368 43.136C53.6448 43.792 53.9168 44.328 54.2528 44.744C54.5888 45.144 54.9808 45.44 55.4288 45.632C55.8768 45.824 56.3568 45.92 56.8688 45.92ZM56.8688 34.04C57.9408 34.04 58.9248 34.192 59.8208 34.496C60.7328 34.784 61.5088 35.216 62.1488 35.792C62.7888 36.352 63.2848 37.056 63.6368 37.904C64.0048 38.736 64.1888 39.688 64.1888 40.76C64.1888 41.848 64.0048 42.808 63.6368 43.64C63.2848 44.472 62.7888 45.176 62.1488 45.752C61.5088 46.312 60.7328 46.736 59.8208 47.024C58.9248 47.328 57.9408 47.48 56.8688 47.48C55.7808 47.48 54.7888 47.328 53.8928 47.024C52.9968 46.736 52.2288 46.312 51.5888 45.752C50.9488 45.176 50.4448 44.472 50.0768 43.64C49.7248 42.808 49.5488 41.848 49.5488 40.76C49.5488 39.688 49.7248 38.736 50.0768 37.904C50.4448 37.056 50.9488 36.352 51.5888 35.792C52.2288 35.216 52.9968 34.784 53.8928 34.496C54.7888 34.192 55.7808 34.04 56.8688 34.04Z" fill="white"/>
                           <path d="M66.9534 34.52H79.4334C81.7214 34.52 83.4094 34.936 84.4974 35.768C85.6014 36.584 86.1534 37.808 86.1534 39.44V47H82.7934V39.44C82.7934 38.288 82.5054 37.464 81.9294 36.968C81.3534 36.456 80.5214 36.2 79.4334 36.2H78.2334V47H74.8734V36.2H70.3134V47H66.9534V34.52Z" fill="#F05A00"/>
                           <path d="M5.16 24H1.68V7.2H5.16V24Z" fill="#F05A00"/>
                           <path d="M21.7238 24H18.3638V16.44C18.3638 15.288 18.0758 14.464 17.4998 13.968C16.9238 13.456 16.0918 13.2 15.0038 13.2H11.8838V24H8.52375V11.52H15.0038C17.2918 11.52 18.9798 11.936 20.0677 12.768C21.1718 13.584 21.7238 14.808 21.7238 16.44V24ZM27.8334 14.16C27.8334 14.528 27.9934 14.864 28.3134 15.168C28.6494 15.472 29.2094 15.736 29.9934 15.96L33.7134 17.04C34.8654 17.376 35.7534 17.832 36.3774 18.408C37.0014 18.984 37.3134 19.728 37.3134 20.64C37.3134 21.216 37.1934 21.744 36.9534 22.224C36.7134 22.688 36.3214 23.088 35.7774 23.424C35.2334 23.76 34.5294 24.016 33.6654 24.192C32.8014 24.384 31.7374 24.48 30.4734 24.48C29.8174 24.48 29.1694 24.432 28.5294 24.336C27.9054 24.24 27.3054 24.112 26.7294 23.952C26.1694 23.776 25.6574 23.584 25.1934 23.376C24.7294 23.152 24.3294 22.92 23.9934 22.68L24.9534 21.24C25.6254 21.656 26.4094 22.024 27.3054 22.344C28.2174 22.648 29.2734 22.8 30.4734 22.8C31.6734 22.8 32.5134 22.64 32.9934 22.32C33.4734 22 33.7134 21.6 33.7134 21.12C33.7134 20.752 33.5454 20.424 33.2094 20.136C32.8734 19.832 32.2814 19.56 31.4334 19.32L27.7134 18.24C26.6894 17.936 25.8494 17.504 25.1934 16.944C24.5534 16.368 24.2334 15.6 24.2334 14.64C24.2334 14.128 24.3454 13.656 24.5694 13.224C24.8094 12.776 25.1774 12.392 25.6734 12.072C26.1694 11.752 26.8014 11.504 27.5694 11.328C28.3374 11.136 29.2654 11.04 30.3534 11.04C31.6814 11.04 32.8814 11.224 33.9534 11.592C35.0414 11.944 35.9214 12.36 36.5934 12.84L35.6334 14.28C34.9774 13.864 34.2334 13.504 33.4014 13.2C32.5694 12.88 31.5534 12.72 30.3534 12.72C29.5054 12.72 28.8734 12.856 28.4574 13.128C28.0414 13.4 27.8334 13.744 27.8334 14.16ZM40.3303 13.2H38.0503V11.52H40.3303V7.68H43.6903V11.52H47.4103V13.2H43.6903V19.44C43.6903 20.048 43.7543 20.568 43.8823 21C44.0263 21.416 44.2103 21.76 44.4343 22.032C44.6743 22.288 44.9463 22.48 45.2503 22.608C45.5543 22.736 45.8743 22.8 46.2103 22.8C46.6903 22.8 47.1543 22.728 47.6023 22.584C48.0503 22.424 48.4263 22.256 48.7303 22.08L49.4503 23.64C48.9703 23.88 48.4183 24.08 47.7943 24.24C47.1863 24.4 46.5783 24.48 45.9703 24.48C44.1623 24.48 42.7703 24.032 41.7943 23.136C40.8183 22.24 40.3303 21.008 40.3303 19.44V13.2Z" fill="white"/>
                       </svg>

                   </h1>
                   <p className="header__jobTime">
                       {t('header.jobTime')}
                   </p>
                   <div className="header__phoneCont">
                       <p className="header__phone">+7 495 120-32-14</p>
                       <p className="header__phoneOrder">{t('header.phoneOrder')}</p>
                   </div>
                   <ul className="header__list">
                       {
                           icons.map(item => (
                               <li key={item.id} onClick={() => nav(`${item.reference}`)} className={`header__cube ${location.pathname === `/${item.pageName}` ? 'active' : ''}`}>
                                   {
                                       item.pageName === 'favorites' ? <span className="header__circle">{data.filter(item => item.favorite).length}</span> : item.pageName === 'cart' ? <span className="header__circle">{data.filter(item => item.cart).length}</span> : item.pageName === 'comparison' ? <span className="header__circle">{data.filter(item => item.comparison).length}</span> : ''
                                   }

                                   {
                                       item.icon
                                   }
                               </li>
                           ))
                       }
                       {
                           data.length  &&  <li onClick={() => nav(`/admin`)} className={`header__cube ${location.pathname === `/admin` ? 'active' : ''}`}>
                               <MdAdminPanelSettings/>
                           </li>
                       }
                       <SwitchLang/>
                   </ul>
                   <div className="header__result">
                       <p className="header__sum">{t('header.sum')}</p>
                       <p className="header__currency">{data.filter(item => item.cart)
                           .reduce((acc,rec) => (
                               acc + rec.price * rec.count
                           ),0)} ₽</p>
                   </div>
               </div>
           </div>
           <div className="header__pages">
               <div className="container">
                   <div className="header__under">
                       <div style={{background: catalog ? '#F05A00' : ''}} onClick={() => catalogFunc()} className="header__catalog">
                           <RxHamburgerMenu/>
                           {t('header.catalog')}
                       </div>
                       <ul className="header__row">
                           <li className="header__line">
                               {t('header.company')}
                           </li>
                           <li onClick={() => nav('/sales')} className="header__line">
                               {t('header.sales')}
                           </li>
                           <li className="header__line">
                               {t('header.hits')}
                           </li>
                           <li onClick={() => nav('/novelty')} className="header__line">
                               {t('header.novelties')}
                           </li>
                       </ul>
                       <div style={{display: search ? "none" : 'flex'}} className="header__icons">
                           <span className="header__icon">
                               <AiOutlineInstagram/>
                           </span>
                           <span className="header__icon">
                               <SlSocialVkontakte/>
                           </span>
                           <span className="header__icon">
                               <FaFacebookF/>
                           </span>
                       </div>
                       <label style={{width: search ? '542px' : '310px'}} className="header__label">
                           <BiSearchAlt className={'header__search'}></BiSearchAlt>
                           <input style={{borderRadius: search && '5px 5px 0 0' }} value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('header.search')} type="text" className="header__field"/>
                       </label>
                   </div>
               </div>
           </div>
       </header>
            <div style={{display: search ? "flex" : 'none'}} className="header__search__block">
                {
                    data.map(item => (
                        <div key={item.id} className={'header__search__block__card'}>
                            <img src={`../../${item.bg}`} alt="" className="header__search__block__card__img"/>
                            <h3 className="header__search__block__card__title">
                                {
                                    i18n.language === 'ru' ? item.titleRu : item.titleEn
                                }
                            </h3>
                            <p className="header__search__block__card__price">
                                {
                                    item.price
                                }
                            </p>
                        </div>
                    ))
                }
            </div>

            <div style={{display: catalog ? 'flex' : 'none' ,position: 'absolute',rowGap: 'none',zIndex: '30',left: '110px'}} className="category__navigation">
            <div className="category__navigation__top">
                {
                    categoryForMain.map(item => (
                        <li style={{background: turnOn && text === item.textEN ? '#212526' : 'white',color:  turnOn && text === item.textEN ? 'white' : 'black'}} key={item.id} onClick={() => board(item.textEN)} className="category__navigation__line">
                            {
                                i18n.language === 'ru' ? item.textRu : item.textEN
                            }
                            <RiArrowRightSLine style={{fontSize: '32px'}}/>
                        </li>
                    ))
                }
            </div>
            </div>
            <div style={{display: turnOn ? 'flex' : "none",top:'185px',left: '420px'}} className="category__board">
                {
                    categoryForMain.filter(item => (
                        text === item.textEN && Array.isArray(item.subdivisions)
                    )).map(filteredItem => (
                        filteredItem.subdivisions.map(subdivision => (
                            <li onClick={() => nav(`/catalog`)} key={subdivision.id} className="category__board__line" style={{cursor: 'pointer'}}>
                                { i18n.language === 'ru' ?  subdivision.subdivisionRu : (subdivision.subdivision ? subdivision.subdivision : '')}
                            </li>
                        ))
                    ))
                }
            </div>
        </>
    );
};

export default Header;
