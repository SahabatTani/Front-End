import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import logoGreen from "../assets/logo-green.png";
import GoTop from "../utils/GoTop";

export default function NotFound(){
    document.title = "SahabatTani | Halaman tidak ditemukan"
    
    return (
        <section className="flex flex-col gap-8 items-center justify-center h-screen w-screen">
            <article className="font-bold flex flex-col items-center">
                <img src={logoGreen} alt="SahabatTani" className="w-16 h-16" />
                <p className="text-3xl mt-4">404</p>
                <p className="text-xl">Halaman tidak ditemukan</p>
            </article>
            <Link to={"/"} className="flex items-center py-2 px-6 rounded-full bg-white w-fit" onClick={GoTop}>
                <IconArrowLeft stroke={1.5} />
                <span>Ke halaman utama</span>
            </Link>
        </section>
    )
}