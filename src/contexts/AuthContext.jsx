import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export default function AuthProvider({ children }){
    const [isLogin, setIsLogin] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const auth = async() => {
            const token = localStorage.getItem("token")
    
            if (!token){
                setIsLogin(false)
                setUser(null)
    
                return
            }
    
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
    
                const { data } = await axios.get(`${APIEndpoint}/users`, {
                    headers: {
                        "Authorization" : "Bearer " + token
                    }
                })
    
                setIsLogin(true)
                setUser(data.data.user)
            } catch (error){
                localStorage.removeItem("token")
    
                setIsLogin(false)
                setUser(null)
            }         
        }

        auth()
    }, [])

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}