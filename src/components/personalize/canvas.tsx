
import React, { useState, useRef, useEffect } from 'react';
import { CardTemplate } from '@/components/cards/card-templates';
import { ChevronLeft, ChevronRight, Type, Image, X, Trash2, AlignLeft, AlignCenter, AlignRight, Palette, Maximize } from 'lucide-react';
import { FileUpload } from './file-upload';
import Draggable from 'react-draggable';
import Modal from './modal';
import { VscTextSize } from 'react-icons/vsc';
import { SwatchesPicker } from 'react-color';
import { Resizable } from 're-resizable';
import Alerta from '@/components/alerts';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Estilos opcionales

//lienzo interactivo que permite a los usuarios personalizar plantillas de tarjetas, editando texto e imágenes sobre un lienzo (canvas) predefinido

//fuentes que proporciona el sistema 
const fonts = [
  'Bavex',
  'Poppins',
  'Lust Script',
  'Melodrama',
  'Now Cloud',
  'Reselu',
  'Stardom',
  'Telma',
  'Blenny',
  'Geometos Soft',
  'Coneria Script',
  'Helvetica Neue'
];

interface CanvasProps {
  template: CardTemplate;
  selectedPage: number;
  onPageChange: (page: number) => void;
}

interface CanvasElement {
  placeholder: string;
  id: string;
  type: 'text' | 'image';
  content: string;
  position: { x: number; y: number };
  font?: string;
  size?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
  width: number;
  height: number;
  isStatic?: boolean;
}
const PageAlert = () => {
  const [showAlert, setShowAlert] = useState(false); // Inicialmente oculta

  useEffect(() => {
    // Mostrar la alerta cuando la página se cargue
    setShowAlert(true);
  }, [])
}; // Se ejecuta solo una vez al cargar la página

