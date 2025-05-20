import { IconMessageCircle, IconPhotoUp, IconSearch, IconUserCircle } from "@tabler/icons-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import Header from "../components/Header";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { ThreadContext } from "../contexts/ThreadContext";

export default function Forum(){
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
    const { isLogin } = useContext(AuthContext)

    return (
        <section className="forum-container flex flex-col items-center gap-8 px-[10vw] mt-4">
            <section className="flex gap-4">
                <article className="flex h-fit items-center gap-2 p-2 rounded-full bg-white border border-[#ccc] focus-within:border-transparent focus-within:outline-2 focus-within:outline-custom-green">
                    <IconSearch stroke={1.5} />
                    <input type="search" placeholder="Cari" className="outline-none" />
                </article>
                <article className="flex flex-col gap-4">
                {
                    isLogin === true &&
                    <button type="button" className="flex items-center gap-2 p-2 border border-[#ccc] rounded-full bg-white" onClick={onOpenModal}>
                        <IconUserCircle />
                        <p>Buat diskusi baru</p>
                    </button> 
                }
                {
                    isLogin === false &&
                    <div className="p-2 border border-[#ccc] rounded-full bg-white">Silahkan masuk untuk membuat diskusi baru</div>
                }
                    <section className="flex flex-col border border-[#ccc] rounded-lg bg-white">
                        <Link to={"/forum/threadId"} className="flex p-2 gap-2 border-b border-[#ccc]">
                            <div className="flex w-fit">
                                <IconUserCircle />
                            </div>
                            <div className="flex flex-col">
                                <div className="font-bold">User 7</div>
                                <p className="line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt similique doloribus eaque quibusdam minima unde nisi voluptas adipisci fugit minus.</p>
                            </div>
                            <div className="flex items-center h-fit w-fit">
                                <IconMessageCircle stroke={1.5} />
                                <p>4</p>
                            </div>
                        </Link>
                        <Link to={"/forum/threadId"} className="flex p-2 gap-2 border-b border-[#ccc]">
                            <div className="flex w-fit">
                                <IconUserCircle />
                            </div>
                            <div className="flex flex-col">
                                <div className="font-bold">User 7</div>
                                <p className="line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt similique doloribus eaque quibusdam minima unde nisi voluptas adipisci fugit minus.</p>
                            </div>
                            <div className="flex items-center h-fit w-fit">
                                <IconMessageCircle stroke={1.5} />
                                <p>7</p>
                            </div>
                        </Link>
                        <Link to={"/forum/threadId"} className="flex p-2 gap-2">
                            <div className="flex w-fit">
                                <IconUserCircle />
                            </div>
                            <div className="flex flex-col">
                                <div className="font-bold">User 7</div>
                                <p className="line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt similique doloribus eaque quibusdam minima unde nisi voluptas adipisci fugit minus.</p>
                            </div>
                            <div className="flex items-center h-fit w-fit">
                                <IconMessageCircle stroke={1.5} />
                                <p>1</p>
                            </div>
                        </Link>
                    </section>
                </article>
            </section>
        </section>
    )
}

function NewDiscussionModal({ onClose }) {
    const { setThreads } = useContext(ThreadContext)

    const titleRef = useRef()
    const contentRef = useRef()
    const [image, setImage] = useState(null)

    const imageInputHandler = (event) => {
        const file = event.target.files[0]
        if (file) {
            const previewUrl = URL.createObjectURL(file)
            setImage(previewUrl)
        }
    }
    const postDiscussionHandler = async(event) => {
        event.preventDefault()

        try {
            const token = localStorage.getItem("token")
            if (!token){
                return
            }

            const requestBody = {
                title: titleRef.current.value,
                content: contentRef.current.value,
                file: image
            }
            console.log(image)

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const { data } = await axios.post(`${APIEndpoint}/threads`, requestBody, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                }
            })

            const thread = { id: data.data.threadId, ...requestBody }

            setThreads(threads => [thread, ...threads])
            onClose()
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[75vw] rounded-lg shadow-lg">
                <h2 className="font-bold p-2">Buat Diskusi Baru</h2>
                <form className="flex flex-col" onSubmit={postDiscussionHandler}>
                    <input type="text" placeholder="Judul diskusi" className="border-t border-b border-[#ccc] p-2 outline-none" ref={titleRef} />
                    <textarea placeholder="Isi diskusi" className="border-b border-[#ccc] p-2 h-40 resize-none outline-none" ref={contentRef} />
                    <div className="flex border-b border-[#ccc] p-2">
                        <label className="flex items-center gap-2 w-fit cursor-pointer">
                            <IconPhotoUp stroke={1.5} />
                            <p>Unggah gambar</p>
                            <input type="file" hidden onChange={imageInputHandler} />
                        </label>
                    </div>
                    <div className="flex justify-end gap-2 p-2">
                        <button type="button" onClick={onClose} className="py-2 px-6 rounded-full bg-[#ff3d3d] text-white">Batal</button>
                        <button type="submit" className="py-2 px-6 rounded-full bg-custom-green text-white">Kirim</button>
                    </div>
                </form>
            </div>
        </div>
    );
}