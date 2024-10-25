"use client";
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import UpdateModal from './updateModal';
import Header from "@/components/header";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

const MiCuenta: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isEditable, setIsEditable] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProfile = async () => {
      if (status === "loading") return;

      if (!session) {
        toast.error("No estás autenticado");
        router.push("/auth/sign-in");
        return;
      }

      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const userData = await response.json();
        setUserInfo({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone || '',
        });
      } catch (error) {
        toast.error("Error al cargar el perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session, status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: userInfo.phone }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUserInfo(updatedUser);
      setIsEditable(false);
      setModalMessage("Perfil actualizado exitosamente");
      setModalType('success');
      setModalOpen(true);
    } catch (error) {
      setModalMessage("Error al actualizar el perfil");
      setModalType('error');
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (

      <div className="mi-cuenta-container text-black">
        <Header/>
        <h2 className="text-center text-3xl font-geometos text-[#5D60a6] mb-4">Mi Cuenta</h2>

        {loading ? (
            <p>Cargando perfil...</p>
        ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <FaUser className="text-[#5D60a6]" />
                <input
                    type="text"
                    name="firstName"
                    value={userInfo.firstName}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Nombre"
                    disabled
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-[#5D60a6]" />
                <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="Correo electrónico"
                    disabled
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-[#5D60a6]" />
                <input
                    type="tel"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Número de teléfono (opcional)"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    disabled={!isEditable}
                />
              </div>
              {isEditable && (
                <button
                    type="submit"
                    className="bg-[#04d9b2] hover:bg-[#5D60a6] transition-colors font-geometos text-white py-2 px-4 rounded-full"
                >
                  Guardar cambios
                </button>
              )}
            </form>
        )}
        <UpdateModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          message={modalMessage}
          type={modalType}
        />
      </div>
  );
};

export default MiCuenta;
