import React, { useState } from 'react';
import { X, Eye, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Modal from './modal';
import { CardTemplate } from '@/components/cards/card-templates';
import { IoArrowBack } from 'react-icons/io5';

interface PersonalizeHeaderProps {
  onAddToBasket: () => void;
  template: CardTemplate | null;
}

const PersonalizeHeader: React.FC<PersonalizeHeaderProps> = ({ onAddToBasket, template }) => {
  const router = useRouter();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleExit = () => {
    router.push('/cards');
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const getSvgPath = (pageNum: number) => {
    return template ? `/templates/template-${template.id}/${pageNum}.svg` : '';
  };

  return (
    <>
      <header className="bg-white p-4">
        <div className="container mx-auto flex flex-row-reverse md:flex-row justify-between items-center">
          <button onClick={handleExit} className="text-gray-600 hover:text-gray-800 order-2 md:order-1">
            <IoArrowBack size={24} />
          </button>
          <div className="flex space-x-2 md:space-x-4 order-1 md:order-2">
            <button onClick={handlePreview} className="bg-[#5D60a6] hover:bg-[#04d9b2] text-white px-2 py-1 md:px-4 md:py-2 rounded-full font-geometos flex items-center text-sm md:text-base">
              
              Preview
            </button>
            <button onClick={onAddToBasket} className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white px-2 py-1 md:px-4 md:py-2 rounded-full font-geometos flex items-center text-sm md:text-base">
            
              Añadir al carrito
            </button>
          </div>
        </div>
      </header>

      {template && (
        <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} title="Preview" size="large">
          <div className="grid grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((pageNum) => (
              <div key={pageNum} className="aspect-[3/4] relative">
                <img
                  src={getSvgPath(pageNum)}
                  alt={`Page ${pageNum}`}
                  className="w-full h-full object-contain border-2 border-gray-300 rounded"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm py-2 text-center">
                  Page {pageNum}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default PersonalizeHeader;
