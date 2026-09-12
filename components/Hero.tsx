import Image from "next/image"
import { useEffect } from "react"
const images = ['/100mulberrysilk.jpg', '/lumiere_east_collection.png', '/neck.png', '/woman.jpg']

export default function Hero(){
    useEffect(()=>{
        console.log('this runs once when the page loads!')
        setInterval(()=>{console.log('every 2 seconds')}, 2000)
    }, [])
    return (
        <div className="flex w-full h-100">
            <div className="flex flex-col justify-center w-[40%]">
                <h1 className="text-5xl pl-20">Where East</h1>
                <h1 className="text-5xl pl-40">Meets West</h1>
                <p className="text-1xl pl-30">Mulberry Silk Accessories</p>
            </div>
            <div className="flex justify-center w-[60%]">
                <img src={images[2]} className="h-full w-auto"/>
            </div>
        </div>
    )
}