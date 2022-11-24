import React, { useContext, useEffect} from "react"
import {NavLink, useNavigate} from 'react-router-dom'
import {useHttp} from '../../hooks/http.hook'
import { AuthContext } from "../../context/AuthContext"
import { useMessage } from "../../hooks/message.hook"

export const MainVerifyPage = () => {
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

    return(
        <div>
        <nav>
            <div className='nav-wrapper blue darken-1' style={{padding: '0 2rem'}}>
                <span>Служба медиации (Пользователь верифицирован)</span>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><NavLink to="/appeals">Обратиться к медиатору</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Выйти из профиля</a></li>
                    </ul>
            </div>
        </nav>
        <div>
            <div className="card-panel blue lighten-2">
                <h2 className="center white-text">Добро пожаловать в службу школьной медиации!</h2>
            </div>
            {
                
                <table className="card-panel blue lighten-2 centered">
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
        <div className="card-panel deep-purple lighten-3">
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