import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const HistoryMapContext = createContext()

export default function HistoryMapProvider({ children }){
    const { isLogin } = useContext(AuthContext)
    const [historiesMap, setHistoriesMap] = useState(null)

    useEffect(() => {
        const getHistoriesMap = async() => {
            const token = localStorage.getItem("token")
    
            if (!token){
    
                return
            }
    
            try {
                const MLAPIEndpoint = import.meta.env.VITE_ML_API_ENDPOINT

                const { data } = await axios.get(`${MLAPIEndpoint}/api/histories/map`)

                setHistoriesMap(data.data.histories)
            } catch (error){
                console.log(error)
            }         
        }

        getHistoriesMap()
    }, [isLogin])

    return (
        <HistoryMapContext.Provider value={{ historiesMap, setHistoriesMap }}>
            { children }
        </HistoryMapContext.Provider>
    )
}