import { createContext, useState } from "react";

export const LoaderContext = createContext()

export default function LoaderProvider({ children }){
    const [loaderElementWidth, setLoaderElementWidth] = useState(32)
    const [loaderElementHeight, setLoaderElementHeight] = useState(32)

    return (
        <LoaderContext.Provider value={{ loaderElementWidth, setLoaderElementWidth, loaderElementHeight, setLoaderElementHeight }}>
            {children}
        </LoaderContext.Provider>
    )
}