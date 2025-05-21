import { IconPhotoUp, IconUserCircle } from "@tabler/icons-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { DateParser } from "../utils/DateParser";

export default function ThreadDetail(){
    return (
        <>
        <Navbar />
        <ThreadContainer />
        <Footer />
        </>
    )
}

function ThreadContainer(){
    const { threadId } = useParams()
    const [thread, setThread] = useState(null)

    useEffect(() => {
        const getThreadHandler = async() => {
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const { data } = await axios.get(`${APIEndpoint}/threads/${threadId}`)
                setThread(data.data.thread)
            } catch(error){
                console.log(error)
            }
        }

        getThreadHandler()
    }, [])

    const commentContentRef = useRef()
    const [image, setImage] = useState(null)

    const imageInputHandler = (event) => {
        const file = event.target.files[0]
        if (file) {
            const previewUrl = URL.createObjectURL(file)
            setImage(previewUrl)
        }
    }

    const postCommentHandler = async(event) => {
        event.preventDefault()

        try {
            const token = localStorage.getItem("token")
            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT


        } catch(error){
            console.log(error)
        }
    }

    return (
        <section className="flex flex-col px-[10vw] mt-24 mx-auto gap-2">
        {
            thread &&
            <>
            <article className="account flex items-center gap-2">
                <div className="flex">
                    <img src={`${import.meta.env.VITE_USER_AVATAR}&name=${thread.fullname}`} alt="User" className="rounded-full w-8 h-8" />
                </div>
                <div className="flex flex-col h-full">
                    <p className="font-bold">{thread.fullname}</p>
                    <p className="text-sm">{DateParser(thread.created_at)}</p>
                </div>
            </article>
            <article className="title font-bold text-xl">{thread.title}</article>
            <article className="thread flex flex-col rounded-lg gap-2">
                <article className="content p-2 rounded-lg bg-white shadow-lg">{thread.content}</article>
                <article className="comments-container flex flex-col rounded-lg bg-white shadow-lg">
                    <p className={`font-bold p-2 ${thread.comments.length > 0 ? "border-b border-[#ccc]" : ""}`}>Komentar</p>
                    {thread.comments.length === 0 && <p className="text-xs pl-2 pb-2">Komentar kosong</p>}
                    {thread.comments.length > 0 &&
                    <article className="comments">
                    {thread.comments.map((comment, index) => (
                        <div className="comment flex flex-col p-2 border-b border-[#ccc]" key={index}>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    <IconUserCircle stroke={1.5} />
                                </div>
                                <div className="flex flex-col h-full">
                                    <p className="font-bold text-sm">{comment.user}</p>
                                    <p className="text-xs">{comment.date}</p>
                                </div>
                            </div>
                            <div className="">{comment.content}</div>
                        </div>
                    ))}
                    </article>}
                </article>
                <form className="create-comment flex flex-col rounded-lg bg-white shadow-lg" onSubmit={postCommentHandler}>
                    <textarea placeholder="Isi komentar" rows={7} className="p-2 outline-none border-b border-[#ccc] resize-none"></textarea>
                    <div className="flex border-b border-[#ccc] p-2">
                        <label className="flex items-center gap-2 w-fit cursor-pointer">
                            <IconPhotoUp stroke={1.5} />
                            <p>Unggah gambar</p>
                            <input type="file" hidden onChange={imageInputHandler} />
                        </label>
                    </div>
                    <button type="submit" className="py-2 px-6 my-2 mr-2 rounded-full bg-custom-green text-white self-end w-fit">Kirim</button>
                </form>
            </article>
            </>
        }
        </section>
    )
}