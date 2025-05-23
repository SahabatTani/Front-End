export default function Header({ title }){
    return (
        <header className="header flex h-[40vh] w-full items-center">
            <div className="inner-header flex items-center w-full h-full bg-gradient-to-r from-custom-green from-10% to-transparent text-white pl-[10vw] pt-14 tablet:pl-[5vw]">
                <p className="font-bold text-2xl">{title}</p>
            </div>
        </header>
    )
}