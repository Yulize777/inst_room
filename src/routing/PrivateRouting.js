import React from 'react';
import {Route, Routes} from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";

const PrivateRouting = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={''} element={<Home/>}/>
            </Route>
            <Route path={'*'} element={<NotFound/>}/>
        </Routes>
    );
};

export default PrivateRouting;