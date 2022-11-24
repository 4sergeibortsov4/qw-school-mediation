import React, { useContext, useEffect, useState} from "react"
import { AuthContext } from "../../context/AuthContext"
import {useHttp} from '../../hooks/http.hook'
import { useMessage } from "../../hooks/message.hook"

export const AnswerPage = (id_user) => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clear_error} = useHttp()
    const id = window.location.href.toString().split('/')[4]
    const [form, setForm] = useState({answer_worker: ' '})

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const answerAppealHandler = async() => {
        try {
            const data = await request("https://mediation-service.herokuapp.com/api/appeals/answer", 'POST', {...form}, {Authorization: 'Bearer ' + auth.token, id_user: id})
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
                <h1 className="center">Служба Медиации - Ответ</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Описание ответа</span>
                        <div>
                            <div className="input-field white-text white">
                                <textarea 
                                placeholder="Ответ на обращение" 
                                id="answer_worker" 
                                type="text" 
                                name="answer_worker"
                                className="white-input"
                                style={{width:"890px", height:"500px", resize:"none"}}
                                onChange={changeHandler} />
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button onClick={answerAppealHandler} disabled={loading} className="btn yellow darken-4" style={{marginRight: 10}}>Отправить ответ</button>
                        <a href="/appeals" disabled={loading} style={{marginRight: 305}} className="btn grey lighten-1 black-text">Вернуться</a>
                    </div>
                </div>
            </div>
        </div>
    )
}