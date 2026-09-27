import items from '@/data/items.json'
import { useEffect } from 'react'
import { useState } from 'react'

type CatalogueProps = {
    currency: string;
    changeCurrency: (currency: string) => void;
}

export default function Catalogue({currency, changeCurrency}: CatalogueProps){
    async function frankfurter(base: string, quote: string) : Promise<number>{
        let res = await fetch(`https://api.frankfurter.dev/v2/providers/ecb/rate/${base}/${quote}`)
        let data = await res.json()
        let ffRate = data.rate
        return ffRate
    }
    const [baseCurrency, changeBaseCurrency] = useState(currency)
    const [rate, setRate] = useState(1)
    useEffect(()=>{
        frankfurter(baseCurrency, currency).then(
            (r)=>{
                console.log(r, baseCurrency, currency)
                setRate(r)
                //changeBaseCurrency(currency)
            }
        )
    }, [currency])
    return (
        <div>
            <div className="flex flex-col bg-amber-100 h-75 w-full gap-2">
                <h1 className='text-xl px-2 mt-2 mb-1'>Our Mulberry Silk Collection {'>'}</h1>
                <div className='w-full flex flex-1 overflow-x-auto gap-5 px-4 mt-1 mb-2'>
                    {items.map((item)=>
                    <div key={item.id} 
                    className='flex-none h-full w-50 bg-white border border-white rounded-[5]'>
                        <div className=' h-[75%] w-full'>
                            {item.Name}
                        </div>
                        <div className='w-full h-[25%] px-2'>
                            <h1>{item.Name}</h1>
                            <h1 className='itemPrice'>{(item.price * rate).toFixed(2)}</h1>
                        </div>
                    </div>
                    )}
                </div>
            </div>

            <br/>
            <div className="flex bg-amber-100 h-30 w-full">
            </div>
            <br/>
        </div>
    )
}