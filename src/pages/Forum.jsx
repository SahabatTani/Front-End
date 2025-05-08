import { IconMessageCircle, IconSearch, IconUserCircle } from "@tabler/icons-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Forum(){
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
        <Navbar />
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
    return (
        <section className="forum-container flex gap-4 m-auto w-[80vw] mt-4">
            <article className="flex h-fit items-center gap-2 p-2 rounded-full bg-white border border-[#ccc] focus-within:border-transparent focus-within:outline-2 focus-within:outline-custom-green">
                <IconSearch stroke={1.5} />
                <input type="search" placeholder="Cari" className="outline-none" />
            </article>
            <article className="flex flex-col gap-4">
                <button type="button" className="flex items-center gap-2 p-2 border border-[#ccc] rounded-full bg-white cursor-pointer" onClick={onOpenModal}>
                    <IconUserCircle />
                    <p>Buat diskusi baru</p>
                </button>
                <section className="flex flex-col border border-[#ccc] rounded-lg bg-white">
                    <Link to={"/forum/"} className="flex p-2 gap-2 border-b border-[#ccc]">
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
                    <Link to={"/forum/"} className="flex p-2 gap-2 border-b border-[#ccc]">
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
                    <Link to={"/forum/"} className="flex p-2 gap-2">
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
    )
}

function NewDiscussionModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[50vw] rounded-lg shadow-lg">
                <h2 className="font-bold p-2">Buat Diskusi Baru</h2>
                <form className="flex flex-col">
                    <input type="text" placeholder="Judul diskusi" className="border-t border-b border-[#ccc] p-2 outline-none" />
                    <textarea placeholder="Isi diskusi" className="border-b border-[#ccc] p-2 rounded h-40 resize-none outline-none" />
                    <div className="flex justify-end gap-2 p-2">
                        <button type="button" onClick={onClose} className="py-2 px-6 rounded-full bg-[#ff3d3d] cursor-pointer text-white">Batal</button>
                        <button type="submit" className="py-2 px-6 rounded-full bg-custom-green cursor-pointer">Kirim</button>
                    </div>
                </form>
            </div>
        </div>
    );
}