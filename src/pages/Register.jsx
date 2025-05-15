import logoGreen from "../assets/logo-green.png"

export default function Register(){

    const registerHandler = async(e) => {
        try {
            e.preventDefault()
        } catch(error){
            console.log(error)
        }
    }

    return (
        <section className="register flex items-center justify-center w-screen h-screen">
            <form className="bg-white border-b-8 border-custom-green rounded-3xl shadow-lg p-8 flex flex-col items-center gap-8" onSubmit={registerHandler}>
                <img src={logoGreen} alt="SahabatTani" className="w-16 h-16" />
                <div className="text-2xl font-bold">Daftar ke SahabatTani</div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" className="outline-none border border-[#ccc] rounded-sm p-2" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="nama_lengkap">Nama lengkap</label>
                        <input type="text" id="nama_lengkap" className="outline-none border border-[#ccc] rounded-sm p-2" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="outline-none border border-[#ccc] rounded-sm p-2" />
                    </div>
                    <button type="submit" className="py-2 px-6 rounded-full bg-custom-green text-white">Daftar</button>
                </div>
            </form>
        </section>
    )
}