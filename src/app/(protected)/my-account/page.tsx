"use client"
import React, { useState } from 'react';
import { MapPin, CreditCard, Calendar, LogOut, LucideIcon } from 'lucide-react';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import Image from 'next/image';
import Pedidos from '@/components/my-account/pedidos';
import DireccionesEnvio from '@/components/my-account/direcciones';
import Recordatorios from '@/components/my-account/recordatorios';
import MiCuenta from '@/components/my-account/cuenta';
import { signOut } from 'next-auth/react';

const SidebarItem = ({ icon: Icon, text, onClick }: { icon: LucideIcon| React.ElementType; text: string; onClick?: () => void }) => (
  <div className="flex items-center space-x-2 py-2 px-4 cursor-pointer group text-[#5D60a6] " onClick={onClick}>
    <Icon size={20}  className="group-hover:text-[#04d9b2] transition-colors duration-300 mr-2" />
    <span className="group-hover:text-[#04d9b2] transition-colors duration-300">{text}</span>
  </div>
);

const Sidebar = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
  <div className="hidden md:block w-72 bg-white font-geometos h-screen mt-10">
    <SidebarItem icon={FaUser} text="Mi cuenta" onClick={() => setActiveTab('account')} />
    <div className="my-6"></div>
    <SidebarItem icon={FaShoppingCart} text="Pedidos" onClick={() => setActiveTab('pedidos')} />
    <div className="my-6"></div>
    <SidebarItem icon={MapPin} text="Direcciones de envio" onClick={() => setActiveTab('direcciones')} />
    <div className="my-6"></div>
    <SidebarItem icon={CreditCard} text="Metodos de pago" />
    <div className="my-6"></div>
    <SidebarItem icon={Calendar} text="Recordatorios" onClick={() => setActiveTab('recordatorios')} />
    <div className="border-t border-gray-200 my-6"></div>
    <SidebarItem icon={LogOut} text="Cerrar sesion" onClick={() => signOut({ callbackUrl: '/' })} />
  </div>
);

const MobileSelect = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => (
  <select
    value={activeTab}
    onChange={(e) => setActiveTab(e.target.value)}
    className="w-full p-2 mb-4 font-geometos text-[#5D60a6] border border-gray-200 rounded-lg md:hidden"
  >
    <option value="account">Mi cuenta</option>
    <option value="pedidos">Pedidos</option>
    <option value="direcciones">Direcciones de envio</option>
    <option value="recordatorios">Recordatorios</option>
  </select>
);

const Header = () => (
  <div className="bg-[#04d9b2] p-4 rounded-lg m-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <Image
          src="/logo-principal.png"
          alt="Profile"
          width={200}
          height={200}
          className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] object-contain"
      />
      <div className="text-center sm:text-left">
      <h2 className="text-3xl sm:text-5xl text-white font-geometos">¡Hola! </h2>
      <p className="text-[#5D60a6] text-xl sm:text-3xl font-geometos">Bienvenid@ a tu cuenta</p>
    </div>
  </div>
);

const LogoutButton = () => (
  <button 
    className="flex items-center space-x-2 py-2 px-4 bg-gray-100 text-[#5D60a6] font-geometos cursor-pointer w-full"
    onClick={() => signOut({ callbackUrl: '/' })}
  >
    <LogOut size={20} />
    <span>Cerrar sesión</span>
  </button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="flex flex-col md:flex-row mt-28 bg-white h-screen">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col h-full">
        <div className="p-4 md:hidden">
          <MobileSelect activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <Header />
        <div className="p-4 flex-grow overflow-hidden">
          <div className="h-full overflow-y-auto">
            {activeTab === 'pedidos' && <Pedidos />}
            {activeTab === 'account' && <MiCuenta />}
            {activeTab === 'direcciones' && <DireccionesEnvio />}
            {activeTab === 'recordatorios' && <Recordatorios />}
          </div>
        </div>
        <div className="md:hidden">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default App;