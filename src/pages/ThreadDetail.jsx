import { IconUserCircle } from "@tabler/icons-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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

    const comments = [
        {
            user: "Umar",
            date: "2 minggu lalu",
            content: "lorem ipsum dolor sit amet"
        },
        {
            user: "Jihad",
            date: "1 bulan lalu",
            content: "lorem ipsum dolor sit amet"
        }
    ]

    return (
        <section className="flex flex-col px-[10vw] mt-24 mx-auto gap-2">
            <article className="account flex items-center gap-2">
                <div className="flex">
                    <IconUserCircle stroke={1.5} width={32} height={32} />
                </div>
                <div className="flex flex-col h-full">
                    <p className="font-bold">Umar Jihad</p>
                    <p className="text-sm">4 bulan lalu</p>
                </div>
            </article>
            <article className="title font-bold text-xl">Lorem ipsum dolor sit amet</article>
            <article className="thread flex flex-col rounded-lg gap-2">
                <article className="content p-2 rounded-lg bg-white shadow-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum libero quaerat sed perspiciatis harum, suscipit quis magni quisquam minus blanditiis aliquam ipsa neque velit corrupti. Aliquam unde assumenda non consequuntur.</article>
                <article className="comments-container flex flex-col rounded-lg bg-white shadow-lg">
                    <p className="font-bold border-b p-2 border-[#ccc]">Komentar</p>
                    <article className="comments">
                    {comments.map((comment, index) => (
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
                    </article>
                </article>
                <form className="create-comment flex flex-col gap-2 rounded-lg bg-white shadow-lg">
                    <textarea placeholder="Isi komentar" rows={7} className="p-2 outline-none border-b border-[#ccc] resize-none"></textarea>
                    <button type="submit" className="py-2 px-6 mb-2 mr-2 rounded-full bg-custom-green text-white self-end w-fit cursor-pointer">Kirim</button>
                </form>
            </article>
        </section>
    )
}