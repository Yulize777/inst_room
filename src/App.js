import React from 'react';
import {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import Comparison from "./pages/Comparison/Comparison";
import MyProfile from "./pages/MyProfile/MyProfile";
import Admin from "./pages/Admin/Admin";
import i18n from "./utils/i18n";
import './style.scss'
import Catalog from "./pages/Catalog/Catalog";
import Category from "./pages/Category/Category";
import Product from "./pages/Product/Product";
import Novelty from "./pages/Novelty/Novelty";
import Sales from "./pages/Sales/Sales";
import Order from "./pages/Order/Order";
const App = () => {

    return (
        <Suspense fallback={'...Loading'}>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={''} element={<Home/>}/>
                    <Route path={'catalog'} element={<Catalog/>}/>
                    <Route path={'catalog/:category'} element={<Category/>}/>
                    <Route path={'catalog/:category/:id'} element={<Product/>}/>
                    <Route path={'cart'} element={<Cart/>}/>
                    <Route path={'favorites'} element={<Favorites/>}/>
                    <Route path={'comparison'} element={<Comparison/>}/>
                    <Route path={'myProfile'} element={<MyProfile/>}/>
                    <Route path={'admin'} element={<Admin/>}/>
                    <Route path={'novelty'} element={<Novelty/>}/>
                    <Route path={'sales'} element={<Sales/>}/>
                    <Route path={'order'} element={<Order/>}/>
                </Route>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
        </Suspense>
    );
};

export default App;