import { IconDotsVertical, IconPhotoUp, IconTrash, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { LoaderContext } from "../contexts/LoaderContext";
import { ThreadContext } from "../contexts/ThreadContext";
import { DateParser } from "../utils/DateParser";

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
    const { user } = useContext(AuthContext)
    const { setThreads } = useContext(ThreadContext)
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

    const [selectedCommentMenu, setSelectedCommentMenu] = useState("")

    const navigate = useNavigate()
    const deleteDiscussionHandler = async() => {
        try {
            const token = localStorage.getItem("token")

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            await axios.delete(`${APIEndpoint}/threads/${thread.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            setThreads(threads => threads.filter(t => t.id !== thread.id))
            navigate("/forum")
        } catch(error){
            console.log(error)
        }
    } 

    const menuRef = useRef()
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)){
                setShowMenu(false)
            }
        }
    
        document.addEventListener("click", handleClickOutside)
    
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    return (
        <section className="flex flex-col px-[10vw] mt-4 mx-auto gap-2 mobile:px-4 tablet:px-[5vw]">
            {thread === null && <Loader className={"self-center w-8 h-8"} />}
            {thread &&
            <>
            <article className="account flex items-center gap-2">
                <img src={`${import.meta.env.VITE_USER_AVATAR}&name=${thread.fullname}`} alt="User" className="rounded-full w-8 h-8" />
                <div className="flex flex-col w-full h-full">
                    <p className="font-bold">{thread.fullname}</p>
                    <p className="text-sm">{DateParser(thread.created_at)}</p>
                </div>
                {user?.username === thread.username &&
                <div className="relative" ref={menuRef}>
                    <button type="button" className="rounded-full hover:bg-black/10 p-1" onClick={() => setShowMenu(!showMenu)}>
                        <IconDotsVertical stroke={1.5} width={16} height={16} />
                    </button>
                    <div className={`menu absolute top-full right-0 py-1 bg-white shadow-lg rounded-lg ${showMenu ? "flex" : "hidden"} flex-col overflow-hidden`}>
                        <button type="button" className="flex items-center hover:bg-black/10 p-1 text-red-500" onClick={deleteDiscussionHandler}>
                            <IconTrash stroke={1.5} width={20} height={20} />
                            <span className="text-sm">Hapus</span>
                        </button>
                    </div>
                </div>}
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
                        <Comment key={index} comments={thread.comments} index={index} comment={comment} selectedCommentMenu={selectedCommentMenu} setSelectedCommentMenu={setSelectedCommentMenu} setPopupImageUrl={setPopupImageUrl} setThread={setThread} setThreads={setThreads} />
                    ))}
                    </article>}
                </article>
                <CommentForm thread={thread} setThread={setThread} setThreads={setThreads} />
            </article>
            </>}
            {popupImageUrl &&
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1200] px-[10vw] mobile:px-4 tablet:px-[5vw]" onClick={() => setPopupImageUrl(null)}>
                <img src={popupImageUrl} alt="Popup" className="max-h-[75vh] rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()} />
            </div>}
        </section>
    )
}

function Comment({ comments, index, comment, selectedCommentMenu, setSelectedCommentMenu, setPopupImageUrl, setThread, setThreads }) {
    const menuRef = useRef(null)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setSelectedCommentMenu("")
            }
        }

        if (selectedCommentMenu === comment.id) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [selectedCommentMenu, comment.id, setSelectedCommentMenu])

    const deleteCommentHandler = async() => {
        try {
            const token = localStorage.getItem("token")

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            await axios.delete(`${APIEndpoint}/comments/${comment.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            setThread(thread => ({...thread, comments: thread.comments.filter(c => c.id !== comment.id)}))
            setThreads(threads => threads.map(thread => {
                if (thread.id === thread.id) return {...thread, total_comments: parseInt(thread.total_comments) - 1}
                return thread
            }))
        } catch(error){
            console.log(error)
        }
    }

    return (
        <article className={`comment flex flex-col gap-2 p-2 ${index < comments.length - 1 ? "border-b border-[#ccc]" : ""}`}>
            <article className="flex items-center gap-2">
                <img src={`${import.meta.env.VITE_USER_AVATAR}&name=${comment.fullname}`} className="rounded-full w-6 h-6" />
                <article className="flex flex-col w-full">
                    <p className="font-bold text-sm">{comment.fullname}</p>
                    <p className="text-xs">{DateParser(comment.created_at)}</p>
                </article>
                {user?.username === comment.username &&
                <div className="relative" ref={menuRef}>
                    <button type="button" className="rounded-full hover:bg-black/10 p-1" onClick={() => setSelectedCommentMenu(selectedCommentMenu === comment.id ? "" : comment.id)}>
                        <IconDotsVertical stroke={1.5} width={16} height={16} />
                    </button>
                    <div className={`menu absolute top-full right-0 py-1 bg-white shadow-lg rounded-lg ${selectedCommentMenu === comment.id ? "flex" : "hidden"} flex-col overflow-hidden`}>
                        <button type="button" className="flex items-center hover:bg-black/10 p-1 text-red-500" onClick={deleteCommentHandler}>
                            <IconTrash stroke={1.5} width={20} height={20} />
                            <span className="text-sm">Hapus</span>
                        </button>
                    </div>
                </div>}
            </article>
            <article>{comment.content}</article>
            {comment.image_url && (
                <div
                    className="flex w-1/4 overflow-hidden rounded-lg border border-[#ccc] cursor-pointer"
                    onClick={() => setPopupImageUrl(comment.image_url)}
                >
                    <img src={comment.image_url} alt="Image" className="w-full h-full" />
                </div>
            )}
        </article>
    )
}

function CommentForm({thread, setThread, setThreads }){
    const { user } = useContext(AuthContext)
    const commentContentRef = useRef()
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    const { setLoaderElementWidth, setLoaderElementHeight } = useContext(LoaderContext)

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

            const btnElement = event.currentTarget.querySelector("button[type='submit']")
            setIsLoading(true)
            setLoaderElementWidth(btnElement.clientWidth)
            setLoaderElementHeight(btnElement.clientHeight)

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
            const { data } = await axios.post(`${APIEndpoint}/comments/${thread.id}`, requestBody, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                }
            })

            const comment = {
                id: data.data.commentId,
                fullname: user.fullname,
                username: user.username,
                content: commentContentRef.current.value,
                image_url: imagePreview,
                created_at: new Date().toISOString()
            }
            setThread(thread => ({...thread, comments: [comment, ...thread.comments]}))
            setThreads(threads => threads.map(thread => {
                if (thread.id === thread.id) return {...thread, total_comments: parseInt(thread.total_comments) + 1}
                return thread
            }))

            commentContentRef.current.value = ""
            setImage(null)
            setImagePreview(null)
            toast.success("Komentar berhasil ditambahkan")
            setIsLoading(false)
        } catch(error){
            setIsLoading(false)
            console.log(error)
            toast.error("Gagal membuat komentar")
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
            {isLoading ?
            <Loader className={"self-end my-2 mr-2"} /> :
            <button type="submit" className="py-2 px-6 my-2 mr-2 rounded-full bg-custom-green text-white self-end w-fit">Kirim</button>}
        </form>
    )
}