export type CardTemplate = {
  id: string;
  imageUrl: string;
  categoria:string [];
  
  pages: {
    pageNumber: number;
    staticPlaceholders: {
      color: string;
      font: string;
      id: string;
      type: 'image' | 'text';
      position: { x: number; y: number };
      size: { width: number; height: number };
      content?: string;
      placeholder?: string;
    }[];
  }[];
};

export const cardTemplates: CardTemplate[] = [
  { 
    id: '1', 
    imageUrl: '/templates/tarjeta1.png',
    categoria:['Dia de muertos','Exitos','Dia de las madres','Dia del padre','Todos'],
    pages: [
      {
        pageNumber: 1,
        staticPlaceholders: [
          {
            id: 'image1',
            type: 'image',
            position: { x: 20, y: 20 },
            size: { width: 150, height: 150 },
            placeholder: 'Insert image 1',
            color: "",
            font: ""
          },
          {
            id: 'image2',
            type: 'image',
            position: { x: 100, y: 100 },
            size: { width: 200, height: 200 },
            placeholder: 'Insert image 2',
            color: "",
            font: ""
          },
          {
            id: 'image3',
            type: 'image',
            position: { x: 200, y: 50 },
            size: { width: 150, height: 150 },
            placeholder: 'Insert image 3',
            color: "",
            font: ""
          },
          {
            id: 'title',
            type: 'text',
            position: { x: 50, y: 300 },
            size: { width: 300, height: 50 },
            content: '',
            placeholder: 'Edita tu título',
            font: "Arial",
            color: '#ffffff',
          },
        ]
      },
      // ... other pages
    ]
  },
  { 
    id: '2', 
    imageUrl: '/templates/tarjeta2.png',
    categoria:['Dia de muertos','Navidad','Dia de reyes','Exitos','Conciertos','Todos'],
    pages: [
      {
        pageNumber: 1,
        staticPlaceholders: [
          {
            id: 'title',
            type: 'text',
            position: { x: 50, y: 30 },
            size: { width: 300, height: 50 },
            content: '',
            placeholder: 'Feliz Cumpleaños',
            font: "Lust Script",
            color: '#04D9B2',
          },
          // ... other placeholders for this page
        ]
      },
    ]
  },
  { 
    id: '3', 
    imageUrl: '/templates/tarjeta3.png',
    categoria:['Muertos','Navidad','Dia de la independencia','Todos'],
    pages: [
      {
        pageNumber: 1,
        staticPlaceholders: []
      }
    ]
  },
  {
    id: '4',
    categoria:['Muertos','Navidad','Todos'],
    imageUrl: '/templates/tarjeta4.png',
    pages: []
  },
];
