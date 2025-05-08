import { Link } from "react-router-dom"
import logoCircle from "../assets/logo-circle.png"

export default function Navbar(){

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
            label: "Cara Kerja",
            path: "/#how-it-works"
        }
    ]

    return (
        <nav className="bg-white px-[10vw] py-4 flex items-center justify-between border border-b border-[#ccc]">
            <Link to={"/"} className="logo">
                <img src={logoCircle} alt="SahabatTani" className="w-16 h-16" />
            </Link>
            <div className="flex items-center gap-8">
            {
                links.map((link, index) => (
                    <Link to={link.path} key={index} className="hover:underline">{link.label}</Link>
                ))
            }
                <Link to={"/login"} className="py-2 px-6 rounded-full bg-custom-green">Masuk</Link>
            </div>
        </nav>
    )
}