import React from "react"


export const AppealsList = ({appeals}) => {
    if(!appeals) {
        return <p className="center">У вас нет обращений</p>
    }
    console.log(appeals)

    return (
        <table className="centered">
            <thead className="centered">
                <tr>
                    <th className="center">Содержание обращения</th>
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
                            <th title={appeals.Text_appeal} className="center">{appeals.Text_appeal}</th>
                            <th className="center">{appeals.date_create.slice(0, 10)}</th>  
                            <th title={appeals.answer_worker} className="center green-text">{appeals.answer_worker}</th>
                            <th className="center green-text">{appeals.answer_date}</th>
                        </tr>
                    )
                }) 
                }
            </tbody> 

        </table>
    )
}