import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const ThreadContext = createContext()

export default function ThreadProvider({ children }){
    const { isLogin } = useContext(AuthContext)
    const [threads, setThreads] = useState(null)

    useEffect(() => {
        const getHistories = async() => {
            const token = localStorage.getItem("token")
    
            if (!token){
                return
            }
    
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT

                const { data } = await axios.get(`${APIEndpoint}/threads`)

                setThreads(data.data.threads)
            } catch (error){
                console.log(error)
                setThreads(null)
            }         
        }

        getHistories()
    }, [isLogin])

    return (
        <ThreadContext.Provider value={{ threads, setThreads }}>
            { children }
        </ThreadContext.Provider>
    )
}