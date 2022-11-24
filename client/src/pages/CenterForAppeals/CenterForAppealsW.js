import React, { useCallback, useContext, useEffect, useState} from "react"
import {NavLink, useNavigate} from 'react-router-dom'
import {useHttp} from '../../hooks/http.hook'
import { AuthContext } from "../../context/AuthContext"
import { useMessage } from "../../hooks/message.hook"
import { AppealsListW } from "../../components/AppealListW"

export const CenterForAppealsW = () => {
    const message = useMessage()
    const { error, request, clear_error, loading} = useHttp()
    const history = useNavigate()
    const auth = useContext(AuthContext)
    const [appeals, setAppeals] = useState(null)

    const getAppeals = useCallback(async() => {
        try {
            const appeals = await request('https://mediation-service.herokuapp.com/api/appeals/allw', 'POST', {userId: auth.userId}, {Authorization: 'Bearer ' + auth.token})
            setAppeals(appeals)
        } catch (error) {
            message(error.message)
        }
    }, [request, message, auth])

    useEffect(() => {
        message(error)
        clear_error()
    }, [error, message, clear_error])

    useEffect(() => {
        window.M.updateTextFields()
        getAppeals()
    }, [getAppeals])


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
                <span>Служба медиации</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/main">На главную</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Выйти из профиля</a></li>
                    </ul>
                </div>
            </nav>
            {
                <p>{ !loading && <AppealsListW appeals={appeals}/> }</p>
            }
        </div>
    )
}