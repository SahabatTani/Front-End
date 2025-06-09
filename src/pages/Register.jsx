import axios from "axios"
import { useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import logoGreen from "../assets/logo-green.png"
import Loader from "../components/Loader"
import { AuthContext } from "../contexts/AuthContext"
import { LoaderContext } from "../contexts/LoaderContext"

export default function Register(){
    document.title = "SahabatTani | Daftar"

    const { setIsLogin, setUser } = useContext(AuthContext)
    
    const usernameRef = useRef()
    const emailRef = useRef()
    const fullnameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()

    const [isLoading, setIsLoading] = useState(false)
    const { setLoaderElementWidth, setLoaderElementHeight } = useContext(LoaderContext)

    const navigate = useNavigate()

    const registerHandler = async(event) => {
        try {
            event.preventDefault()

            const btnElement = event.currentTarget.querySelector("button[type='submit']")
            setLoaderElementWidth(btnElement.clientWidth)
            setLoaderElementHeight(btnElement.clientHeight)
            setIsLoading(true)
            
            const requestBody = {
                username: usernameRef.current.value, 
                email: emailRef.current.value,
                fullname: fullnameRef.current.value,
                password: passwordRef.current.value
            }
            const { password } = requestBody
            const passwordConfirmation = passwordConfirmationRef.current.value
            if (requestBody.username === "" || requestBody.email === "" || requestBody.fullname === "" || password === "" || passwordConfirmation === ""){
                toast.warn("Masih ada kolom yang kosong")
                return
            }
            if (password !== passwordConfirmation){
                toast.warn("Konfirmasi password tidak sesuai")
                return
            }

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const { data } = await axios.post(`${APIEndpoint}/users`, requestBody)
            localStorage.setItem("token", data.data.accessToken)
            setIsLogin(true)
            setUser(data.data.user)
            navigate("/detect")
            setIsLoading(false)
        } catch(error){
            toast.error(error.response.data.message)
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <section className="register flex items-center justify-center w-screen h-screen mobile:h-auto mobile:py-8">
            <form className="bg-white border-b-8 border-custom-green rounded-3xl shadow-lg p-8 flex flex-col items-center gap-8" onSubmit={registerHandler}>
                <img src={logoGreen} alt="SahabatTani" className="w-16 h-16" />
                <p className="text-2xl font-bold">Daftar ke SahabatTani</p>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" required className="outline-none border border-[#ccc] rounded-sm p-2" ref={usernameRef} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required className="outline-none border border-[#ccc] rounded-sm p-2" ref={emailRef} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="nama_lengkap">Nama lengkap</label>
                        <input type="text" id="nama_lengkap" required className="outline-none border border-[#ccc] rounded-sm p-2" ref={fullnameRef} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required className="outline-none border border-[#ccc] rounded-sm p-2" ref={passwordRef} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="password-confirmation">Konfirmasi password</label>
                        <input type="password" id="password-confirmation" required className="outline-none border border-[#ccc] rounded-sm p-2" ref={passwordConfirmationRef} />
                    </div>
                    <span>Sudah punya akun? <Link to={"/login"} className="hover:underline">Masuk</Link></span>
                    {isLoading ?
                    <Loader className={"bg-custom-green"} /> :
                    <button type="submit" className="py-2 px-6 rounded-full bg-custom-green text-white">Daftar</button>}
                </div>
            </form>
        </section>
    )
}