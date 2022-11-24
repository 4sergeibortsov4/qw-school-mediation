import React from 'react'
import 'materialize-css'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'



function App() {
  const {token, login, logout, userId, isWorker, isverified, email, fullname} = useAuth()
  const isAuthUser = !!token
  const routes = useRoutes(isAuthUser, isWorker, isverified, token, email, fullname)
  return ( 
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthUser, isWorker, isverified, email, fullname
    }}>
      <Router>
        {routes}
      </Router>
    </AuthContext.Provider>
  )
}

export default App
