import React, { useContext, useEffect, useState} from "react"
import { AuthContext } from "../../context/AuthContext"
import {useHttp} from '../../hooks/http.hook'
import { useMessage } from "../../hooks/message.hook"

export const CreateAppeal = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clear_error} = useHttp()
    const [form, setForm] = useState({Text_appeal: ' '})

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const createAppealHandler = async() => {
        try {
            const data = await request('https://mediation-service.herokuapp.com/api/appeals/create', 'POST', {...form, userId: auth.userId})
            message(data.message)
        } catch (error) {
            message(error.message)
        }
    }

    useEffect(() =>{
        message(error)
        clear_error()
    }, [error, message, clear_error])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])


    if(loading){
        message('Идёт загрузка. Подождите...')
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="center">Служба Медиации - Создание обращения</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Описание обращения</span>
                        <div>
                            <div className="input-field white-text white">
                                <textarea 
                                placeholder="Опишите проблему в этом поле" 
                                id="Text_appeal" 
                                type="text" 
                                name="Text_appeal"
                                className="white-input"
                                style={{width:"890px", height:"500px", resize:"none"}}
                                onChange={changeHandler} />
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button onClick={createAppealHandler} disabled={loading} className="btn yellow darken-4" style={{marginRight: 10}}>Отправить обращение</button>
                        <a href="/appeals" disabled={loading} style={{marginRight: 305}} className="btn grey lighten-1 black-text">Вернуться</a>
                    </div>
                </div>
            </div>
        </div>
    )
}