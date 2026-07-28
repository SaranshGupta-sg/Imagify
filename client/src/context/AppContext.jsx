import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);

     const navigate = useNavigate()

     const value = {
        user, setUser
    }
    // const value = {
    //     user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage
    // }
   return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider 
