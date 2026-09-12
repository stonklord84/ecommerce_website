import { ShoppingBag, User, Headset, Search } from "lucide-react"

export default function Header(){
    return(
        <div className="flex items-center bg-white text-black w-full h-20 px-10 gap-5 border-y border-black">
            <img className="h-full w-auto mr-auto brightness-0" src="/lumiere_east_logo.png"/>
            <div className="flex flex-1 gap-15 h-full items-center px-10">
                <a>Mulberry Silk</a>
                <a>Wool Blend</a>
                <a>Classic Designs</a>
                <a>Gift Guide</a>
                <a>Shop All</a>
            </div>
            
            <button><Search/></button>
            <button className="flex gap-1.5"><Headset/>Support</button>
            <a href="https://google.com"><ShoppingBag/></a>
            <a href="/login"><User/></a>
        </div>
    )
}