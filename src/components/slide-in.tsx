"use client"
import React from 'react';
import Image from 'next/image';
import { IoClose } from "react-icons/io5";
import { Instagram, Facebook } from 'lucide-react';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconStyle = "w-8 h-8 sm:w-10 sm:h-10 text-[#5D60a6] hover:text-[#04d9b2] transition-colors duration-300";

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  return (
      <div className={`fixed top-0 left-0 w-[70vw] sm:w-80 lg:w-96 h-[85vh] sm:h-full bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 rounded-r-3xl sm:rounded-none`}>
        <div className="relative h-24 sm:h-48">
          <div className="absolute -top-3 left-0 right-0 flex justify-center">
            <Image src="/icono-menu.svg" alt="Menu Icon" width={120} height={120} className="w-28 h-28 sm:w-40 sm:h-40" />
          </div>
          <button onClick={onClose} className="absolute top-1 right-2 sm:top-4 sm:right-4 text-[#04d9b2] font-bold">
            <IoClose className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>
        </div>
        <nav className="px-4 mt-2 sm:mt-4">
          <ul className="space-y-4 sm:space-y-8 lg:space-y-6">
            <li><a href="/cards" className="block py-2 sm:py-1 lg:py-2 text-[#5D60a6] hover:text-[#04d9b2] font-geometos font-bold text-xl sm:text-2xl lg:text-xl">TARJETAS</a></li>
            <li><a href="#" className="block py-2 sm:py-1 lg:py-2 text-[#5D60a6] hover:text-[#04d9b2] font-geometos font-bold text-xl sm:text-2xl lg:text-xl">POSTALES</a></li>
            <li><a href="#" className="block py-2 sm:py-1 lg:py-2 text-[#5D60a6] hover:text-[#04d9b2] font-geometos font-bold text-xl sm:text-2xl lg:text-xl">CALENDARIOS</a></li>
            <li><a href="#" className="block py-2 sm:py-1 lg:py-2 text-[#5D60a6] hover:text-[#04d9b2] font-geometos font-bold text-xl sm:text-2xl lg:text-xl">ALBUM DE FOTOS</a></li>
            <li><a href="#" className="block py-2 sm:py-1 lg:py-2 text-[#5D60a6] hover:text-[#04d9b2] font-geometos font-bold text-xl sm:text-2xl lg:text-xl">SOBRE NOSOTROS</a></li>
            <li><a href="#" className="block py-2 sm:py-1 lg:py-2 text-[#5D60a6] hover:text-[#04d9b2] font-geometos font-bold text-xl sm:text-2xl lg:text-xl">CONTACTO</a></li>
          </ul>
        </nav>
        <div className="absolute bottom-6 sm:bottom-16 left-4 right-4">
          <div className="flex justify-center space-x-4 sm:justify-between sm:space-x-6">
            <a href="https://www.instagram.com/tarjetasconamor__oficial?igsh=MXgxdnRscmNlc3A3ZA%3D%3D&utm_source=qr"
               className="hover:scale-110 transition-transform duration-300"
               target="_blank"
               rel="noopener noreferrer">
              <Instagram className={iconStyle} />
            </a>
            <a href="https://www.facebook.com/share/TEdLD5xA13bKQYvr/?mibextid=LQQJ4d"
               className="hover:scale-110 transition-transform duration-300"
               target="_blank"
               rel="noopener noreferrer">
              <FaFacebook className={iconStyle} />
            </a>
            <a href="#" className="hover:scale-110 transition-transform duration-300">
              <svg className={iconStyle} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform duration-300">
              <svg className={iconStyle} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
            <a href="#" className="hover:scale-110 transition-transform duration-300">
              <FaYoutube className={iconStyle} />
            </a>
          </div>
        </div>
      </div>
  );
};

export default SideMenu;
