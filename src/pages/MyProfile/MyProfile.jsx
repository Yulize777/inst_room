import React, {useEffect} from 'react';
import {useGetUsersQuery} from "../../store/reducers/users";
import {useNavigate} from "react-router-dom";

const MyProfile = () => {
    const {data = []} = useGetUsersQuery()
    const nav = useNavigate()
    useEffect(() => {
        if (!data.length){
            return nav('/register')
        }
    }, [])
    return (
        <section>
        </section>
    );
};

export default MyProfile;