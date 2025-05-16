import { IconArrowNarrowRight, IconCheck, IconCircleCheck, IconClipboard, IconObjectScan, IconPhoto, IconPhotoUp } from "@tabler/icons-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import rice from "../assets/rice.png"
import corn from "../assets/corn.png"
import cassava from "../assets/cassava.png"

export default function Detect(){
    return (
        <>
        <Navbar />
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
        <section className="flex flex-col gap-8 items-center mt-28 mx-auto px-[10vw]">
            <div className="font-bold text-xl">Langkah penggunaan</div>
            <section className="flex items-center gap-4  justify-center">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <article className="flex flex-col items-center p-2 rounded-lg bg-white shadow-lg">
                        <div className="flex p-2 w-fit rounded-full bg-custom-green text-white">{step.svg}</div>
                        <p className="text-center">{step.label}</p>
                    </article>
                    {index < steps.length - 1 && <div className="flex"><IconArrowNarrowRight stroke={1.5} /></div>}
                </React.Fragment>
            ))}    
            </section>
        </section>
    )
}

function DetectContainer(){
    const [selectedPlant, setSelectedPlant] = useState("")
    const [image, setImage] = useState(null)
    const imageInputHandler = (event, plant) => {
        const file = event.target.files[0]
        if (file) {
            const previewUrl = URL.createObjectURL(file)
            setSelectedPlant(plant)
            setImage(previewUrl)
        }
    }
    const clearImageInput = () => {
        setImage(null)
        setSelectedPlant("")
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
        }
    ]
    const detectHandler = async() => {
        try {
            navigator.geolocation.getCurrentPosition(
                async(position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    console.log(lat, lng)
                }, (error) => {
                    console.error('Gagal mendapatkan lokasi:', error);
                    alert('Gagal mendapatkan lokasi');
                }
            );
        } catch(error){
            console.log(error)
        }
    }

    return (
        <section className="flex flex-col gap-8 items-center mt-8 mx-auto px-[10vw] bg-custom-green py-8 justify-center">
            <section className="image-inputs flex items-center gap-4">
            {imageInputs.map((item, index) => (
                <label key={index} className="flex flex-col items-center justify-center p-2 rounded-lg bg-white shadow-lg cursor-pointer min-w-32 min-h-32 relative">
                    <img src={item.img} alt={item.name} className="w-12 h-12" />
                    <input type="file" hidden onChange={(event) => imageInputHandler(event, item.name)} />
                    <span className="font-bold text-sm flex items-center gap-1">
                        <IconPhotoUp stroke={1.5} /><p>{item.name}</p>
                    </span>
                    <div className={`absolute top-0 right-0 text-custom-green ${selectedPlant === item.name ? "" : "hidden"}`}>
                        <IconCircleCheck stroke={1.5} />
                    </div>
                </label>
            ))}
            </section>
            <section className="preview flex justify-center items-center mx-auto w-[50vw]">
                {image ? (
                    <article className="flex flex-col rounded-lg overflow-hidden gap-1">
                        <img src={image} alt="Preview" className="max-w-full max-h-full object-contain" />
                        <div className="flex justify-end gap-2 p-2 bg-white">
                            <button type="button" onClick={clearImageInput} className="py-2 px-6 rounded-full bg-[#ff3d3d] text-white">Hapus</button>
                            <button type="submit" onClick={detectHandler} className="py-2 px-6 rounded-full bg-custom-green text-white">Deteksi</button>
                        </div>
                    </article>
                ) : (
                    <article className="flex items-center justify-center rounded-lg border border-dashed border-[#ccc] w-full h-96">
                        <p className="text-white">Pratinjau gambar akan ditampilkan di sini</p>
                    </article>
                )}
            </section>
            <section className="result"></section>
        </section>
    )
}