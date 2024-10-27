import React, { useEffect, useState } from 'react';

const PageAlert = () => {
  const [showAlert, setShowAlert] = useState(false); // Inicialmente oculta

  useEffect(() => {
    // Mostrar la alerta cuando la página se cargue
    setShowAlert(true);
  }, []); // Se ejecuta solo una vez al cargar la página

  return (
    <div className="p-6">
      {showAlert && (
        <div
          className="flex items-center p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 flex-shrink-0 mr-2"
            fill="currentColor"
            viewBox="0 0 16 16"
            role="img"
            aria-label="Warning:"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <div>The page has loaded successfully!</div>
        </div>
      )}
    </div>
  );
};

export default PageAlert;
