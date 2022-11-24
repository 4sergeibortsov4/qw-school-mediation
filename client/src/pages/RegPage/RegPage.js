import React, {useState, useEffect} from "react"
import {useHttp} from '../../hooks/http.hook'
import { useMessage } from "../../hooks/message.hook"

export const RegPage = () => {
    const message = useMessage()
    const {loading, error, request, clear_error} = useHttp()

    useEffect(() => {
        message(error)
        clear_error()
    }, [error, message, clear_error])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const [form, setForm] = useState({ fullname: '', email: '', password: '', isverified: false })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async() => {
        try {
            const data = await request('https://mediation-service.herokuapp.com/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (error) {
            message(error.message)
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="center">Служба Медиации - Регистрация</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Регистрация</span>
                        <div>
                            <div className="input-field white-text">
                                <input 
                                placeholder="Введите ФИО (полностью)" 
                                id="fullname" 
                                type="text" 
                                name="fullname"
                                className="white-input"
                                onChange={changeHandler} />
                                <label htmlFor="fullname">ФИО</label>
                            </div>

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
                        <button onClick={registerHandler} disabled={loading} className="btn yellow darken-4" style={{marginRight: 10}}>Зарегистрироваться</button>
                        <a href="/" onClick={registerHandler} disabled={loading} className="btn pink darken-1" style={{marginRight: 10}}>Вернуться к авторизации</a>
                    </div>
                </div>
            </div>
        </div>

    )
}