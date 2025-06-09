import axios from "axios"
import { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import logoGreen from "../assets/logo-green.png"
import Loader from "../components/Loader"
import { AuthContext } from "../contexts/AuthContext"
import { LoaderContext } from "../contexts/LoaderContext"

export default function Login(){
    document.title = "SahabatTani | Masuk"

    const { setIsLogin, setUser } = useContext(AuthContext)
    
    const identifierRef = useRef()
    const passwordRef = useRef()

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const { setLoaderElementWidth, setLoaderElementHeight } = useContext(LoaderContext)

    const loginHandler = async(event) => {
        try {
            event.preventDefault()

            const btnElement = event.currentTarget.querySelector('button[type="submit"]')
            setLoaderElementWidth(btnElement.clientWidth)
            setLoaderElementHeight(btnElement.clientHeight)
            setIsLoading(true)

            const requestBody = {
                identifier: identifierRef.current.value,
                password: passwordRef.current.value
            }
            if (requestBody.identifier === "" || requestBody.password === ""){
                toast.warn("Masih ada kolom yang kosong")
                return
            }

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const { data } = await axios.post(`${APIEndpoint}/authentications`, requestBody)
            localStorage.setItem("token", data.data.accessToken)
            setIsLogin(true)
            setUser(data.data.user)
            navigate("/detect")
            setIsLoading(false)
        } catch(error){
            setIsLoading(false)
            toast.error("Gagal masuk")
            console.log(error)
        }
    }

    return (
        <section className="login flex items-center justify-center w-screen h-screen">
            <form className="bg-white border-b-8 border-custom-green rounded-3xl shadow-lg p-8 flex flex-col items-center gap-8" onSubmit={loginHandler}>
                <img src={logoGreen} alt="SahabatTani" className="w-16 h-16" />
                <p className="text-2xl font-bold">Masuk ke SahabatTani</p>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="username-email">Username/Email</label>
                        <input type="text" id="username-email" required className="outline-none border border-[#ccc] rounded-sm p-2" ref={identifierRef} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required className="outline-none border border-[#ccc] rounded-sm p-2" ref={passwordRef} />
                    </div>
                    <span>Belum punya akun? <Link to={"/register"} className="hover:underline">Daftar</Link></span>
                    {isLoading ? 
                    <Loader className={"bg-custom-green"} /> :
                    <button type="submit" className="py-2 px-6 rounded-full bg-custom-green text-white cursor-pointer">Masuk</button>}
                </div>
            </form>
        </section>
    )
}