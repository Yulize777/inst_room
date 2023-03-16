import {AiOutlineHeart} from "react-icons/ai";
import React from "react";
import {IoMdStats} from "react-icons/io";
import {CgProfile} from "react-icons/cg";
import {FiShoppingCart} from "react-icons/fi";
import {MdAdminPanelSettings} from "react-icons/md";
import {useGetUsersQuery} from "../../../../store/reducers/users";
const {data = []} = useGetUsersQuery
export const icons = [
    {
        id: 1,
        pageName: 'favorites',
        icon:  <AiOutlineHeart/>,
        reference: 'favorites'
    },
    {
        id: 2,
        pageName: 'comparison',
        icon:  <IoMdStats/>,
        reference: 'comparison'
    },
    {
        id: 3,
        pageName: 'myProfile',
        icon: <CgProfile/>,
        reference: 'myProfile'
    },
    {
        id: 4,
        pageName: 'cart',
        icon: <FiShoppingCart/>,
        reference: 'cart'
    },
]