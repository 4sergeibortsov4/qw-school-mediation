import {useCallback, useState, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isWorker, setIsWorker] = useState(null)
    const [isverified, setIsVerified] = useState(null)
    const [email, setEmail] = useState(null)
    const [fullname, setFullName] = useState(null)

    const login = useCallback((jwtToken, userId, isWorker, isverified, email, fullname) => {
        setToken(jwtToken)
        setUserId(userId)
        setIsWorker(isWorker)
        setIsVerified(isverified)
        setEmail(email)
        setFullName(fullname)

        localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: userId, isWorker: isWorker, isverified: isverified, email: email, fullname: fullname}))
    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setIsWorker(null)
        setIsVerified(null)
        setEmail(null)
        setFullName(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.token){
            login(data.token, data.userId, data.isWorker, data.isverified, data.email, data.fullname)
        }
    }, [login])

    return {login, logout, token, userId, isWorker, isverified, email, fullname}
}