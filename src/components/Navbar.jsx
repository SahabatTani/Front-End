import { Link } from "react-router-dom"
import logoGreen from "../assets/logo-green.png"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { IconChevronDown } from "@tabler/icons-react"

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

    return (
        <nav className="bg-white px-[10vw] py-4 flex items-center justify-between border border-b border-[#ccc] fixed top-0 left-0 w-full z-[9999]">
            <Link to={"/"} className="logo">
                <img src={logoGreen} alt="SahabatTani" className="w-12 h-12" />
            </Link>
            <div className="flex items-center gap-8">
            {
                links.map((link, index) => (
                    link.path === "/forum" ?
                    <Link to={link.path} key={index} className="hover:underline">{link.label}</Link>
                    : <a href={link.path} key={index} className="hover:underline">{link.label}</a>
                ))
            }
            {
                isLogin === false &&
                <Link to={"/login"} className="py-2 px-6 rounded-full bg-custom-green text-white">Masuk</Link>
            }
            {
                isLogin === true &&
                <div className="account">
                    <button type="button">
                        <img src={`${import.meta.env.VITE_USER_AVATAR}?name=${user.username}`} alt="User" />
                        <IconChevronDown stroke={1.5} width={16} height={16} />
                    </button>
                    <div className="menu">
                        <Link to={"/history"}>Riwayat</Link>
                        <button type="button">Logout</button>
                    </div>
                </div>
            }
            </div>
        </nav>
    )
}