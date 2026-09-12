'use client'
import "flag-icons/css/flag-icons.min.css";
import Option from "./Option";

type NavProps = {
    currency: string;
    changeCurrency: (currency: string) => void;
    dropdown: boolean;
    toggleDropdown: (dropdown: boolean) => void;
}

export default function Navbar({currency, changeCurrency, dropdown, toggleDropdown}: NavProps){
    //const [dropdown, toggleDropdown] = useState(false)
    return(
        <div className="bg-black text-white flex items-center px-12 py-0 w-full sticky top-0 space-x-8">
            <a href="/login" className="text-lg relative mr-auto">Contact Us</a>
            <div className="relative flex flex-col">
                <div className="flex px-0 py-0 items-center space-x-2">
                    <span className={`fi fi-${currency.slice(0, 2).toLowerCase()}`}></span>
                    <button onClick={()=>toggleDropdown(!dropdown)} className="px-2 py-2 bg-biege-100 hover:underline">{currency}</button>
                </div>
                <div className={`${dropdown ? "block": "hidden"} border-2 border-white w-20 h-auto right-2 top-6.5 absolute`}>
                    <div className="flex flex-col w-full">
                        <Option
                        dropdown={dropdown}
                        toggleDropdown={toggleDropdown}
                        changeCurrency={changeCurrency}
                        value='CAD'
                        />
                        <Option
                        dropdown={dropdown}
                        toggleDropdown={toggleDropdown}
                        changeCurrency={changeCurrency}
                        value='USD'
                        />
                        <Option
                        dropdown={dropdown}
                        toggleDropdown={toggleDropdown}
                        changeCurrency={changeCurrency}
                        value='EUR'
                        />
                        <Option
                        dropdown={dropdown}
                        toggleDropdown={toggleDropdown}
                        changeCurrency={changeCurrency}
                        value='CNY'
                        />
                        <Option
                        dropdown={dropdown}
                        toggleDropdown={toggleDropdown}
                        changeCurrency={changeCurrency}
                        value='GBP'
                        />
                        <Option
                        dropdown={dropdown}
                        toggleDropdown={toggleDropdown}
                        changeCurrency={changeCurrency}
                        value='AUD'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}