import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="w-full mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-start">
            <div className="space-y-2 md:space-y-4 mb-6 md:mb-0 text-left">
              <a href="/contacto" className="block text-white font-geometos transition-colors duration-300">CONTACTO</a>
              <a href="/terminos" className="block text-white font-geometos transition-colors duration-300">TERMINOS Y CONDICIONES</a>
              <a href="/privacidad" className="block text-white font-geometos transition-colors duration-300">AVISO DE PRIVACIDAD</a>
              <a href="/faq" className="block text-white font-geometos transition-colors duration-300">PREGUNTAS FRECUENTES</a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center mt-8">
          <div className="w-20 h-20 mb-4 relative">
            <Image
              src="/icono-footer.png"
              alt="TCA Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="text-sm sm:text-base md:text-lg text-white font-geometos text-center">
            COPYRIGHT © 2024 TAC. ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;