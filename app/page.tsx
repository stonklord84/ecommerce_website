'use client'
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  const[currency, changeCurrency] = useState('CAD')
  const [dropdown, toggleDropdown] = useState(false)
  return (
    <div>
      <Navbar currency={currency} changeCurrency={changeCurrency}
      dropdown={dropdown} toggleDropdown={toggleDropdown}/>
      <Header/>
    </div>
  );
}
