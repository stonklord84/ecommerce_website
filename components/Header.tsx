import { ShoppingBag, User, Headset, Search } from "lucide-react"
import { useState } from "react"

type HeaderProps = {
    supportWindow: boolean;
    togglesupportWindow: (supportWindow: boolean) => void
}

export default function Header({supportWindow, togglesupportWindow}: HeaderProps){
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
            <div className="relative flex flex-col">
                <button id="support" className="flex gap-1.5" onClick={()=>togglesupportWindow(!supportWindow)}>
                    <Headset/>Support
                </button>
                <div className={`${supportWindow ? "block" : "hidden"} bg-white border-2 border-black fixed top-25 w-50 h-30`}>
                    hi! How can we help you?
                </div>
            </div>
            <a href="https://google.com"><ShoppingBag/></a>
            <a href="/login"><User/></a>
        </div>
    )
}