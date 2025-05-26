import { useContext } from "react"
import { LoaderContext } from "../contexts/LoaderContext"

export default function Loader({ className }){
    const { loaderElementWidth, loaderElementHeight } = useContext(LoaderContext)

    return (
        <div className={`loader ${className}`} style={{ width: `${loaderElementWidth}px`, height: `${loaderElementHeight}px` }}>
            <div className="spinner"></div>
        </div>
    )
}