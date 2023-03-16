import React from 'react';
import {useForm} from "react-hook-form";
import {useAddUserMutation, useGetUsersQuery} from "../../store/reducers/users";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const nav = useNavigate()
    const {data = []} = useGetUsersQuery()
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: {errors}
    } = useForm({mode:"onBlur"})
    const [addUser] = useAddUserMutation()
    const onSubmit = async data => {
        const {confirm,...other} = data
        await addUser(other)
        reset()
        nav('/')
    }
    return (
        <section className={'register'}>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <h1 className="form__title">
                    РЕГИСТРАЦИЯ
                </h1>
                <label style={{color: errors.surname && '#FC573B'}} className="form__label">
                    Фамилия
                    <input style={{borderBottom: errors.surname && '1px solid #FC573B'}} {...register('surname',{
                        required: {
                            value: true,
                            message: 'enter your surname'
                        }
                    })} type="text" className="form__field"/>
                    <span className="form__error">{errors.surname && errors.surname.message}</span>
                </label>
                <label style={{color: errors.name && '#FC573B'}} className="form__label">
                    Имя
                    <input style={{borderBottom: errors.name && '1px solid #FC573B'}} {...register('name',{
                        required: {
                            value: true,
                            message: 'enter your name'
                        }
                    })} type="text" className="form__field"/>
                    <span className="form__error">{errors.name && errors.name.message}</span>
                </label>
                <label style={{color: errors.phoneNumber && '#FC573B'}} className="form__label">
                    Телефон
                    <input style={{borderBottom: errors.phoneNumber && '1px solid #FC573B'}} {...register('phoneNumber',{
                        required: {
                            value: true,
                            message: 'enter your phoneNumber'
                        }
                    })} type="tel" className="form__field"/>
                    <span className="form__error">{errors.phoneNumber && errors.phoneNumber.message}</span>
                </label>
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
                <label style={{color: errors.confirm && '#FC573B'}} className="form__label">
                    Подтвердите пароль
                    <input style={{borderBottom: errors.confirm && '1px solid #FC573B'}} {...register('confirm',{
                        required: {
                            value: true,
                            message: "confirm your password"
                        },
                        validate: (v) => {
                            if  (getValues('password') !== v){
                                return 'the password doesn\'t match'
                            }
                        }
                    })} type="password" className="form__field"/>
                    <span className="form__error">{errors.confirm && errors.confirm.message}</span>
                </label>
                <button style={{background: errors ? '#212526' : '#F05A00'}} type={'submit'} className="form__btn">
                    РЕГИСТРАЦИЯ
                </button>
               <p onClick={() => nav('/login')} style={{cursor: 'pointer',textAlign: 'center'}} >
                    У меня уже есть аккаунт
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

export default Register;