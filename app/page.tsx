'use client'
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Catalogue from "@/components/Catalogue";

export default function Home() {
  const [currency, changeCurrency] = useState('CAD')
  const [dropdown, toggleDropdown] = useState(false)
  const [supportWindow, togglesupportWindow] = useState(false)
  return (
    <div className="w-full">
      <Navbar currency={currency} changeCurrency={changeCurrency}
      dropdown={dropdown} toggleDropdown={toggleDropdown}/>
      <Header supportWindow={supportWindow} togglesupportWindow={togglesupportWindow} />
      <Hero/>
      <Catalogue currency={currency} changeCurrency={changeCurrency}/>
    </div>
  );
}
