import { useRef } from "react"
import logoGreen from "../assets/logo-green.png"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

export default function Login(){
    document.title = "SahabatTani | Masuk"
    
    const identifierRef = useRef()
    const passwordRef = useRef()

    const loginHandler = async(event) => {
        try {
            event.preventDefault()

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
            navigate("/detect")
        } catch(error){
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
                    <button type="submit" className="py-2 px-6 rounded-full bg-custom-green text-white cursor-pointer">Masuk</button>
                </div>
            </form>
        </section>
    )
}