"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CardTemplate } from '@/components/cards/card-templates';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';

type CardOptions = {
  type: 'ecard' | 'standard' | 'mediana' | 'grande';
  quantity: number;
};

type CardSize = {
  label: string;
  description: string;
  price: number;
  bgColor: string;
};

const cardSizes: Record<CardOptions['type'], CardSize> = {
  ecard: { label: 'eCard', description: 'Envío instantaneo', price: 20, bgColor: '#04d9b2' },
  standard: { label: 'Standard Card', description: 'Para tus seres queridos', price: 199, bgColor: '#5D60a6' },
  mediana: { label: 'Mediana', description: '57 x 81 cm', price: 299, bgColor: '#5D60a6' },
  grande: { label: 'Grande', description: '40 x 29.5 cm', price: 399, bgColor: '#5D60a6' },
};

type Address = {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

type CartItem = {
  id: number;
  templateId: string;
  options: CardOptions;
  price: number;
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CartPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [cartItem, setCartItem] = useState<{ template: CardTemplate; options: CardOptions } | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (session) {
        try {
          const response = await fetch('/api/user/address');
          if (response.ok) {
            const data = await response.json();
            setAddresses(data);
          } else {
            console.error('Failed to fetch addresses');
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    const fetchCart = async () => {
      if (session) {
        try {
          const response = await fetch('/api/cart');
          if (response.ok) {
            const data = await response.json();
            // Ensure quantity is always a number
            const validatedData = data.map((item: CartItem) => ({
              ...item,
              options: {
                ...item.options,
                quantity: Number(item.options.quantity) || 1
              }
            }));
            setCartItems(validatedData);
          } else {
            console.error('Failed to fetch cart');
          }
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAddresses();
    fetchCart();
    const storedTemplate = localStorage.getItem('selectedTemplate');
    const storedOptions = localStorage.getItem('selectedOptions');

    if (storedTemplate && storedOptions) {
      try {
        const template = JSON.parse(storedTemplate) as CardTemplate;
        const options = JSON.parse(storedOptions) as CardOptions;
        setCartItem({ template, options });
      } catch (error) {
        console.error('Error parsing stored cart data:', error);
        localStorage.removeItem('selectedTemplate');
        localStorage.removeItem('selectedOptions');
      }
    }
  }, [session]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(e.target.value);
  };

  const handlePayment = () => {
    console.log('Processing payment...');
  };

  const handleTypeChange = async (itemId: number, newType: CardOptions['type']) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        const newPrice = cardSizes[newType].price;
        return {
          ...item,
          options: { ...item.options, type: newType },
          price: newPrice
        };
      }
      return item;
    });

    setCartItems(updatedItems);

    // Update the item in the database
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          options: { ...updatedItems.find(item => item.id === itemId)?.options },
          price: cardSizes[newType].price,
        }),
      });

      if (!response.ok) {
        console.error('Failed to update cart item');
        // Revert the change if the update failed
        setCartItems(cartItems);
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      // Revert the change if the update failed
      setCartItems(cartItems);
    }
  };

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          options: {
            ...item.options,
            quantity: newQuantity
          }
        };
      }
      return item;
    });

    setCartItems(updatedItems);

    // Update the item in the database
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          options: updatedItems.find(item => item.id === itemId)?.options,
        }),
      });

      if (!response.ok) {
        console.error('Failed to update cart item');
        // Revert the change if the update failed
        setCartItems(cartItems);
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      // Revert the change if the update failed
      setCartItems(cartItems);
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      const response = await fetch(`/api/cart?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setCartItems(cartItems.filter(item => item.id !== id));
      } else {
        console.error('Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleContinueShopping = () => {
    router.push('/cards');
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const session = await response.json();
      const result = await stripe!.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error in handleCheckout:', error);
    }
  };

  if (!session) {
    return (
      <div className="container mx-auto pt-48 px-4 py-8 text-center">
        <h1 className="text-5xl font-geometos text-[#5D60a6] mb-6">Inicia sesión para ver tu carrito</h1>
        <p className="text-xl font-geometos text-gray-600 mb-8">Por favor, inicia sesión para acceder a tu carrito de compras.</p>
        <button
          onClick={() => router.push('/auth/signin')}
          className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white px-6 py-3 rounded font-geometos text-lg"
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto pt-48 px-4 py-8 text-center">
        <h1 className="text-5xl font-geometos text-[#5D60a6] mb-6">Cargando carrito...</h1>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto pt-48 px-4 py-8 text-center">
        <h1 className="text-5xl font-geometos text-[#5D60a6] mb-6">Carrito vacío</h1>
        <p className="text-xl font-geometos text-gray-600 mb-8">No tienes artículos en tu carrito.</p>
        <button
          onClick={handleContinueShopping}
          className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white px-6 py-3 rounded font-geometos text-lg"
        >
          Ir a comprar
        </button>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.options.quantity, 0);

  return (
    <div className="container mx-auto pt-48 px-4 py-8">
      <h1 className="text-5xl font-geometos text-[#5D60a6] mb-6 text-center">Carrito</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-geometos text-[#5D60a6] mb-4">Artículos en el carrito</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow mb-4">
              <Image 
                src={`/templates/TEMPLATE-${item.templateId}-1.webp`} 
                alt="Card Template" 
                width={200} 
                height={200} 
                className="w-full h-48 object-cover rounded-lg mb-4" 
              />
              <h3 className="text-xl font-geometos text-[#5D60a6]">{item.templateId}</h3>
              <p className="text-sm font-geometos text-gray-600">
                {cardSizes[item.options.type as keyof typeof cardSizes]?.description || 'Descripción no disponible'}
              </p>
              
              {/* Card Type Selection */}
              <div className="mt-4">
                <label className="block text-sm font-geometos text-gray-600 mb-2">Tipo de tarjeta:</label>
                <div className="flex space-x-4">
                  {(Object.keys(cardSizes) as Array<keyof typeof cardSizes>).map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeChange(item.id, type)}
                      className={`px-4 py-2 rounded-full font-geometos text-sm ${
                        item.options.type === type
                          ? 'bg-[#5D60a6] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {cardSizes[type].label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, Math.max(1, item.options.quantity - 1))}
                    className="bg-gray-200 px-2 py-1 rounded-l"
                  >
                    -
                  </button>
                  <span className="bg-gray-100 px-4 py-1">{item.options.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.options.quantity + 1)}
                    className="bg-gray-200 px-2 py-1 rounded-r"
                  >
                    +
                  </button>
                </div>
                <p className="text-lg font-geometos text-[#04d9b2]">
                  ${item.price} x {item.options.quantity}
                </p>
              </div>
              <p className="text-lg font-geometos text-[#5D60a6] mt-2">
                Total: ${(item.price * item.options.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="mt-4 text-red-500 hover:text-red-700 font-geometos"
              >
                Eliminar articulo
              </button>
            </div>
          ))}
        </div>
        
        <div>
          <h2 className="text-2xl font-geometos text-[#5D60a6] mb-4">Direccion de envio</h2>
          {isLoading ? (
            <p>Cargando direcciones...</p>
          ) : addresses.length > 0 ? (
            <select
              value={selectedAddress}
              onChange={handleAddressChange}
              className="w-full p-2 mb-4 font-geometos text-[#5D60a6] border border-gray-200 rounded-lg"
            >
              <option value="">Selecciona una direccion</option>
              {addresses.map((address) => (
                <option key={address.id} value={address.id.toString()}>
                  {`${address.street}, ${address.city}, ${address.state} ${address.zipCode}`}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-xl font-geometos text-[#5D60a6]">No hay direcciones guardadas. Por favor, agrega una direccion en tu perfil.</p>
          )}
          
         
          
          <h2>Total: ${totalPrice.toFixed(2)}</h2>
          <button
            onClick={handleCheckout}
            className="w-full bg-[#04d9b2] hover:bg-[#5D60a6] text-white px-4 py-2 rounded-full font-geometos"
          >
            Proceder al pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;