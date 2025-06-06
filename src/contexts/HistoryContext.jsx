import axios from "axios";
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
                const MLAPIEndpoint = import.meta.env.VITE_ML_API_ENDPOINT

                const { data } = await axios.get(`${MLAPIEndpoint}/api/histories`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                setHistories(data.data.histories)
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