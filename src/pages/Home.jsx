import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import aboutImage from "../assets/about-image.jpg"
import { IconClipboard, IconMap, IconSearch, IconUsers } from "@tabler/icons-react"

export default function Home(){
    return (
        <>
        <Navbar />
        <Hero />
        <About />
        <Features />
        <Footer />
        </>
    )
}

function Hero(){
    return (
        <section className="hero h-screen flex">
            <div className="inner-hero w-full flex flex-col gap-6 justify-center pl-[10vw] bg-gradient-to-r from-custom-green from-10% to-transparent">
                <div className="flex flex-col text-3xl text-white">
                    <p className="font-bold">Kenali penyakit tanaman</p>
                    <p className="font-bold">dapatkan solusi terbaik</p>
                    <p className="font-bold">dalam hitungan detik</p>
                </div>
                <Link to={"/detect"} className="py-2 px-6 rounded-full bg-white w-fit">Coba sekarang</Link>
            </div>
        </section>
    )
}

function About(){
    return (
        <section className="about px-[10vw] flex py-12 gap-8" id="about">
            <div className="flex flex-col gap-8 w-full ">
                <p className="text-2xl"><span className="font-bold">Tentang</span> kami</p>
                <article className="flex flex-col gap-4">
                    <p>SahabatTani merupakan platform digital yang hadir untuk mendampingi petani dalam menjaga kesehatan tanamannya. Melalui fitur deteksi penyakit berbasis foto dan rekomendasi penanganan yang akurat, kami membantu petani mengambil keputusan secara cepat dan tepat.</p>
                    <p>Kami percaya bahwa kemajuan teknologi harus dapat diakses dan dimanfaatkan oleh seluruh lapisan masyarakat, termasuk petani. Dengan sahabatTani, diharapkan petani dapat meningkatkan hasil panen serta mengurangi kerugian akibat serangan penyakit secara lebih efisien.</p>
                </article>
            </div>
            <article className="flex w-full">
                <img src={aboutImage} alt="Tentang kami" className="w-full h-fit" />
            </article>
        </section>
    )
}

function Features(){

    const features = [
        {
            svg: <IconSearch stroke={1.5} className="w-full h-full" />,
            title: "Deteksi penyakit",
            desc: "Mendeteksi penyakit tanaman secara otomatis melalui foto. Hasil diagnosis ditampilkan secara instan."
        },
        {
            svg: <IconClipboard stroke={1.5} className="w-full h-full" />,
            title: "Rekomendasi",
            desc: "Memberikan saran obat dan tindakan berdasarkan deteksi. Disesuaikan dengan jenis penyakit yang teridentifikasi."
        },
        {
            svg: <IconUsers stroke={1.5} className="w-full h-full" />,
            title: "Forum diskusi",
            desc: "Fasilitas berbagi pengalaman dan berdiskusi antar petani. Mendukung kolaborasi dan solusi bersama."
        },
        {
            svg: <IconMap stroke={1.5} className="w-full h-full" />,
            title: "Peta persebaran",
            desc: "Menampilkan sebaran penyakit tanaman di sekitar pengguna. Membantu tindakan pencegahan lebih awal."
        }
    ]

    return (
        <section className="features px-[10vw] flex flex-col py-12 gap-8 bg-custom-green" id="features">
            <p className="text-2xl font-bold text-white">Fitur</p>
            <article className="flex gap-4 w-full justify-between">
            {features.map((feature, index) => (
                <div className="flex flex-col gap-4 bg-white rounded-lg p-4" key={index}>
                    <div className="w-10 h-10">{feature.svg}</div>
                    <p className="text-xl font-bold">{feature.title}</p>
                    <p>{feature.desc}</p>
                </div>
            ))}
            </article>
        </section>
    )
}