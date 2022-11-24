import React, {useState, useEffect, useContext} from "react"
import {useHttp} from '../../hooks/http.hook'
import { useMessage } from "../../hooks/message.hook"
import { AuthContext } from "../../context/AuthContext"

export const VerPage = () => {
    const message = useMessage()
    const {loading, error, request, clear_error} = useHttp()
    const auth = useContext(AuthContext)

    useEffect(() => {
        message(error)
        clear_error()
    }, [error, message, clear_error])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const [form, setForm] = useState({ fullname: '', password: ''})

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async() => {
        try {
            const data = await request('https://mediation-service.herokuapp.com/api/user/ver', 'POST', {...form}, {Authorization: 'Bearer ' + auth.token})
            message(data.message)
        } catch (error) {
            message(error.message)
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="center">Служба Медиации - Верификация</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Верификация</span>
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
                        </div>
                    </div>
                    <div className="card-action">
                        <button onClick={registerHandler} disabled={loading} className="btn yellow darken-4" style={{marginRight: 10}}>Верифицировать</button>
                        <a href="/main" onClick={registerHandler} disabled={loading} className="btn pink darken-1" style={{marginRight: 10}}>Вернуться на главную</a>
                    </div>
                </div>
            </div>
        </div>

    )
}