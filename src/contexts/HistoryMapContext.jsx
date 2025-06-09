import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const HistoryMapContext = createContext()

export default function HistoryMapProvider({ children }){
    const [historiesMap, setHistoriesMap] = useState(null)

    useEffect(() => {
        const getHistoriesMap = async() => {
            try {
                const MLAPIEndpoint = import.meta.env.VITE_ML_API_ENDPOINT

                const { data } = await axios.get(`${MLAPIEndpoint}/api/histories/map`)

                setHistoriesMap(data.data.histories)
            } catch (error){
                console.log(error)
            }         
        }

        getHistoriesMap()
    }, [])

    return (
        <HistoryMapContext.Provider value={{ historiesMap, setHistoriesMap }}>
            { children }
        </HistoryMapContext.Provider>
    )
}