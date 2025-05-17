import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const HistoryContext = createContext()

export default function HistoryProvider({ children }){
    const { isLogin } = useContext(AuthContext)
    const [histories, setHistories] = useState(null)

    useEffect(() => {
        const getHistories = async() => {
            const token = localStorage.getItem("token")
    
            if (!token){
    
                return
            }
    
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            } catch (error){
                console.log(error)
            }         
        }

        getHistories()
    }, [isLogin])

    return (
        <HistoryContext.Provider value={{ histories, setHistories }}>
            { children }
        </HistoryContext.Provider>
    )
}