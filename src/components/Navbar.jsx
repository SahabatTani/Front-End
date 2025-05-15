import { Link } from "react-router-dom"
import logoGreen from "../assets/logo-green.png"

export default function Navbar(){

    const links = [
        {
            label: "Tentang",
            path: "/#about"
        },
        {
            label: "Fitur",
            path: "/#features"
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
                    <a href={link.path} key={index} className="hover:underline">{link.label}</a>
                ))
            }
                <Link to={"/login"} className="py-2 px-6 rounded-full bg-custom-green text-white">Masuk</Link>
            </div>
        </nav>
    )
}