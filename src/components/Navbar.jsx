import { Link } from "react-router-dom"
import logoGreen from "../assets/logo-green.png"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { IconChevronDown, IconHistory, IconLogout, IconMenu2, IconX } from "@tabler/icons-react"

export default function Navbar(){
    const { isLogin, user } = useContext(AuthContext)
    const links = [
        {
            label: "Tentang",
            path: "/#about"
        },
        {
            label: "Fitur",
            path: "/#features"
        },
        {
            label: "Forum",
            path: "/forum"
        }
    ]

    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const accountMenuBtn = useRef()

    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const mobileMenuBtn = useRef()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!mobileMenuBtn.current.contains(e.target)){
                setShowMobileMenu(false)
            }
            if (!accountMenuBtn.current.contains(e.target)){
                setShowAccountMenu(false)
            }
        }
    
        document.addEventListener("click", handleClickOutside)
    
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    return (
        <nav className="bg-white px-[10vw] py-4 flex items-center justify-between border border-b border-[#ccc] fixed top-0 left-0 w-full z-[9999] mobile:px-4 tablet:px-[5vw]">
            <Link to={"/"} className="logo">
                <img src={logoGreen} alt="SahabatTani" className="w-12 h-12" />
            </Link>
            <div className="flex items-center gap-8 mobile:gap-4">
                <div className={`links flex items-center gap-8 mobile:absolute mobile:top-0 mobile:bg-white mobile:flex-col mobile:h-screen mobile:items-end mobile:w-3/5 mobile:pt-6 mobile:pr-4 mobile:transition-all mobile:duration-300 mobile:z-50 ${showMobileMenu ? "mobile:right-0" : "mobile:-right-full"}`}>
                    <button type="button" className="hidden mobile:flex" onClick={() => setShowMobileMenu(false)}>
                        <IconX stroke={1.5} />
                    </button>
                {
                    links.map((link, index) => (
                        link.path === "/forum" ?
                        <Link to={link.path} key={index} className="hover:underline">{link.label}</Link>
                        : <a href={link.path} key={index} className="hover:underline">{link.label}</a>
                    ))
                }
                </div>
            {
                isLogin === false &&
                <Link to={"/login"} className="py-2 px-6 rounded-full bg-custom-green text-white">Masuk</Link>
            }
            {
                isLogin === true &&
                <div className="account relative">
                    <button type="button" className="flex items-center p-1 rounded-full bg-[#ccc]" onClick={() => setShowAccountMenu(!showAccountMenu)} ref={accountMenuBtn}>
                        <img src={`${import.meta.env.VITE_USER_AVATAR}&name=${user.username}`} alt="User" className="rounded-full w-8 h-8" />
                        <IconChevronDown stroke={1.5} width={16} height={16} />
                    </button>
                    <div className={`menu absolute top-[105%] right-0 flex-col bg-white shadow-lg rounded-lg py-1 ${showAccountMenu ? "flex" : "hidden"}`}>
                        <Link to={"/history"} className="p-2 pr-8 hover:bg-[#ccc] flex items-center gap-2">
                            <IconHistory stroke={1.5} />
                            <span>Riwayat</span>
                        </Link>
                        <button type="button" className="p-2 pr-8 hover:bg-[#ccc] flex items-center gap-2">
                            <IconLogout stroke={1.5} />
                            <span>Keluar</span>
                        </button>
                    </div>
                </div>
            }
                <button type="button" className="mobile-menu-btn hidden mobile:flex" onClick={() => setShowMobileMenu(true)} ref={mobileMenuBtn}>
                    <IconMenu2 stroke={1.5} />
                </button>
            </div>
            <div className={`overlay absolute z-40 top-0 left-0 right-0 h-[100vh] bg-black/[.5] ${showMobileMenu ? "block" : "hidden"}`}></div>
        </nav>
    )
}