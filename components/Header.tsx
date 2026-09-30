import { ShoppingBag, User, Headset, Search, ChevronDown, Menu } from "lucide-react"
import { useState } from "react"

type HeaderProps = {
    supportWindow: boolean;
    togglesupportWindow: (supportWindow: boolean) => void;
    mobileHeader: boolean;
    togglemobileHeader: (mobileHeader: boolean) => void;
}

export default function Header({supportWindow, togglesupportWindow, mobileHeader, togglemobileHeader}: HeaderProps){
    return(
        <div className="flex items-center bg-white text-black w-full h-20 px-10 gap-5 border-y border-black">
            <img className="hidden md:block h-full w-auto mr-auto brightness-0" src="/lumiere_east_logo.png"/>
            <div className="hidden md:flex flex-1 gap-15 h-full items-center px-10">
                <a>Mulberry Silk</a>
                <a>Wool Blend</a>
                <a>Classic Designs</a>
                <a>Gift Guide</a>
                <a>Shop All</a>
            </div>
            <div className="flex md:hidden">
                <button onClick={()=>togglemobileHeader(!mobileHeader)}>
                    <Menu/>
                </button>
            </div>
            <img className="flex h-full w-auto brightness-0 ml-auto mr-auto md:hidden" src="/lumiere_east_logo.png"/>
            <a href="https://google.com"><ShoppingBag/></a>
            <a href="/login"><User/></a>
        </div>
    )
}