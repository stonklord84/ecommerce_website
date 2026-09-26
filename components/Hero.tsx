import Image from "next/image"
import { useEffect } from "react"
const images = ['/100mulberrysilk.jpg', '/lumiere_east_collection.png', '/neck_nobg.png', '/woman.jpg']

export default function Hero(){
    useEffect(()=>{
        console.log('this runs once when the page loads!')
        setInterval(()=>{console.log('every 2 seconds')}, 2000)
    }, [])
    return (
        <div className="flex w-full h-80">
            <div className="flex flex-col justify-center w-[40%]">
                <h1 className="text-5xl pl-20 HeroText">Where East</h1>
                <h1 className="text-5xl pl-40 HeroText">Meets West</h1>
                <br/>
                <p className="italic text-xl pl-20">Every Lumiere East scarf begins as a single strand of silk — spun by a silkworm&#8217;s whole life, from a mulberry leaf to a scarf.</p>
            </div>
            <div className="flex justify-center w-[60%] pt-5 pb-5">
                <img src={images[2]} className="h-full w-auto"/>
            </div>
        </div>
    )
}