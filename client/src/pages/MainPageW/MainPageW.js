import React, { useContext, useEffect} from "react"
import {NavLink, useNavigate} from 'react-router-dom'
import { useMessage } from "../../hooks/message.hook"
import {AuthContext} from '../../context/AuthContext'
import {useHttp} from '../../hooks/http.hook'

export const MainPageW = () => {
    const message = useMessage()
    const { error, clear_error, loading} = useHttp()
    const history = useNavigate()
    const auth = useContext(AuthContext)
    
    useEffect(() => {
        message(error)
        clear_error()
    }, [error, message, clear_error])

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history('/')
    }

    if(loading) {
        message('Идёт загрузка. Подождите...')
    }

    return (
    <div>
        <nav>
            <div className='nav-wrapper blue darken-1' style={{padding: '0 2rem'}}>
                <span>Служба медиации (Страница медиатора)</span>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><NavLink to="/appealsw">Журнал обращений</NavLink></li>
                        <li><NavLink to="/veruser">Верифицировать пользователя</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Выйти из профиля</a></li>
                    </ul>
            </div>
        </nav>
        <div className="cyan lighten-1">
            <h2 className="center text blue lighten-2">Добро пожаловать в службу школьной медиации!</h2>
            {
                
                <table>
                    <thead>
                        <tr>
                            <th className="center">Ваш персональный ID</th>
                            <th className="center">Ваш адрес электронной почты</th>
                            <th className="center">Ф.И.О</th>
                            <br/>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th className="center">{auth.userId}</th>
                            <th className="center">{auth.email}</th>
                            <th className="center">{auth.fullname}</th>
                            <br/>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
        <div className="deep-purple lighten-3">
            <h3 className="center text">Новости сайта</h3>
            {
                // новости сайта
                <div className="center">
                    
                </div>
            }
        </div>
    </div>
    )    
}