import { IconPhotoUp, IconX } from "@tabler/icons-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { DateParser } from "../utils/DateParser";
import Header from "../components/Header";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function ThreadDetail(){
    document.title = "SahabatTani | Forum diskusi"
    return (
        <>
        <Navbar />
        <Header title={"Forum diskusi"} />
        <ThreadContainer />
        <Footer />
        </>
    )
}

function ThreadContainer(){
    const { threadId } = useParams()
    const [thread, setThread] = useState(null)
    const [popupImageUrl, setPopupImageUrl] = useState(null)

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

    return (
        <section className="flex flex-col px-[10vw] mt-4 mx-auto gap-2 mobile:px-4 tablet:px-[5vw]">
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
            <article className="content">{thread.content}</article>
            {thread.image_url &&
            <article className="flex w-1/2 overflow-hidden rounded-lg border border-[#ccc] cursor-pointer" onClick={() => setPopupImageUrl(thread.image_url)}>
                <img src={thread.image_url} alt="Image" className="w-full h-full" />
            </article>}
            <article className="thread flex flex-col rounded-lg gap-2">
                <article className="comments-container flex flex-col rounded-lg bg-white shadow-lg">
                    <p className={`font-bold p-2 ${thread.comments.length > 0 ? "border-b border-[#ccc]" : ""}`}>Komentar</p>
                    {thread.comments.length === 0 && <p className="text-xs pl-2 pb-2">Komentar kosong</p>}
                    {thread.comments.length > 0 &&
                    <article className="comments">
                    {thread.comments.map((comment, index) => (
                        <div className={`comment flex flex-col gap-2 p-2 ${index < thread.comments.length - 1 ? "border-b border-[#ccc]" : ""}`} key={index}>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    <img src={`${import.meta.env.VITE_USER_AVATAR}&name=${thread.fullname}`} alt="User" className="rounded-full w-6 h-6" />
                                </div>
                                <div className="flex flex-col h-full">
                                    <p className="font-bold text-sm">{comment.fullname}</p>
                                    <p className="text-xs">{DateParser(comment.created_at)}</p>
                                </div>
                            </div>
                            <article className="">{comment.content}</article>
                            {comment.image_url &&
                            <article className="flex w-1/4 overflow-hidden rounded-lg border border-[#ccc] cursor-pointer" onClick={() => setPopupImageUrl(comment.image_url)}>
                                <img src={comment.image_url} alt="Image" className="w-full h-full" />
                            </article>}
                        </div>
                    ))}
                    </article>}
                </article>
                <CommentForm threadId={threadId} setThread={setThread} />
            </article>
            </>
        }
        {popupImageUrl &&
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1200] px-[10vw] mobile:px-4 tablet:px-[5vw]" onClick={() => setPopupImageUrl(null)}>
            <img src={popupImageUrl} alt="Popup" className="max-h-[75vh] rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()} />
        </div>}
        </section>
    )
}

function CommentForm({ threadId, setThread }){
    const { user } = useContext(AuthContext)
    const commentContentRef = useRef()
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const imageInputHandler = (event) => {
        const file = event.target.files[0]
        if (file) {
            setImage(file)
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
        }
    }

    const postCommentHandler = async(event) => {
        try {
            event.preventDefault()

            const token = localStorage.getItem("token")
            if (!token) return

            const requestBody = new FormData()
            requestBody.append("content", commentContentRef.current.value)
            if (image){
                requestBody.append("file", image)
            }
            if (requestBody.get("content") === ""){
                toast.warn("Masih ada kolom yang kosong")
                return
            }

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const { data } = await axios.post(`${APIEndpoint}/comments/${threadId}`, requestBody, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                }
            })

            const comment = {
                id: data.data.commentId,
                fullname: user.fullname,
                content: commentContentRef.current.value,
                image_url: imagePreview,
                created_at: new Date().toISOString()
            }
            setThread(thread => ({...thread, comments: [comment, ...thread.comments]}))

            console.log(data)
        } catch(error){
            console.log(error)
        }
    }

    return (
        <form className="create-comment flex flex-col rounded-lg bg-white shadow-lg" onSubmit={postCommentHandler}>
            <div className="font-bold p-2 border-b border-[#ccc]">Beri komentar</div>
            <textarea placeholder="Isi komentar" required rows={7} className="p-2 outline-none border-b border-[#ccc] resize-none" ref={commentContentRef}></textarea>
            <div className="flex flex-col gap-2 border-b border-[#ccc] p-2">
                <label className="flex items-center gap-2 w-fit cursor-pointer">
                    <IconPhotoUp stroke={1.5} />
                    <p>Unggah gambar</p>
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
            <button type="submit" className="py-2 px-6 my-2 mr-2 rounded-full bg-custom-green text-white self-end w-fit">Kirim</button>
        </form>
    )
}