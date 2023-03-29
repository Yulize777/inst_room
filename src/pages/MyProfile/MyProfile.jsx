import React, {useState} from 'react';
import {useGetUsersQuery} from "../../store/reducers/users";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useGetOrderQuery} from "../../store/reducers/orders";
import {useTranslation} from "react-i18next";
import Title from "../../components/Title/Title";
import Order from "../../components/Order/Order";
// const MyProfileWrapper = () => {
//     const { data = [] } = useGetUsersQuery();
//
//     return <MyProfile data={data} />;
// };
const MyProfile = () => {
    const {i18n} = useTranslation()
    const nav = useNavigate()

    // const nav = useNavigate();
    //
    // useEffect(() => {
    //     if (!data || !data[0] || !data[0].email) {
    //         nav('/register');
    //     }
    // }, [data, nav]);
    //
    const {data = []} = useGetOrderQuery()
    return (
        <section className={'myProfile'}>
            <div className="container">
                <div className="category__top">
                    <p onClick={() => nav('/')} className="category__top__pages">{i18n.language === 'ru' ? 'Главная /' : 'Home /'}</p>
                    <p  className="category__top__pages">{i18n.language === 'ru' ? 'Личный кабинет'  : 'My profile' }</p>
                </div>
                <Title title={i18n.language === 'ru' ? 'Личный кабинет'  : 'My profile' }/>
                <div className="myProfile__row">
                    <div className="myProfile__sidebar">
                        <li className="myProfile__sidebar__line">
                            История заказов
                        </li>
                    </div>
                    <div className="myProfile__orders">
                        {
                           data.length && data.map(item => (
                               <Order key={item.id} item={item}/>
                            ))
                        }

                    </div>
                </div>
            </div>
        </section>
    );
};


export default MyProfile;