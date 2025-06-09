import { IconArrowNarrowDown, IconArrowNarrowRight, IconCircleCheck, IconClipboard, IconObjectScan, IconPhoto, IconPhotoUp } from "@tabler/icons-react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import cassava from "../assets/cassava.png";
import corn from "../assets/corn.png";
import mango from "../assets/mango.png";
import rice from "../assets/rice.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { LoaderContext } from "../contexts/LoaderContext";

export default function Detect(){
    document.title = "SahabatTani | Deteksi"
    
    return (
        <>
        <Navbar />
        <Header title={"Deteksi tanaman"} />
        <DetectSteps />
        <DetectContainer />
        <Footer />
        </>
    )
}

function DetectSteps(){
    const steps = [
        {
            svg: <IconPhoto stroke={1.5} />,
            label: "Pilih gambar tanaman yang akan dideteksi"
        },
        {
            svg: <IconObjectScan stroke={1.5} />,
            label: "Tekan tombol deteksi"
        },
        {
            svg: <IconClipboard stroke={1.5} />,
            label: "Hasil deteksi akan langsung ditampilkan"
        }
    ]

    return (
        <section className="flex flex-col gap-8 items-center mt-4 mx-auto px-[10vw]">
            <div className="font-bold text-xl">Langkah penggunaan</div>
            <section className="flex items-center gap-4 justify-center mobile:flex-col">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <article className="flex flex-col items-center p-2 rounded-lg bg-white shadow-lg">
                        <div className="flex p-2 w-fit rounded-full bg-custom-green text-white">{step.svg}</div>
                        <p className="text-center">{step.label}</p>
                    </article>
                    {index < steps.length - 1 && <div className="flex"><IconArrowNarrowRight stroke={1.5} className="mobile:hidden" /><IconArrowNarrowDown stroke={1.5} className="hidden mobile:block" /></div>}
                </React.Fragment>
            ))}    
            </section>
        </section>
    )
}

function DetectContainer(){
    const { isLogin } = useContext(AuthContext)
    const [selectedPlant, setSelectedPlant] = useState("")
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const [result, setResult] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { setLoaderElementWidth, setLoaderElementHeight } = useContext(LoaderContext)

    const imageInputHandler = (event, plant) => {
        setResult(null)

        const file = event.target.files[0]
        if (file) {
            const maxSize = 1 * 1024 * 1024
            if (file.size > maxSize) {
                toast.warn("Ukuran gambar tidak boleh lebih dari 1MB.")
                setImage(null)
                setImagePreview(null)
                event.target.value = ""

                return
            }
            
            setImage(file)
            const previewUrl = URL.createObjectURL(file)
            setSelectedPlant(plant)
            setImagePreview(previewUrl)
        }
    }
    const clearImageInput = () => {
        setImage(null)
        setImagePreview(null)
        setSelectedPlant("")
        setResult(null)
    }
    const imageInputs = [
        {
            img: rice,
            name: "Padi"
        },
        {
            img: corn,
            name: "Jagung"
        },
        {
            img: cassava,
            name: "Singkong"
        },
        {
            img: mango,
            name: "Mangga"
        }
    ]

    const getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    }

    const detectHandler = async(event) => {
        try {
            setLoaderElementWidth(event.target.clientWidth)
            setLoaderElementHeight(event.target.clientHeight)
            setIsLoading(true)

            const requestBody = new FormData()
            requestBody.append("plant", selectedPlant)
            requestBody.append("image", image)

            const token = localStorage.getItem("token")
            const MLAPIEndpoint = import.meta.env.VITE_ML_API_ENDPOINT

            if (isLogin){
                const position = await getPosition()
                const lat = position.coords.latitude
                const long = position.coords.longitude
                
                requestBody.append("latitude", lat)
                requestBody.append("longitude", long)

                const { data } = await axios.post(`${MLAPIEndpoint}/api/predict`, requestBody, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                setResult(data.data)
            } else {
                const { data } = await axios.post(`${MLAPIEndpoint}/api/public-predict`, requestBody)

                setResult(data.data)
            }
            setIsLoading(false)
        } catch(error){
            setIsLoading(false)
            console.log(error)
            toast.error("Gagal melakukan prediksi")
        }
    }

    return (
        <section className="flex flex-col gap-8 items-center mt-8 mx-auto px-[10vw] py-8 justify-center mobile:px-4 tablet:px-[5vw]">
            <section className="image-inputs grid grid-cols-4 gap-4 mobile:grid-cols-2">
            {imageInputs.map((item, index) => (
                <label key={index} className="flex flex-col items-center justify-center p-2 rounded-lg bg-white shadow-lg cursor-pointer min-w-32 min-h-32 relative">
                    <img src={item.img} alt={item.name} className="w-12 h-12" />
                    <input type="file" hidden onChange={event => imageInputHandler(event, item.name.toLowerCase())} />
                    <span className="font-bold text-sm flex items-center gap-1">
                        <IconPhotoUp stroke={1.5} /><p>{item.name}</p>
                    </span>
                    <div className={`absolute top-0 right-0 text-custom-green ${selectedPlant === item.name.toLowerCase() ? "" : "hidden"}`}>
                        <IconCircleCheck stroke={1.5} />
                    </div>
                </label>
            ))}
            </section>
            <section className="preview flex justify-center items-center mx-auto w-[50vw] mobile:w-full">
                {imagePreview ? (
                    <article className="flex flex-col rounded-lg overflow-hidden gap-1">
                        <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain" />
                        <div className="flex justify-end gap-2 p-2 bg-white">
                            <button type="button" onClick={clearImageInput} className="py-2 px-6 rounded-full bg-[#ff3d3d] text-white">Hapus</button>
                            {isLoading ? 
                            <Loader className={"bg-custom-green"} /> :
                            <button type="submit" onClick={detectHandler} className="py-2 px-6 rounded-full bg-custom-green text-white">Deteksi</button>}
                        </div>
                    </article>
                ) : (
                    <article className="flex items-center justify-center rounded-lg border border-dashed border-custom-green w-full h-96">
                        <p>Pratinjau gambar akan ditampilkan di sini</p>
                    </article>
                )}
            </section>
            {result && 
            <section className="result flex flex-col items-center w-full">
                <p className="font-bold text-2xl">Hasil deteksi</p>    
                {result.prediction.status === "Sehat" ? 
                <p className="font-bold text-center">Sehat</p> :
                <article className="flex flex-col gap-4">
                    <p className="font-bold text-center">{result.prediction.status}</p>
                    <article>
                        <p className="font-bold">Indikasi</p>
                        <p className="text-justify">{result.prediction.indication}</p>
                    </article>
                    <article>
                        <p className="font-bold">Penyebab</p>
                        <p className="text-justify">{result.prediction.reason}</p>
                    </article>
                    <article>
                        <p className="font-bold">Solusi</p>
                        <p className="text-justify">{result.prediction.solution}</p>
                    </article>
                    <article>
                        <p className="font-bold">Rekomendasi obat</p>
                        <img src={result.prediction.medicine_image_url} alt="Obat" className="w-1/2 my-2" />
                        <Link to={result.prediction.shop_url} className="underline">Link pembelian obat</Link>
                    </article>
                </article>}
            </section>}
        </section>
    )
}