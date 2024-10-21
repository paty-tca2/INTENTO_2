import React from 'react';
import Image from 'next/image';

const products = [
  { title: 'Tarjetas', image: '/cards.jpeg' },
  { title: 'Postales', image: '/postcards.jpg' },
  { title: 'Calendarios', image: '/calendar.png' },
  { title: 'Album de fotos', image: '/album.png' },
];

const ProductShowcase = () => {
  return (
    <div className="text-center p-8 sm:p-16 lg:p-24 bg-white">
     <h2 className="text-2xl sm:text-7xl text-[#5D60a6] font-geometos mb-8 sm:mb-16">
  <span >Nuestros</span>{' '}
  <span className="font-bold">productos</span>
</h2>
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-16">
        {products.map((product, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:-translate-y-4 group"
          >
            <div className="w-32 h-32 sm:w-64 sm:h-64 mb-2 sm:mb-6 rounded-full overflow-hidden shadow-lg relative">
              <Image 
                src={product.image} 
                alt={product.title} 
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="text-lg sm:text-3xl text-[#5D60a6] group-hover:text-[#04d9b2] font-geometos font-semibold transition-colors duration-300">
              {product.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;