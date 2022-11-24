import React, {useContext, useEffect, useState} from "react"
import { AuthContext } from "../../context/AuthContext"
import {useHttp} from '../../hooks/http.hook'
import { useMessage } from "../../hooks/message.hook"

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clear_error} = useHttp()

    useEffect(() =>{
        message(error)
        clear_error()
    }, [error, message, clear_error])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const [form, setForm] = useState({ email: '', password: '' })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async() => {
        try {
            const data = await request("https://mediation-service.herokuapp.com/api/auth/login", "POST", {...form})
            auth.login(data.token, data.userId, data.isWorker, data.isverified, data.email, data.fullname)
        } catch (error) {
            message(error)
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="center">Служба Медиации - Авторизация</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field white-text">
                                <input 
                                placeholder="Введите адрес электронной почты" 
                                id="email" 
                                type="text" 
                                name="email"
                                className="white-input"
                                onChange={changeHandler} />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field white-text">
                                <input 
                                placeholder="Введите пароль" 
                                id="password" 
                                type="password" 
                                name="password"
                                className="white-input"
                                onChange={changeHandler} />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button onClick={loginHandler} disabled={loading} className="btn yellow darken-4" style={{marginRight: 10}}>Войти</button>
                        <a href="/reg" disabled={loading} style={{marginRight: 10}} className="btn green darken-2">Регистрация</a>
                    </div>
                </div>
            </div>
        </div>

    )
}