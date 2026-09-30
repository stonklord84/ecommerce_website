'use client'
import items from '@/data/items.json'
import { Provider, useEffect } from 'react'
import { useState } from 'react'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)

type CatalogueProps = {
    currency: string;
    changeCurrency: (currency: string) => void;
}

interface Product {
    product_id: string;
    product_name: string;
    product_price: number
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
    const [products, setProducts] = useState<Product[]>([])
    
    useEffect(()=>{
        frankfurter(baseCurrency, currency).then(
            (r)=>{
                console.log(r, baseCurrency, currency)
                setRate(r)
                //changeBaseCurrency(currency)
            }
        )
    }, [currency])

    useEffect(()=>{
        supabase.from('products').select("*").then(({error: error, data})=>{
            console.log(data, 'does data exist')
            setProducts(data ?? [])
        })
    }, [])
    return (
        <div>
            <div className="flex flex-col bg-amber-100 h-75 w-full gap-2 text-black">
                <h1 className='text-xl px-2 mt-2 mb-1'>Our Mulberry Silk Collection {'>'}</h1>
                <div className='w-full flex flex-1 overflow-x-auto gap-5 px-4 mt-1 mb-2'>
                    {products.map(item =>
                    <div key={item.product_id}
                    className='flex flex-col w-50 h-full bg-white rounded-[20px] overflow-hidden'>
                        <div className='flex justify-center w-full h-[70%] overflow-hidden py-1'>
                            <img 
                            src={supabase.storage.from('public-assets').getPublicUrl(`gallery/${item.product_name}.img`).data.publicUrl}
                            />
                        </div>
                        <div className='w-full h-[30%] p2-1'>
                            <p>{item.product_name}</p>
                            <p>{item.product_price}</p>
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