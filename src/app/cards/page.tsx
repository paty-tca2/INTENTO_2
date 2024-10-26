"use client"; //se renderiza del lado del cliente

// importacion de componentes 
import React, { useState } from 'react';
import Image from 'next/image';
import { cardTemplates, CardTemplate } from '@/components/cards/card-templates';
import { Heart, Eye, Import } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from "@/components/header";
import './style.css';

// opciones de tarjeta 
type CardOptions = {
  type: 'ecard' | 'standard' | 'mediana' | 'grande';
  quantity: number;
};

type CardSize = {
  label: string;
  description: string;
  price: string;
  bgColor: string;
};

// declaracion del objeto para seleccionar el tamaño de la carta
const cardSizes: Record<CardOptions['type'], CardSize> = {
  ecard: { label: 'eCard', description: 'Envio instantaneo', price: '$20', bgColor: '#04d9b2' },
  standard: { label: 'Standard ', description: 'Para tus seres queridos', price: '$199', bgColor: '#5D60a6' },
  mediana: { label: 'Mediana ', description: '57 x 81 cm', price: '$299', bgColor: '#5D60a6' },
  grande: { label: 'Grande ', description: '40 x 29.5 cm', price: '$399', bgColor: '#5D60a6' },
};

// estado: utiliza para manejar el estado de la plantilla 
export default function CardsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [cardOptions, setCardOptions] = useState<CardOptions>({ type: 'standard', quantity: 1 });
  const [selectedPage, setSelectedPage] = useState(1);
  const router = useRouter();
  const { data: session } = useSession();

  // Abre un modal con los detalles de la plantilla de tarjeta seleccionada.
  const handleCardClick = (template: CardTemplate) => {
    setSelectedTemplate(template);
    setShowModal(true);
  };

  // envia una solicitud post con los datos de la tarjeta para agregar al carrito
  const handleAddToBasket = async () => {
    if (selectedTemplate && session) {
      try {
        const price = parseFloat(cardSizes[cardOptions.type].price.replace('$', ''));
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            templateId: selectedTemplate.id,
            options: cardOptions,
            price: price,
          }),
        });

        if (response.ok) {
          router.push('/carrito');
        } else {
          console.error('Failed to add item to cart');
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };

  // modificar tamaños de la tarjeta seleccionada 
  const handleSizeChange = (type: CardOptions['type']) => {
    setCardOptions({ ...cardOptions, type });
  };

  const onClose = () => setShowModal(false);
  
  // redirige a una persona para personalizar la tarjeta
  const handlePersonalize = () => {
    if (selectedTemplate) {
      router.push(`/personalize/${selectedTemplate.id}`);
    }
  };

  // Actualizar el array de miniaturas
  const thumbnails = selectedTemplate
    ? Array(4).fill(selectedTemplate.imageUrl)
    : [];

  // Categorías y estado activo
  const categories = ['Todos', 'Cumpleaños', 'Exitos', 'Amor', 'Salud y Cariño', 'Peques', 'Dia de muertos', 'Hallowen', 'Navidad', 'Dia de reyes', 'Dia de las madres', 'Dia del padre', 'Dia de la independencia', 'XV años', 'Conciertos'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3; // Cantidad de botones visibles

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const nextSlide = () => {
    if (currentIndex < categories.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const offset = -currentIndex * (100 / itemsPerView); // Calcular el desplazamiento

  return (
    <div className="container mx-auto pt-48 px-4 py-8">
      <Header />
      <h1 className="text-5xl font-geometos text-[#5D60a6] mb-6 text-center">Selecciona tu memoria</h1>
      
      {/* MENÚ DE CATEGORÍAS */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button className="text-2xl font-bold hover:text-blue-500" onClick={prevSlide}>&#9664;</button>

        {/* Contenedor del carrusel */}
        <div className="overflow-hidden w-4/5">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${offset}%)` }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-geometos text-white transition-colors ${
                  activeCategory === category ? 'bg-[#04d9b2]' : 'bg-[#5D60a6] hover:bg-[#04d9b2]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <button className="text-2xl font-bold hover:text-blue-500" onClick={nextSlide}>&#9654;</button>
      </div>

      {/* Desktop view */}
      <div className="flex hidden md:flex md:flex-wrap md:justify-center gap-6">
        {cardTemplates.filter((template) => template.categoria.includes(activeCategory)).map((template) => (
          <div 
            key={template.id} 
            className="relative group cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => handleCardClick(template)}
          >
            <Image 
              src={`/templates/TEMPLATE-${template.id}-1.webp`}
              alt={template.id} 
              width={300} 
              height={400} 
              className="w-64 h-90 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <Image 
                src={`/templates/TEMPLATE-${template.id}-1.webp`}
                alt={`${template.id} page 1`}
                width={300}
                height={400}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view 
      <div className="md:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {cardTemplates.map((template) => (
            <SwiperSlide key={template.id}>
              <div 
                className="relative group cursor-pointer transition-all duration-300 transform hover:scale-105"
                onClick={() => handleCardClick(template)}
              >
                <Image 
                  src={`/templates/TEMPLATE-${template.id}-1.webp`}
                  alt={template.id} 
                  width={300} 
                  height={400} 
                  className="w-full h-90 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  {/* ... existing hover content ... 
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      */}

      {showModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="relative bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-[95%] sm:max-w-2xl max-h-[95vh] overflow-y-auto">
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-3xl font-geometos text-[#5D60a6] mb-4">{selectedTemplate.name}</h2>
            <Image
              src={selectedTemplate.imageUrl}
              alt={selectedTemplate.name}
              width={500}
              height={400}
              className="w-full h-auto rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">{selectedTemplate.description}</p>

            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">Opciones de tamaño:</h3>
                <div className="flex gap-2 mt-2">
                  {Object.keys(cardSizes).map((sizeKey) => (
                    <button
                      key={sizeKey}
                      onClick={() => handleSizeChange(sizeKey as CardOptions['type'])}
                      className={`px-4 py-2 rounded-full text-white ${
                        cardOptions.type === sizeKey
                          ? 'bg-[#04d9b2]'
                          : 'bg-[#5D60a6] hover:bg-[#04d9b2]'
                      }`}
                    >
                      {cardSizes[sizeKey as CardOptions['type']].label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold">Cantidad:</h3>
                <select
                  value={cardOptions.quantity}
                  onChange={(e) => setCardOptions({ ...cardOptions, quantity: parseInt(e.target.value) })}
                  className="p-2 border rounded"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button 
                onClick={handleAddToBasket}
                className="bg-[#5D60a6] text-white px-4 py-2 rounded transition hover:bg-[#04d9b2]"
              >
                Agregar al carrito
              </button>
              <button
                onClick={handlePersonalize}
                className="bg-[#5D60a6] text-white px-4 py-2 rounded transition hover:bg-[#04d9b2]"
              >
                Personalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
