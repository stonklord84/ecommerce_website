import { MobileOtpType } from "@supabase/supabase-js"
import { Hind_Madurai } from "next/font/google"
import { useEffect } from "react"
import { ChevronRight } from "lucide-react"

type HeaderMobileProps = {
    mobileHeader: boolean,
    togglemobileHeader: (mobileHeader: boolean) => void
}

export default function HeaderMobile({mobileHeader, togglemobileHeader}: HeaderMobileProps){
    return(
        <div className={
        `${mobileHeader? 'flex' : 'hidden'} flex flex-col bg-amber-100 w-full h-150
        align-center space-y-5 px-10 py-5 text-black
        `}>
            <input placeholder="Search The Store"
            className="w-full bg-white outline-0"/>
            <button>
                <div className="flex">
                    <p>Mulberry Silk</p><ChevronRight/>
                </div>
            </button>
            <button>
                <div className="flex">
                    <p>Wool Blend</p><ChevronRight/>
                </div>
            </button>
            <button>
                <div className="flex">
                    <p>Gift Guide</p><ChevronRight/>
                </div>
            </button>
            <button>
                <div className="flex">
                    <p>Shop All</p><ChevronRight/>
                </div>
            </button>
        </div>
    )
}