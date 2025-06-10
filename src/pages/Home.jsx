import { IconClipboard, IconMap, IconSearch, IconUsers } from "@tabler/icons-react"
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { useContext } from "react"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Link } from "react-router-dom"
import aboutImage from "../assets/about-image.jpg"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { HistoryMapContext } from "../contexts/HistoryMapContext"
import GoTop from "../utils/GoTop"

export default function Home(){
    document.title = "SahabatTani"
    
    return (
        <>
        <Navbar />
        <Hero />
        <About />
        <Features />
        <UserMap />
        <Footer />
        </>
    )
}

function Hero(){
    return (
        <section className="hero h-screen flex">
            <div className="inner-hero w-full flex flex-col gap-6 justify-center pl-[10vw] bg-gradient-to-r from-custom-green from-10% to-transparent mobile:p-0 mobile:items-center tablet:pl-[5vw]">
                <div className="flex flex-col text-3xl text-white mobile:items-center">
                    <p className="font-bold mobile:text-center">Kenali penyakit tanaman</p>
                    <p className="font-bold mobile:text-center">dapatkan solusi terbaik</p>
                    <p className="font-bold mobile:text-center">dalam hitungan detik</p>
                </div>
                <Link to={"/detect"} className="py-2 px-6 rounded-full bg-white w-fit" onClick={GoTop}>Coba sekarang</Link>
            </div>
        </section>
    )
}

function About(){
    return (
        <section className="about px-[10vw] flex py-12 gap-8 mobile:px-4 mobile:flex-col-reverse tablet:px-[5vw]" id="about">
            <div className="flex flex-col gap-8 w-full mobile:gap-2">
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
        <section className="features px-[10vw] flex flex-col py-12 gap-8 bg-custom-green mobile:px-4 tablet:px-[5vw]" id="features">
            <p className="text-2xl font-bold text-white">Fitur</p>
            <article className="flex gap-4 w-full justify-between mobile:flex-col">
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

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function UserMap() {
    const { historiesMap } = useContext(HistoryMapContext)
    
    return (
        <section className="map px-[10vw] flex flex-col py-12 gap-8 mobile:px-4 tablet:px-[5vw]">
            <p className="text-2xl"><span className="font-bold">Peta</span> persebaran</p>
            {historiesMap &&
            <MapContainer center={[-7.7956, 110.3695]} zoom={12} style={{ height: '500px', width: '100%' }}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                {historiesMap.map(history => (
                    <Marker key={history.id} position={[history.latitude, history.longitude]}>
                        <Popup>
                            <strong>{history.user.fullname}</strong>
                            <p>{history.plant}</p>
                            <p>{history.prediction.status}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>}
            <article>
                <p className="text-justify">Peta ini menampilkan lokasi pengguna yang telah menggunakan layanan deteksi penyakit tanaman pada website ini. Setiap titik pada peta merepresentasikan laporan deteksi yang telah dilakukan, sehingga memungkinkan pengguna dan peneliti untuk melihat sebaran geografis penyakit tanaman secara real-time. Dengan visualisasi ini, pengguna dapat mengetahui daerah-daerah yang rawan terhadap serangan penyakit tertentu, serta membantu dalam pengambilan keputusan untuk pencegahan dan penanggulangan lebih dini.</p>
            </article>
        </section>
    );
}