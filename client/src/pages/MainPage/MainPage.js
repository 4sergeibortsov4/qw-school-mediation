import React, { useContext, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import { useMessage } from "../../hooks/message.hook"
import {AuthContext} from '../../context/AuthContext'
import {useHttp} from '../../hooks/http.hook'

export const MainPage = () => {
    const message = useMessage()
    const { error,  clear_error, loading} = useHttp()
    const history = useNavigate()
    const auth = useContext(AuthContext)
    console.log(auth.fullname)

    
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
                <span>Служба медиации - Главная страница</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
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
                            <th>Ваш персональный ID</th>
                            <th>Ваш адрес электронной почты</th>
                            <th>Ф.И.О</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>{auth.userId}</th>
                            <th>{auth.email}</th>
                            <th>{auth.fullname}</th>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
        <div className="deep-purple lighten-3">
            <h3 className="center text">Новости сайта</h3>
            {
                // новости сайта
            }
        </div>
    </div>
    )    
}