import { IconBrandInstagram, IconMail } from "@tabler/icons-react"
import { Link } from "react-router-dom"
import logoWhite from "../assets/logo-white.png"

export default function Footer(){
    const contacts = [
        {
            svg: <IconBrandInstagram stroke={1.5} />,
            label: "@sahabattani"
        },
        {
            svg: <IconMail stroke={1.5} />,
            label: "sahabattani@gmail.com"
        }
    ]

    return (
        <footer className="flex flex-col px-[10vw] py-8 mt-8 bg-custom-green text-white mobile:px-4 tablet:px-[5vw]">
            <article className="flex justify-between">
                <article className="flex items-center gap-2">
                    <img src={logoWhite} alt="SahabatTani" className="w-12 h-12" />
                    <span className="font-bold text-xl mobile:text-base">SahabatTani</span>
                </article>
                <div className="flex gap-4 mobile:flex-col">
                {contacts.map((contact, index) => (
                    <Link className="flex hover:underline" key={index}>
                        {contact.svg}
                        <p>{contact.label}</p>
                    </Link>                        
                ))}
                </div>
            </article>
            <p className="pt-8 mobile:text-center">© Hak Cipta 2025  SahabatTani</p>
        </footer>
    )
}