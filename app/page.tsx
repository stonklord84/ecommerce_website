'use client'
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Catalogue from "@/components/Catalogue";
import HeaderMobile from "@/components/HeaderMobile";

export default function Home() {
  const [currency, changeCurrency] = useState('CAD')
  const [dropdown, toggleDropdown] = useState(false)
  const [supportWindow, togglesupportWindow] = useState(false)
  const [mobileHeader, togglemobileHeader] = useState(false)
  return (
    <div className="w-full">
      <Navbar currency={currency} changeCurrency={changeCurrency}
      dropdown={dropdown} toggleDropdown={toggleDropdown}/>
      <Header supportWindow={supportWindow} 
      togglesupportWindow={togglesupportWindow}
      mobileHeader={mobileHeader}
      togglemobileHeader={togglemobileHeader}/>
      <HeaderMobile
      mobileHeader={mobileHeader}
      togglemobileHeader={togglemobileHeader}
      />
      <div className={`${mobileHeader? 'hidden' : 'block'}`} id="everything-else">
        <Hero/>
        <Catalogue currency={currency} changeCurrency={changeCurrency}/>
      </div>
    </div>
  );
}
