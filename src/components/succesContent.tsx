'use client'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function SuccessPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setStatus('error');
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#5D60a6] mx-auto mb-4"></div>
            <h2 className="text-2xl font-geometos text-[#5D60a6] mb-4">Verificando pago...</h2>
          </>
        )}

        {status === 'error' && (
          <>
            <Image src="/error-icon.png" alt="Error" width={64} height={64} className="mx-auto mb-4" />
            <h2 className="text-2xl font-geometos text-red-600 mb-4">Error en el pago</h2>
            <p className="text-gray-600 mb-6">Hubo un problema al procesar tu pago. Por favor, contacta a soporte.</p>
            <button 
              onClick={() => router.push('/carrito')}
              className="bg-[#5D60a6] hover:bg-[#04d9b2] text-white font-geometos py-2 px-4 rounded-full transition duration-300"
            >
              Volver al carrito
            </button>
          </>
        )}

        {status === 'success' && (
          <>
            <Image src="/logo-principal.png" alt="Success" width={64} height={64} className="mx-auto mb-4" />
            <h2 className="text-2xl font-geometos text-[#04d9b2] mb-4">¡Pago exitoso!</h2>
            <p className="text-gray-600 mb-6">Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white font-geometos py-2 px-4 rounded-full transition duration-300"
            >
              Volver al inicio
            </button>
          </>
        )}
      </div>
    </div>
  );
}