import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Autoplay} from 'swiper'
import {brands} from "../../../utils/brands";
import {useTranslation} from "react-i18next";
const OurBrands = () => {
    const {t} = useTranslation()
    return (
        <section className={'brands'}>
            <div className="container">
                <h2 className="brands__title">
                    {t('home.brands')}
                </h2>
                <Swiper
                    slidesPerView={6}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                        delay: 2000
                    }}
                    speed={2000}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {
                        brands.map(item => (
                            <SwiperSlide key={item.id} className={'brands__cont'}>
                                <img src={item.img} alt="" className="brands__cont__img"/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default OurBrands;