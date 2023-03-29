import React from 'react';
import {useNavigate} from "react-router-dom";
import { useCheckUserMutation, useGetUsersQuery} from "../../store/reducers/users";
import {useForm} from "react-hook-form";

const Login = () => {
    const nav = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({mode:"onBlur"})
    const [checkUser] = useCheckUserMutation()
    const onSubmit = async data => {
        try {
            const {confirm,...other} = data
            await checkUser(other)
            reset()
            nav('/')
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <section className={'register'}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <h1 className="form__title">
                РЕГИСТРАЦИЯ
            </h1>
            <label style={{color: errors.email && '#FC573B'}} className="form__label">
                Электронная почта
                <input style={{borderBottom: errors.email && '1px solid #FC573B'}} {...register('email',{
                    required: {
                        value: true,
                        message: 'enter your email'
                    }
                })} type="email" className="form__field"/>
                <span className="form__error">{errors.email && errors.email.message}</span>
            </label>
            <label style={{color: errors.password && '#FC573B'}} className="form__label">
                Пароль
                <input style={{borderBottom: errors.password && '1px solid #FC573B'}} {...register('password',{
                    required: {
                        value: true,
                        message: 'make up  password'
                    }
                })} type="password" className="form__field"/>
                <span className="form__error">{errors.password && errors.password.message}</span>
            </label>
            <button style={{background: errors ? '#212526' : '#F05A00'}} type={'submit'} className="form__btn">
                ВХОД
            </button>
            <p onClick={() => nav('/login')} style={{cursor: 'pointer',textAlign: 'center'}} >
               ЗАРЕГИСТРИРОВАТЬСЯ
            </p>
            <span onClick={() => nav('/')} className={'form__close'}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6L6 18" stroke="#8A8A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6 6L18 18" stroke="#8A8A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                </span>
        </form>
        </section>
    );
};

export default Login;