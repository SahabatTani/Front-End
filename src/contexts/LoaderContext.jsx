import { createContext, useState } from "react";

export const LoaderContext = createContext()

export default function LoaderProvider({ children }){
    const [loaderElementWidth, setLoaderElementWidth] = useState(0)
    const [loaderElementHeight, setLoaderElementHeight] = useState(0)

    return (
        <LoaderContext.Provider value={{ loaderElementWidth, setLoaderElementWidth, loaderElementHeight, setLoaderElementHeight }}>
            {children}
        </LoaderContext.Provider>
    )
}