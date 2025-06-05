import { IconX } from "@tabler/icons-react"
import { useContext, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Loader from "../components/Loader"
import Navbar from "../components/Navbar"
import { HistoryContext } from "../contexts/HistoryContext"
import { DateParser } from "../utils/DateParser"

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

    const { histories } = useContext(HistoryContext)
    const [selectedHistory, setSelectedHistory] = useState(null)

    return (
        <section className="history-container flex flex-col items-center gap-8 mt-4 px-[10vw] mobile:px-4 tablet:px-[5vw]">
            {histories === null && <Loader />}
            {histories && 
            <section className="grid grid-cols-4 gap-8 mobile:grid-cols-1 tablet:grid-cols-3">
            {histories.map((history, index) => (
                <article className="flex flex-col rounded-lg bg-white overflow-hidden cursor-pointer" key={index} onClick={() => setSelectedHistory(history)}>
                    <img src={history.image_url} alt="Riwayat" className="w-full aspect-square object-cover" />
                    <div className="flex flex-col p-4 gap-4">
                        <div>
                            <p>{history.prediction.plant}</p>
                            <p className="font-bold">{history.prediction.status}</p>
                        </div>
                        <p className="self-end">{DateParser(history.created_at)}</p>
                    </div>
                </article>
            ))}
            </section>}
            {selectedHistory &&
            <HistoryPopup history={selectedHistory} setSelectedHistory={setSelectedHistory} />}
        </section>
    )
}

function HistoryPopup({ history, setSelectedHistory }){
    return (
        <section className="history-popup fixed inset-0 bg-black/50 flex items-center justify-center z-[1200] mobile:px-4 tablet:px-[5vw]" onClick={() => setSelectedHistory(null)}>
            <article className="bg-white relative w-[75vw] h-[75vh] flex gap-2 p-2 rounded-lg shadow-lg mobile:w-full mobile:flex-col tablet:w-full" onClick={(e) => e.stopPropagation()}>
                <article className="w-2/5 flex mobile:w-full">
                    <img src={history.image_url} alt="Riwayat" className="w-full h-fit" />
                </article>
                <article className="w-3/5 flex overflow-y-auto mobile:w-full">
                    <article className="flex flex-col">
                        <p className="font-bold">{history.prediction.plant}</p>
                        <p>{history.prediction.status}</p>
                        {history.prediction.status !== "Sehat" && 
                        <>
                        <article className="mt-4">
                            <p className="font-bold">Indikasi</p>
                            <p className="text-justify">{history.prediction.indication}</p>
                        </article>
                        <article className="mt-2">
                            <p className="font-bold">Penyebab</p>
                            <p className="text-justify">{history.prediction.reason}</p>
                        </article>
                        <article className="mt-2">
                            <p className="font-bold">Solusi</p>
                            <p className="text-justify">{history.prediction.solution}</p>
                        </article>    
                        </>}
                    </article>
                </article>
                <button type="button" className="p-1 bg-black rounded-full text-white absolute -top-2 -right-2" onClick={() => setSelectedHistory(null)}>
                    <IconX stroke={1.5} width={20} height={20} />
                </button>
            </article>
        </section>
    )
}