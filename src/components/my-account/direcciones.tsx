"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa'; // Make sure to install react-icons if you haven't already
import Header from "@/components/header";

interface Address {
  id: number;
  name: string;
  street: string;
  exteriorNumber: string;
  interiorNumber?: string;
  colony: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

const DireccionesEnvio: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isDefault'>>({
    name: '',
    street: '',
    exteriorNumber: '',
    interiorNumber: '',
    colony: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      fetchAddresses();
    }
  }, [session]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/user/address');
      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      toast.error("Error al cargar las direcciones");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("No estás autenticado");
      router.push("/auth/sign-in");
      return;
    }

    try {
      const response = await fetch('/api/user/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });

      if (!response.ok) {
        throw new Error('Failed to add address');
      }

      await fetchAddresses(); // Refresh the list of addresses
      setNewAddress({
        name: '',
        street: '',
        exteriorNumber: '',
        interiorNumber: '',
        colony: '',
        city: '',
        state: '',
        zipCode: '',
      });
      toast.success("Dirección agregada exitosamente");
    } catch (error) {
      toast.error("Error al agregar la dirección");
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    if (!session) {
      toast.error("No estás autenticado");
      router.push("/auth/sign-in");
      return;
    }

    try {
      const response = await fetch(`/api/user/address/${addressId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete address');
      }

      await fetchAddresses(); // Refresh the list of addresses
      toast.success("Dirección eliminada exitosamente");
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error(error instanceof Error ? error.message : "Error al eliminar la dirección");
    }
  };

  return (
    <div className="direcciones-envio-container text-black">
      <Header/>
      <h2 className="text-center text-3xl font-geometos text-[#5D60a6] mb-4">Direcciones de Envio</h2>
      
      {/* Display existing addresses */}
      <div className="mb-8">
        <h3 className="text-xl text-[#5D60a6] font-geometos mb-2">Mis Direcciones</h3>
        {addresses.length === 0 ? (
          <p className="text-[#5D60a6] font-geometos">No tienes direcciones guardadas.</p>
        ) : (
          <ul className="address-list font-geometos">
            {addresses.map((address) => (
              <li key={address.id} className="address-item mb-4 p-4 border rounded relative">
                <span className="absolute top-2 right-2 bg-[#04d9b2] text-white rounded-full w-6 h-6 flex items-center justify-center">
                  {address.id}
                </span>
                <p><strong>{address.name}</strong></p>
                <p>{address.street} {address.exteriorNumber}{address.interiorNumber ? `, Int. ${address.interiorNumber}` : ''}</p>
                <p>{address.colony}</p>
                <p>{address.city}, {address.state}</p>
                <p>{address.zipCode}</p>
                {address.isDefault && <p className="text-green-600">Dirección predeterminada</p>}
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                >
                  <FaTrash /> 
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Form to add new address */}
      <form onSubmit={handleAddAddress} className="mb-6">
        <h3 className="text-xl text-[#5D60a6] font-geometos mb-2">Agregar Nueva Dirección</h3>
        <input
          type="text"
          name="name"
          value={newAddress.name}
          onChange={handleInputChange}
          placeholder="Nombre del destinatario"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
        <input
          type="text"
          name="street"
          value={newAddress.street}
          onChange={handleInputChange}
          placeholder="Calle"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
        <input
          type="text"
          name="exteriorNumber"
          value={newAddress.exteriorNumber}
          onChange={handleInputChange}
          placeholder="Numero Exterior"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
         <input
          type="text"
          name="interiorNumber"
          value={newAddress.interiorNumber || ''}
          onChange={handleInputChange}
          placeholder="Numero Interior"
          className="w-full mb-2 p-2 border font-geometos rounded"
        />
        <input
          type="text"
          name="colony"
          value={newAddress.colony}
          onChange={handleInputChange}
          placeholder="Colonia"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
        <input
          type="text"
          name="city"
          value={newAddress.city}
          onChange={handleInputChange}
          placeholder="Ciudad"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
        <input
          type="text"
          name="state"
          value={newAddress.state}
          onChange={handleInputChange}
          placeholder="Estado"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
        <input
          type="text"
          name="zipCode"
          value={newAddress.zipCode}
          onChange={handleInputChange}
          placeholder="Codigo Postal"
          className="w-full mb-2 p-2 border font-geometos rounded"
          required
        />
        <button type="submit" className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white font-geometos py-2 px-4 rounded-full">
          Agregar Direccion
        </button>
      </form>
    </div>
  );
};

export default DireccionesEnvio;
