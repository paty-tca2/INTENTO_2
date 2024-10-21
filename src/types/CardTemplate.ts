export interface CardTemplate {
  id: string;
  editableImages: {
    [key: string]: {
      url: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
    };
  };
  // Add other properties as needed
}
