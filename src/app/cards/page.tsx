"use client"//se renderiza del lado del cliente


// importacion de componentes 
import React, { useState } from 'react';
import Image from 'next/image';
import { cardTemplates, CardTemplate } from '@/components/cards/card-templates';
import { Heart, Eye, Import } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from "@/components/header";
import './style.css';

//opciones de tarjeta 
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


//declaracion del objeto para seleccionar el tamaño de la carta
const cardSizes: Record<CardOptions['type'], CardSize> = {
  ecard: { label: 'eCard', description: 'Envio instantaneo', price: '$20', bgColor: '#04d9b2' },
  standard: { label: 'Standard ', description: 'Para tus seres queridos', price: '$199', bgColor: '#5D60a6' },
  mediana: { label: 'Mediana ', description: '57 x 81 cm', price: '$299', bgColor: '#5D60a6' },
  grande: { label: 'Grande ', description: '40 x 29.5 cm', price: '$399', bgColor: '#5D60a6' },
};

//estado: uiliza para manejar el estado de la plantilla 
export default function CardsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [cardOptions, setCardOptions] = useState<CardOptions>({ type: 'standard', quantity: 1 });
  const [selectedPage, setSelectedPage] = useState(1);
  const router = useRouter();
  const { data: session } = useSession();

  //Abre un modal con los detalles de la plantilla de tarjeta seleccionada.
  const handleCardClick = (template: CardTemplate) => {
    setSelectedTemplate(template);
    setShowModal(true);
  };
//envia una solicitud post con los datos de la tarjeta para agregar al carrio
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
//modificar tamaños de la tarjeta seleccionada 
  const handleSizeChange = (type: CardOptions['type']) => {
    setCardOptions({ ...cardOptions, type });
  };

  const onClose = () => setShowModal(false);
//redirige a una persona para personalizar la tarjeta
  const handlePersonalize = () => {
    if (selectedTemplate) {
      router.push(`/personalize/${selectedTemplate.id}`);
    }
  };

  // Update the thumbnails array
  const thumbnails = selectedTemplate
    ? Array(4).fill(selectedTemplate.imageUrl)
    : [];

  const categories = ['Todos','Cumpleaños', 'Exitos', 'Amor', 'Salud y Cariño', 'Peques','Dia de muertos','Hallowen','Navidad','Dia de reyes','Dia de las madres','Dia del padre','Dia de la independencia','XV años','Conciertos'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    
    //selccionamos una categoria de la tarjeta
    <div className="container mx-auto pt-48 px-4 py-8">
      <Header/>
      <h1 className="text-5xl font-geometos text-[#5D60a6] mb-6 text-center">Selecciona tu memoria</h1>
      
      {/* MENU DE CATEGORIAS */}
      {/* Botón para mostrar todas las plantillas */}
      
      
      <div className="flex flex-wrap justify-center gap-2 mb-8">
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

      {/* Desktop view */}
      {/*VISTA PARA ESCRITORIO HACER RESPONSIVA LA PAGINA*/}
      <div className=" flex hidden md:flex md:flex-wrap md:justify-center gap-6">
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

            <div className="flex flex-col md:flex-row mt-8 sm:mt-0">
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <div className="relative">
                  <Image 
                    src={`/templates/TEMPLATE-${selectedTemplate.id}-${selectedPage}.webp`}
                    alt={`${selectedTemplate.id} page ${selectedPage}`}
                    width={300} 
                    height={400} 
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
                <div className="flex mt-2 space-x-2 overflow-x-auto">
                  {[1, 2, 3, 4].map((pageNum) => (
                    <div
                      key={pageNum}
                      className={`w-16 h-16 flex-shrink-0 cursor-pointer ${pageNum === selectedPage ? 'border-2 border-[#04d9b2] rounded-lg' : ''}`}
                      onClick={() => setSelectedPage(pageNum)}
                    >
                      <Image
                        src={`/templates/TEMPLATE-${selectedTemplate.id}-${pageNum}.webp`}
                        alt={`${selectedTemplate.id} page ${pageNum}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/*MUESTRA VENTANA EMERGENTE PARA SELECCIONAR EL TAMAÑO CANTIDAD Y EL BOTON DE PERSO */}
              <div className="w-full md:w-1/2 md:ml-4">
                <h2 className="text-2xl font-geometos text-[#5D60a6] mb-4">Selecciona el tamaño</h2>
                {Object.entries(cardSizes).map(([type, { label, description, price }]) => (
                  <div 
                    key={type} 
                    className={`mb-2 p-2 border rounded cursor-pointer ${cardOptions.type === type ? 'border-[#04d9b2]' : ''}`}
                    onClick={() => handleSizeChange(type as CardOptions['type'])}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        checked={cardOptions.type === type} 
                        onChange={() => {}} 
                        className="mr-2"
                      />
                      <div>
                        <div className="font-geometos text-[#5D60a6]">{label}</div>
                        <div className="text-sm text-black font-geometos">{description}</div>
                      </div>
                      <div className="ml-auto font-geometos text-[#5D60a6]">{price}</div>
                    </div>
                  </div>
                ))}
                {/*VISTA PREVIA DEL DISEÑO DE LA PLANTILLA */}
                <div className="mb-4">
                  <label htmlFor="quantity" className="block text-sm font-geometos text-[#5D60a6] mb-2">Cantidad</label>
                  <select
                    id="quantity"
                    value={cardOptions.quantity}
                    onChange={(e) => setCardOptions({ ...cardOptions, quantity: parseInt(e.target.value) })}
                    className="w-full p-2 border rounded font-geometos text-[#5D60a6]"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4 mt-4">
              <button 
                onClick={handlePersonalize}
                className="bg-[#5D60a6] hover:bg-[#04d9b2] text-white px-4 py-2 rounded-full font-geometos w-full md:w-auto"
              >
                Personalizar
              </button>
              <button 
                onClick={handleAddToBasket}
                className="bg-[#5D60a6] hover:bg-[#04d9b2] text-white px-4 py-2 rounded-full font-geometos w-full md:w-auto"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}