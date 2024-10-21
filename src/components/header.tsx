"use client"
import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { FaSearch, FaStar, FaUser, FaShoppingCart } from "react-icons/fa";
import SideMenu from './slide-in';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-9 md:px-8 md:py-9 bg-white shadow-md">

          <div className="flex items-center">
            <button onClick={toggleSideMenu}>
              <IoMenu className="text-black h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-10 lg:w-10" />
            </button>
          </div>

          <div className="flex-grow flex justify-center items-center absolute inset-0 pointer-events-none">
            <Link href="/" className="pointer-events-auto">
              <h1 className="text-lg sm:text-lg md:text-3xl lg:text-4xl text-[#04d9b2] font-coneria font-bold text-center">
                compartiendo tus memorias...
              </h1>
            </Link>
          </div>

          <div className="flex items-center space-x-3 md:space-x-5">
            <FaSearch className="hidden md:block text-black h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
            <FaStar className="hidden md:block text-black h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
            <Link href="/auth/sign-up">
              <FaUser className="text-black h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 cursor-pointer" />
            </Link>
            <Link href="/carrito">
              <FaShoppingCart className="text-black h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
            </Link>
          </div>
        </header>

        {/* Menú lateral */}
        <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
      </>
  );
};

export default Header;
