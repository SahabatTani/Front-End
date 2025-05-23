import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"

export default function History(){
    document.title = "SahabatTani | Riwayat"
    
    return (
        <>
        <Navbar />
        <Header title={"Riwayat deteksi tanaman"} />
        <HistoryContainer />
        <Footer />
        </>
    )
}

function HistoryContainer(){

    const histories = [
        {
            image: "",
            plant_name: "Padi",
            status: "Sehat",
            created_at: "1 minggu lalu"
        },
        {
            image: "",
            plant_name: "Jagung",
            status: "Penyakit A",
            created_at: "2 minggu lagi"
        },
        {
            image: "",
            plant_name: "Singkong",
            status: "Penyakit B",
            created_at: "1 bulan lalu"
        }
    ]

    return (
        <section className="history-container flex flex-col items-center gap-8 mt-4 px-[10vw]">
            <section className="grid grid-cols-4 gap-8">
            {histories.map((history, index) => (
                <article className="flex flex-col rounded-lg bg-white overflow-hidden" key={index}>
                    <img src={history.image} alt="Image" className="w-full aspect-square object-cover" />
                    <div className="flex flex-col p-4">
                        <div className="">
                            <p>{history.plant_name}</p>
                            <p className="font-bold">{history.status}</p>
                        </div>
                        <p className="self-end">{history.created_at}</p>
                    </div>
                </article>
            ))}
            </section>
        </section>
    )
}