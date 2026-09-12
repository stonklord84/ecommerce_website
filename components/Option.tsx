type OptionProps = {
    dropdown: boolean;
    toggleDropdown: (dropdown: boolean) => void;
    changeCurrency: (currency: string) => void;
    value: string;
}

export default function Option({dropdown, toggleDropdown, changeCurrency, value}: OptionProps){
    return(
        <button
        onClick={()=>{
            toggleDropdown(!dropdown);
            changeCurrency(value)
        }}
        className="bg-black hover:bg-gray-800 text-lg">
            {value}
        </button>
    )
}