import { ShoppingBag, User, Headset, Search, ChevronDown } from "lucide-react"
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
            <img className="h-full w-auto mr-auto brightness-0" src="/lumiere_east_logo.png"/>
            <div className="hidden md:flex flex-1 gap-15 h-full items-center px-10">
                <a>Mulberry Silk</a>
                <a>Wool Blend</a>
                <a>Classic Designs</a>
                <a>Gift Guide</a>
                <a>Shop All</a>
            </div>
            <div className="block relative md:hidden">
                <button className="flex hover:underline"
                onClick={(event)=>togglemobileHeader(!mobileHeader)}
                >
                    Mulberry Silk <ChevronDown/>
                </button>
                <div 
                className={`fixed bg-white md-shadow
                border-2 border-black flex flex-col 
                ${mobileHeader ? "block" : "hidden"}
                `}>
                    <a>Mulberry Silk</a>
                    <a>Wool Blend</a>
                    <a>Classic Designs</a>
                    <a>Gift Guide</a>
                    <a>Shop All</a>
                </div>
            </div>

            <button><Search/></button>
            <div className="relative flex flex-col">
                <button id="support" className="flex gap-1.5" onClick={()=>togglesupportWindow(!supportWindow)}>
                    <Headset/>Support
                </button>
                <div className={`${supportWindow ? "block" : "hidden"} bg-white border-2 border-black md-shadow fixed top-25`}>
                    Hi! How can we help you?
                </div>

            </div>
            <a href="https://google.com"><ShoppingBag/></a>
            <a href="/login"><User/></a>
        </div>
    )
}