import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const SocialMediaIcons = () => {
  const iconStyle = "w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-[#5D60a6] hover:text-[#04d9b2] transition-colors duration-300";
  
  return (
    <div className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16 p-6 sm:p-8 md:p-12 lg:p-16 bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-geometos text-[#5D60a6] mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center">
  <span className="font-light">SIGUE NUESTRAS</span>{' '}
  <span className='font-bold'> REDES</span>
</h2>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
      <a href="https://www.instagram.com/tarjetasconamor__oficial?igsh=MXgxdnRscmNlc3A3ZA%3D%3D&utm_source=qr" 
           className="hover:scale-110 transition-transform duration-300"
           target="_blank"
           rel="noopener noreferrer">
          <FaInstagram className={iconStyle} />
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
          <FaWhatsapp className={iconStyle} />
        </a>
      </div>
    </div>
  );
};

export default SocialMediaIcons;