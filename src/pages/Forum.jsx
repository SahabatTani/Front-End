import { IconMessageCircle, IconPhotoUp, IconSearch, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { LoaderContext } from "../contexts/LoaderContext";
import { ThreadContext } from "../contexts/ThreadContext";
import { DateParser } from "../utils/DateParser";
import GoTop from "../utils/GoTop";

export default function Forum(){
    document.title = "SahabatTani | Forum diskusi"
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
        <Navbar />
        <Header title={"Forum diskusi"} />
        <ForumContainer onOpenModal={() => setIsModalOpen(true)} />
        {
            isModalOpen &&
            <NewDiscussionModal onClose={() => setIsModalOpen(false)} />
        }
        <Footer />
        </>
    )
}

function ForumContainer({ onOpenModal }){
    const { isLogin, user } = useContext(AuthContext)
    const { threads } = useContext(ThreadContext)

    const [searchKeyword, setSearchKeyword] = useState("")
    const filteredThreads = threads?.filter((thread) =>
        thread.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        thread.fullname.toLowerCase().includes(searchKeyword.toLowerCase())
    )

    return (
        <section className={`forum-container flex flex-col items-center gap-8 px-[10vw] mt-4 mobile:px-4 tablet:px-[5vw] ${threads === null || threads.length < 3 ? "mb-60" : ""}`}>
            {threads === null && <Loader className={"!w-8 !h-8 bg-custom-green"} />}
            {threads &&
            <section className="flex gap-4 w-full mobile:flex-col">
                <article className="flex h-fit items-center gap-2 p-2 rounded-full bg-white border border-[#ccc] focus-within:border-transparent focus-within:outline-2 focus-within:outline-custom-green w-1/4 mobile:w-full">
                    <IconSearch stroke={1.5} />
                    <input type="search" placeholder="Cari" className="outline-none" onChange={(e) => setSearchKeyword(e.target.value)} />
                </article>
                <article className="flex flex-col gap-4 w-3/4 mobile:w-full">
                    {isLogin === true &&
                    <button type="button" className="flex items-center gap-2 p-2 border border-[#ccc] rounded-full bg-white" onClick={onOpenModal}>
                        <img src={`${import.meta.env.VITE_USER_AVATAR}&name=${user.fullname}`} alt="User" className="rounded-full w-6 h-6" />
                        <p>Buat diskusi baru</p>
                    </button>}
                    {isLogin === false &&
                    <Link to={"/login"} className="p-2 border border-[#ccc] rounded-full bg-white" onClick={GoTop}>Silahkan masuk untuk membuat diskusi baru</Link>}
                    {filteredThreads?.length > 0 &&
                    <section className="flex flex-col border border-[#ccc] rounded-lg bg-white">
                    {filteredThreads.map((thread, index) => (
                        <Link to={`/forum/${thread.id}`} className={`flex flex-col gap-2 p-2 ${index < filteredThreads.length - 1 ? "border-b border-[#ccc]" : ""}`} key={index} onClick={GoTop}>
                            <article className="flex items-center gap-2">
                                <img src={`${import.meta.env.VITE_USER_AVATAR}&name=${thread.fullname}`} className="rounded-full w-6 h-6" />
                                <article className="flex flex-col w-full">
                                    <p className="font-bold text-sm">{thread.fullname}</p>
                                    <p className="text-xs">{DateParser(thread.created_at)}</p>
                                </article>
                                <div className="flex items-center h-fit w-fit">
                                    <IconMessageCircle stroke={1.5} />
                                    <p>{thread.total_comments}</p>
                                </div>
                            </article>
                            <p className="line-clamp-2">{thread.title}</p>
                        </Link>
                    ))}
                    </section>}
                </article>
            </section>}
        </section>
    )
}

function NewDiscussionModal({ onClose }) {
    const { user } = useContext(AuthContext)
    const { setThreads } = useContext(ThreadContext)

    const titleRef = useRef()
    const contentRef = useRef()
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    const { setLoaderElementWidth, setLoaderElementHeight } = useContext(LoaderContext)

    const imageInputHandler = (event) => {
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
            setImagePreview(previewUrl)
        }
    }

    const postDiscussionHandler = async (event) => {
        try {
            event.preventDefault()

            const btnElement = event.currentTarget.querySelector("button[type='submit']")
            setLoaderElementWidth(btnElement.clientWidth)
            setLoaderElementHeight(btnElement.clientHeight)
            setIsLoading(true)

            const token = localStorage.getItem("token")

            const requestBody = new FormData()
            requestBody.append("title", titleRef.current.value)
            requestBody.append("content", contentRef.current.value)
            if (image){
                requestBody.append("file", image)
            }
            if (requestBody.get("title") === "" || requestBody.get("content") === ""){
                toast.warn("Masih ada kolom yang kosong")
                return
            }

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const { data } = await axios.post(`${APIEndpoint}/threads`, requestBody, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })

            const thread = {
                id: data.data.threadId,
                fullname: user.fullname,
                title: titleRef.current.value,
                content: contentRef.current.value,
                image_url: imagePreview,
                created_at: new Date().toISOString(),
                total_comments: "0"
            }

            setThreads((threads) => [thread, ...threads])
            onClose()
            toast.success("Diskusi berhasil ditambahkan")
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
            toast.error("Gagal membuat diskusi baru")
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1200] mobile:px-4 tablet:px-[5vw]" onClick={onClose}>
            <div className="bg-white w-[60vw] rounded-lg shadow-lg mobile:w-full tablet:w-full" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-bold p-4 text-lg border-b border-[#ccc]">Buat Diskusi Baru</h2>
                <form className="flex flex-col" onSubmit={postDiscussionHandler}>
                    <input type="text" placeholder="Judul diskusi" className="border-b border-[#ccc] p-2 outline-none" ref={titleRef} required/>
                    <textarea placeholder="Isi diskusi" className="border-b border-[#ccc] p-2 h-40 resize-none outline-none" ref={contentRef} required />
                    <div className="flex flex-col gap-2 border-b border-[#ccc] p-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <IconPhotoUp stroke={1.5} />
                            <span>Unggah gambar</span>
                            <input type="file" hidden onChange={imageInputHandler} />
                        </label>
                        {imagePreview && 
                        <div className="w-32 h-32 relative group">
                            <button type="button" className="absolute w-fit h-fit -top-2 -right-2 bg-white rounded-full p-1 border border-[#ccc] hidden group-hover:block" onClick={() => setImagePreview(null)}>
                                <IconX stroke={1.5} width={16} height={16} />
                            </button>
                            <img src={imagePreview} alt="Pratinjau" className="w-full h-full object-cover rounded-lg border border-[#ccc]" />
                        </div>}
                    </div>
                    <div className="flex justify-end gap-2 p-2">
                        <button type="button" onClick={onClose} className="py-2 px-6 rounded-full bg-[#ff3d3d] text-white">Batal</button>
                        {isLoading ?
                        <Loader className={"bg-custom-green"} /> :
                        <button type="submit" className="py-2 px-6 rounded-full bg-custom-green text-white">Kirim</button>}
                    </div>
                </form>
            </div>
        </div>
    )
}