const Canvas: React.FC<CanvasProps> = ({ template, selectedPage, onPageChange }) => {
  const [staticElements, setStaticElements] = useState<CanvasElement[]>([]);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [fontModalOpen, setFontModalOpen] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [textoModalOpen, setextoModalOpen] = useState(false);
  const [controlArray, setControlarray] = useState(0);



  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);




  useEffect(() => {
    // Convert static placeholders to CanvasElements
    const currentPagePlaceholders = template.pages.find(p => p.pageNumber === selectedPage)?.staticPlaceholders || [];
    const staticCanvasElements = currentPagePlaceholders.map(placeholder => ({
      id: placeholder.id,
      type: placeholder.type,
      content: placeholder.content || placeholder.placeholder || '',
      position: placeholder.position,
      font: placeholder.font || 'Lust Script',
      size: placeholder.type === 'text' ? 16 : undefined,
      color: placeholder.color || '#04D9B2',
      align: 'left',
      width: placeholder.size.width,
      height: placeholder.size.height,
      isStatic: true,
      placeholder: placeholder.placeholder || ''
    }));
    setStaticElements(staticCanvasElements as CanvasElement[]);
  }, [template, selectedPage]);

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setStaticElements(staticElements.map(el => el.id === id ? { ...el, ...updates } : el));
  };


  class Component extends React.Component {

    render() {
      return <SwatchesPicker />
    }
  }

  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60];
  const colores = ['#5D60A6', '#070A40', '#2D4BA6', '#737373', '#04D9B2'];

  //botones de menu 
  const renderEditorContent = () => (
    <div className=" flex bg-white rounded-md p-4 w-24">
      <div className="flex flex-wrap justify-center ">
        {/*{activeElement && staticElements.find(el => el.id === activeElement)?.type === 'text' && (*/}
        <div className="">
          <div>
            <div>
              {renderElements()}
            </div>
          </div>

          <button
            className="w-16 h-16 p-1  bg-gray-50 text-black border-black hover:bg-[#04d9b2]  font-geometos rounded-md flex flex-col items-center justify-center transition-colors duration-200"
            onClick={(renderElements) => setFontModalOpen(true)}
          >
            <Type size={15} />
            <span className="text-xs mt-1">Fuente</span>
          </button>
          <br />
          <button
            className="w-16 h-16 p-2 bg-gray-50 text-black font-geometos rounded-md flex flex-col items-center justify-center transition-colors duration-200"
            onClick={() => setColorModalOpen(true)}
          >
            <Palette size={15} />
            <span className="text-xs mt-1">Color</span>
          </button>
          <br />
          {/*
            <button
              className="w-16 h-16 p-2 bg-gray-50 text-black font-geometos rounded-md flex flex-col items-center justify-center transition-colors duration-200"
              onClick={handleImageUpload}
            >
              <Image size={15} />
              <span className="text-xs mt-1">Añadir Imagen</span>
            </button>
             */}
             
          <button
            className="w-16 h-16 p-2 bg-gray-50 text-black font-geometos rounded-md flex flex-col items-center justify-center transition-colors duration-200"
            onClick={triggerFileInput}
          >
            <Image size={15} />
            <span className="text-xs mt-1">Añadir Imagen</span>
          </button>

          {/* Input de tipo file oculto */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />

          <br />


        </div>
        {activeElement && staticElements.find(el => el.id === activeElement)?.type === 'image' && (
          <div>
            <label className="w-16 h-16 p-2 bg-gray-50 text-black font-geometos rounded-md flex flex-col items-center justify-center transition-colors duration-200">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Image size={20} />
              <span className="text-xs mt-1">Subir Imagen</span>
            </label>
          </div>


        )}
      </div>

    </div>
  );

  //agregar cuadro de texto a las tarjetas 

  const addTextElement = () => {
    const newTextElement: CanvasElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'Nuevo texto',
      position: { x: 50, y: 50 },
      font: 'Poppins',
      size: 16,
      color: '#000000',
      align: 'left',
      width: 100,
      height: 50,
      isStatic: false,
      placeholder: 'Nuevo texto'
    };
    setStaticElements([...staticElements, newTextElement]);


  };

  const addImageElement = (imageSrc: string) => {
    const newImageElement: CanvasElement = {
      id: `image-${Date.now()}`,
      type: 'image',
      content: imageSrc,
      position: { x: 0, y: 0 }, // Posición inicial
      width: 100,
      height: 100,
      isStatic: false,
      placeholder: ''
    };
    setStaticElements((prevElements) => [...prevElements, newImageElement]);
  };

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click(); // Simula clic en el input
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageSrc = event.target?.result as string;
        addImageElement(imageSrc); // Agrega la imagen al lienzo
      };
      reader.readAsDataURL(file);
    }
  };

  /*----------------------
  const addImageElement = () => {
    const newImageElement: CanvasElement = {
      id: `image-${Date.now()}`,
      type: 'image',
      content: '', // URL o base64 de la imagen
      position: { x: 50, y: 50 },
      width: 100,
      height: 100,
      isStatic: false,
      placeholder: ''
    };
    setStaticElements([...staticElements, newImageElement]);
  };
*/

  const renderElements = () => {
    
    return staticElements.map((element) => {
      if (element.type === 'text') {
        return (
          <Draggable
            key={element.id}
            defaultPosition={{ x: element.position.x, y: element.position.y }}
            grid={[25, 25]}
            onStop={(e, data) => {
              const updatedElements = staticElements.map((el) => {
                if (el.id === element.id) {
                  return { ...el, position: { x: data.x, y: data.y } };
                }
                return el;
              });
              setStaticElements(updatedElements);
            }}
          >
            <div
              style={{
                position: 'absolute',
                fontFamily: element.font,
                fontSize: element.size,
                color: element.color,
                textAlign: element.align,
                width: element.width,
                height: element.height,
                cursor: 'move',
                zIndex: 10 // Asegúrate de que el texto esté siempre delante
              }}
            >
              {element.content}
            </div>
          </Draggable>
        );
      }
      return null;
    });
  };
  const getSvgPath = (pageNum: number) => {
    return `/templates/template-${template.id}/${pageNum}.svg`;
  };
  

  //menu de navegacion de la parte inferior de la pagina de editar de plantillas
  const renderPageThumbnails = () => (
    <nav className=' fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 bg-slate-700'>
      <div className="flex justify-center space-x-4 overflow-x-auto">
        {[1, 2, 3, 4].map((pageNum) => (

          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={` flex relative w-16 h-24 border-2 ${selectedPage === pageNum ? 'border-blue-500' : 'border-gray-300'
              } rounded overflow-hidden transition-all duration-200 hover:border-blue-300 `}
          >
            <img
              src={getSvgPath(pageNum)}
              alt={`Page ${pageNum}`}
              className="w-full h-full object-cover"
            />

          </button>
        ))}
      </div>
    </nav>
  );


  return (
    <div className=" flex w-full flex items-center grid gap-2">
      
      {/* Main content */}
      <div className="flex flex-col items-center">
        {/* Page navigation for desktop */}
        {!isMobile /*&& renderPageNavigation()*/}

        <div className="flex flex-col  justify-center w-full max-w-4xl ">
          {/* Canvas area and options */}
          <div className="flex flex-col md:flex-row items-start  ">
            {/* Canvas options */}
            {!isMobile && (
              <div className="w-20 md:mb-0 md:mr-4">
                {renderEditorContent()}
              </div>
            )}

            {/* Canvas */}
            <div
              //marco del editor de plantilla
              className="aspect-[3/4] bg-blue rounded-lg overflow-hidden relative border-4 ml-10"
              style={{ width: '400px', height: '533px' }}
              onClick={() => setActiveElement(null)}
            >
              <object
                type="image/svg+xml"
                data={getSvgPath(selectedPage)}
                className="w-full h-full absolute top-0 left-0"
              >
                Your browser does not support SVG
              </object>
              {/*Contenedor donde esta la imagen de la tarjeta */}
              <div className="absolute inset-0  overflow-hidden">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${controlArray * 100}%)` }}>
                  {staticElements.map((element) => (//arreglo de las imagenes 
                    <div
                      key={element.id+1
                      }//se genera un conetendo para cada imagen 
                      className='w-full flex-shrink-0'
                      
                      style={{
                        position: 'relative',// la imagen se posiciona dentro del contenedor 
                        left: `${element.position.x}px`,
                        top: `${element.position.y}px`,
                        width: `${element.width}px`,
                        height: `${element.height}px`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveElement(element.id+1);
                      }}
                    >
                      {element.type === 'image' ? (
                        element.content ? (
                          <img src={element.content} alt="Uploaded" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-yellow-200 flex items-center justify-center">
                            <Image size={24} />
                          </div>
                        )
                      ) : (
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          className="w-full h-full p-2"
                          style={{
                            fontFamily: element.font || 'Lust Script, Arial, sans-serif',
                            fontSize: `${element.size || 18}px`,
                            color: element.color || '#04D9B2',
                            textAlign: element.align || 'left',
                          }}
                          onBlur={(e) => {//Cuando el usuario deja de editar (evento onBlur), se actualiza el contenido del elemento con el nuevo texto que el usuario ha escrito (updateElement(element.id, { content: e.currentTarget.textContent || '' })).
                            updateElement(element.id+1, { content: e.currentTarget.textContent || '' });
                          }}
                        >
                          {element.content || element.placeholder}
                        </div>
                      )}
                      {activeElement === element.id +1&& (
                        <div className="absolute inset-0 ring-2 ring-blue-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Page thumbnails */}
            {!isMobile && renderPageThumbnails()}
            
          </div>
        </div>

        {/* Page navigation for mobile 
      Rrendernavigation botonoes para mover de cara en el editor de plantilla */}
        {isMobile /*&& renderPageNavigation()*/}

        {/* Font Modal */}
        <Modal isOpen={fontModalOpen} onClose={() => setFontModalOpen(false)} title="Seleccionar Fuente">
          <div className="grid grid-cols-2 gap-2">
            {fonts.map((font) => (
              <button
                key={font}
                className="p-2 bg-[#5D60a6] hover:bg-[#04D9B2] rounded text-sm"
                style={{ fontFamily: font }}
                onClick={() => {
                  if (activeElement) {
                    updateElement(activeElement, { font });
                  }
                  setFontModalOpen(false);
                }}
              >
                {font}
              </button>
            ))}
          </div>
        </Modal>


        <Modal isOpen={colorModalOpen} onClose={() => setColorModalOpen(false)} title="Seleccionar Color">
          <div className='grid grid-cols-3 gap-2'>
            {colores.map((color) => (
              <button
                key={color}
                className='w-12 h-12 rounded-full'
                style={{ backgroundColor: color }}
                onClick={() => {
                  if (activeElement) {
                    updateElement(activeElement, { color });
                  }
                  setColorModalOpen(false);
                }} />
            ))}

          </div>
          
        </Modal>


      </div>
      
    </div>
  );
};

export default Canvas;

































{/* Color Modal */ }

{/*Libreria SwatchesPicker para poner todos la paleta de colores */ }
{/*<Modal isOpen={colorModalOpen} onClose={() => setColorModalOpen(false)} title="Seleccionar Color">
        <SwatchesPicker
          color={activeElement ? staticElements.find(el => el.id === activeElement)?.color : '#04D9B2'}
          onChangeComplete={(color) => {
            if (activeElement) {
              updateElement(activeElement, { color: color.hex });
            }
            setColorModalOpen(false);
          }}
        />
        </Modal>*/}



{/* Size Modal 
        <Modal isOpen={sizeModalOpen} onClose={() => setSizeModalOpen(false)} title="Seleccionar Tamaño de Fuente">
          <div className="grid grid-cols-3 gap-2">
            {fontSizes.map((size) => (
              <button
                key={size}
                className="p-2 bg-[#5D60a6] hover:bg-[#04D9B2] rounded text-sm"
                onClick={() => {
                  if (activeElement) {
                    updateElement(activeElement, { size });
                  }
                  setSizeModalOpen(false);
                }}
              >
                {size}px
              </button>
            ))}
          </div>
        </Modal>
        {/* Color Modal */}
//______________________________________________________________________________________
/*
  // Botones para mover de una plantilla a otra 
  const renderPageNavigation = () => (
    <div className="flex justify-center items-center space-x-4 mb-4">

      <button
        className="bg-gray-200 p-2 rounded-full"
        onClick={() => onPageChange(selectedPage > 1 ? selectedPage - 1 : 4)}
      >
        <ChevronLeft size={20} />
      </button>
      <span className="font-bold">{selectedPage} / 4</span>
      <button
        className="bg-gray-200 p-2 rounded-full"
        onClick={() => onPageChange(selectedPage < 4 ? selectedPage + 1 : 1)}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
*/

//-------------------------------------------------------------------------------------------
          {/*

          <button
            className="w-16 h-16 p-2 bg-gray-50 text-black font-geometos rounded-md flex flex-col items-center justify-center transition-colors duration-200"
            onClick={() => setSizeModalOpen(true)}
          >
            <VscTextSize size={20} />
            <span className="text-xs mt-1">Tamaño</span>
          </button>
          <br />
          
          <button
            className="w-16 h-16 p-2 bg-gray-50 text-black font-geometos rounded-md flex flex-col items-center justify-center transition-colors duration-200"
            onClick={addTextElement
            }
          >
            <Type size={20} />
            <span className="text-xs mt-1">Añadir Texto</span>
          </button>

          <br />
          {
            <button
              className="w-16 h-16 p-2 bg-gray-50 text-black font-geometos rounded-md flex flex-col items-center justify-center transition-colors duration-200"
              onClick={() => {
                const currentAlign = staticElements.find(el => el.id === activeElement)?.align || 'left';
                const nextAlign = currentAlign === 'left' ? 'center' : currentAlign === 'center' ? 'right' : 'left';
                updateElement(activeElement, { align: nextAlign });
              }}
            >
              <AlignCenter size={20} />
              <span className="text-xs mt-1">Alinear</span>
            </button> */}









