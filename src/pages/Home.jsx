import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export default function Home(){
    return (
        <>
        <Navbar />
        <Hero />
        <Footer />
        </>
    )
}

function Hero(){
    return (
        <section className="hero"></section>
    )
}