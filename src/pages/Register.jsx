import { useRef } from "react"
import logoGreen from "../assets/logo-green.png"
import { Link } from "react-router-dom"

export default function Register(){
    const usernameRef = useRef()
    const emailRef = useRef()
    const fullnameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()

    const registerHandler = async(event) => {
        try {
            event.preventDefault()
            
            const requestBody = {
                username: usernameRef.current.value, 
                email: emailRef.current.value,
                fullname: fullnameRef.current.value,
                password: passwordRef.current.value,
                passwordConfirmation: passwordConfirmationRef.current.value
            }
            const { password, passwordConfirmation } = requestBody
            if (password !== passwordConfirmation){
                return
            }

            console.log(requestBody)
        } catch(error){
            console.log(error)
        }
    }

    return (
        <section className="register flex items-center justify-center w-screen h-screen">
            <form className="bg-white border-b-8 border-custom-green rounded-3xl shadow-lg p-8 flex flex-col items-center gap-8" onSubmit={registerHandler}>
                <img src={logoGreen} alt="SahabatTani" className="w-16 h-16" />
                <p className="text-2xl font-bold">Daftar ke SahabatTani</p>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" className="outline-none border border-[#ccc] rounded-sm p-2" ref={usernameRef} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="outline-none border border-[#ccc] rounded-sm p-2" ref={emailRef} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="nama_lengkap">Nama lengkap</label>
                        <input type="text" id="nama_lengkap" className="outline-none border border-[#ccc] rounded-sm p-2" ref={fullnameRef} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="outline-none border border-[#ccc] rounded-sm p-2" ref={passwordRef} />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="password-confirmation">Konfirmasi password</label>
                        <input type="password" id="password-confirmation" className="outline-none border border-[#ccc] rounded-sm p-2" ref={passwordConfirmationRef} />
                    </div>
                    <span>Sudah punya akun? <Link to={"/login"} className="hover:underline">Masuk</Link></span>
                    <button type="submit" className="py-2 px-6 rounded-full bg-custom-green text-white">Daftar</button>
                </div>
            </form>
        </section>
    )
}