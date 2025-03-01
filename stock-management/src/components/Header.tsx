import React from 'react'
import logo from "../../public/logo.png"
import Image from 'next/image'

const Header = () => {
  return (
    <div>
      <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
      
      <Image src={logo} alt='logo' height={90} width={90}/>
      
      <span className="ml-3 text-xl">Stock Management System</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <a className="mr-5 hover:text-gray-900 cursor-pointer text-xl font-semibold">About</a>

    </nav>
   

  </div>
</header>

    </div>
  )
}

export default Header
