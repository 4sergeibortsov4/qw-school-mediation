import React from "react"
import { Link } from "react-router-dom"

export const AppealsListW = ( {appeals}) => {
    if(!appeals) {
        return <p className="center">У вас нет обращений</p>
    }
    
    return (
        <table className="centered">
            <thead className="centered">
                <tr>
                    <th className="center">Текст обращения</th>
                    <th className="center">Дата создания</th>
                    <th className="center">Ответ медиатора</th>
                    <th className="center">Дата ответа</th>
                </tr>
            </thead>
            <tbody className="centered">
                { 
                appeals.map((appeals) => {
                    return (
                        <tr key={appeals._id}>
                            <th title={appeals.Text_appeal} className="center">{appeals.Text_appeal.slice(0, 50)}</th>
                            <th className="center">{appeals.date_create.slice(0, 10)}</th>
                            <th title={appeals.answer_worker} className="center">{appeals.answer_worker.slice(0, 20)}</th>
                            <th className="center">{appeals.answer_date}</th>
                            <th className="center">
                                {
                                    <Link to={`/answer/${appeals.id_user}`}>Отправить Ответ</Link>
                                }    
                            </th>
                        </tr>
                    )
                }) }
            </tbody> 
        </table>
    )
}