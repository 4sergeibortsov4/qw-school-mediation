import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { AuthPage } from "./pages/AuthPage/AuthPage"
import { CenterForAppeals } from "./pages/CenterForAppeals/CenterForAppeals"
import { CenterForAppealsW } from "./pages/CenterForAppeals/CenterForAppealsW"
import { CreateAppeal } from "./pages/CreateAppeal/CreateAppeal"
import { MainPage } from "./pages/MainPage/MainPage"
import { MainPageW } from "./pages/MainPageW/MainPageW"
import { MainVerifyPage } from "./pages/MainVerifyPage/MainVerifyPage"
import { RegPage } from "./pages/RegPage/RegPage"
import { AnswerPage } from "./pages/AnswerAppealPage/AnswerPage"
import { VerPage } from "./pages/VerPage/VerPage"

export const useRoutes = (isAuth, isWorker, isverified, email, fullname) => {
    if(isAuth && !isverified ){
        return (
            <Routes>
                <Route path="/" element={<Navigate replace to="/main" />} />
                <Route path="/main" element={<MainPage />}/>
                <Route path="/appeals" element={<Navigate replace to="/main" />}/>
                <Route path="/create-appeal" element={<Navigate replace to="/main" />}/>
                <Route path="/veruser" element={<Navigate replace to="/main" />}/>
                <Route exact path="/reg" element={<RegPage/>}/>
            </Routes>
        )
    }

    if(isAuth && isverified && !isWorker){
        return (
            <Routes>
                <Route path="/" element={<Navigate replace to="/mainv" />} />
                <Route path="/main" element={<Navigate replace to="/mainv" />} />
                <Route path="/appeals" element={<CenterForAppeals/>}/>
                <Route path="/create-appeal" element={<CreateAppeal/>}/>
                <Route path="/mainv" element={<MainVerifyPage/>}/>
                <Route path="/veruser" element={<Navigate replace to="/mainv" />}/>
                <Route exact path="/reg" element={<RegPage/>}/>
            </Routes> 
        )
    }
    
    if(isAuth && isWorker && isverified){
        return (
            <Routes>
                <Route path="/" element={<Navigate replace to="/mainw" />} />
                <Route path="/main" element={<Navigate replace to="/mainw" />} />
                <Route path="/appealsw" element={<CenterForAppealsW />}/>
                <Route path="/appeals" element={<Navigate replace to="/appealsw" />}/>
                <Route path="/mainw" element={<MainPageW />}/>
                <Route path="/answer/:id" element={<AnswerPage id=":id"/>}/>
                <Route path="/create-appeal" element={<Navigate replace to="/mainw" />}/>
                <Route path="/veruser" element={<VerPage/>}/>
                <Route exact path="/reg" element={<RegPage/>}/>
            </Routes> 
        )
    }
    
    if(!isAuth && !isWorker && !isverified){
        return (
            <Routes>
                <Route exact path="/" element={<AuthPage/>}/>
                <Route exact path="/reg" element={<RegPage/>}/>
            </Routes>
        )
    }
}