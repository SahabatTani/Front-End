import { IconTrash, IconX } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Loader from "../components/Loader"
import Navbar from "../components/Navbar"
import { HistoryContext } from "../contexts/HistoryContext"
import { LoaderContext } from "../contexts/LoaderContext"
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

function HistoryContainer() {
    const { histories } = useContext(HistoryContext)
    const [selectedHistory, setSelectedHistory] = useState(null)

    return (
        <section className={`history-container flex flex-col items-center gap-8 mt-4 px-[10vw] mobile:px-4 tablet:px-[5vw] ${histories === null || histories.length === 0 ? "mb-60" : ""}`}>
            {histories === null && <Loader className={"!w-8 !h-8 bg-custom-green"} />}
            {histories !== null && histories.length === 0 && (
                <p className="text-2xl font-bold text-center">Riwayat masih kosong</p>
            )}
            {histories !== null && histories.length > 0 && (
                <section className="w-full grid grid-cols-4 gap-8 mobile:grid-cols-1 tablet:grid-cols-3">
                    {histories.map((history, index) => (
                        <article className="flex flex-col rounded-lg bg-white overflow-hidden cursor-pointer shadow-lg" key={index} onClick={() => setSelectedHistory(history)}>
                            <img src={history.image_url} alt="Riwayat" className="w-full aspect-square object-cover" />
                            <div className="flex flex-col p-4 gap-4">
                                <div>
                                    <p>{history.plant}</p>
                                    <p className="font-bold">{history.prediction.status}</p>
                                </div>
                                <p className="self-end">{DateParser(history.created_at)}</p>
                            </div>
                        </article>
                    ))}
                </section>
            )}
            {selectedHistory && (
                <HistoryPopup history={selectedHistory} setSelectedHistory={setSelectedHistory} />
            )}
        </section>
    )
}

function HistoryPopup({ history, setSelectedHistory }){
    const { setHistories } = useContext(HistoryContext)
    const [isLoading, setIsLoading] = useState(false)
    const { setLoaderElementWidth, setLoaderElementHeight } = useContext(LoaderContext)

    const deleteHistoryHandler = async(event) => {
        try {
            setLoaderElementWidth(event.currentTarget.clientWidth)
            setLoaderElementHeight(event.currentTarget.clientHeight)
            setIsLoading(true)

            const token = localStorage.getItem("token")
            const MLAPIEndpoint = import.meta.env.VITE_ML_API_ENDPOINT
            
            await axios.delete(`${MLAPIEndpoint}/api/histories/${history.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            
            setHistories(histories => histories.filter(h => h.id !== history.id))
            setIsLoading(false)
            setSelectedHistory(null)
        } catch(error){
            setIsLoading(false)
            console.log(error)
            toast.error("Gagal menghapus riwayat")
        }
    }

    return (
        <section className="history-popup fixed inset-0 bg-black/50 flex items-center justify-center z-[1200] mobile:px-4 tablet:px-[5vw]" onClick={() => setSelectedHistory(null)}>
            <article className="bg-white relative w-[75vw] h-[75vh] flex gap-2 p-2 rounded-lg shadow-lg mobile:w-full mobile:flex-col tablet:w-full" onClick={(e) => e.stopPropagation()}>
                <article className="w-2/5 flex mobile:w-full overflow-y-auto mobile:overflow-y-visible">
                    <img src={history.image_url} alt="Riwayat" className="w-full h-fit" />
                </article>
                <article className="w-3/5 flex overflow-y-auto mobile:w-full">
                    <article className="flex flex-col">
                        <p className="font-bold">{history.plant}</p>
                        <p>{history.prediction.status}</p>
                        <p>{DateParser(history.created_at)}</p>
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
                        <article className="mt-2">
                            <p className="font-bold">Rekomendasi obat</p>
                            <img src={history.prediction.medicine_image_url} alt="Obat" className="w-1/2 my-2" />
                            <Link to={history.prediction.shop_url} className="underline">Link pembelian obat</Link>
                        </article>    
                        </>}
                        <article className="mt-2">
                            {isLoading ?
                            <Loader className={"bg-[#ff3d3d]"} /> :
                            <button type="button" className="flex items-center gap-1 rounded-full bg-[#ff3d3d] p-2 w-fit text-white" onClick={deleteHistoryHandler}>
                                <IconTrash stroke={1.5} />
                                <span>Hapus riwayat</span>
                            </button>}
                        </article>
                    </article>
                </article>
                <button type="button" className="p-1 bg-black rounded-full text-white absolute -top-2 -right-2" onClick={() => setSelectedHistory(null)} >
                    <IconX stroke={1.5} width={20} height={20} />
                </button>
            </article>
        </section>
    )
}