import React from 'react';
import Start from "./Start/Start";
import Catalog from "./Catalog/Catalog";
import OurBrands from "./OurBrands/OurBrands";
import AboutUs from "./AboutUs/AboutUs";
import News from "./News/News";

const Home = () => {
    return (
        <main className={'home'}>
            <Start/>
            <Catalog/>
            <OurBrands/>
            <AboutUs/>
            <News/>
        </main>
    );
};

export default Home;