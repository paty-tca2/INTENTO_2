"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from "react-toastify";
import axios from 'axios';

interface Order {
  id: number;
  orderNumber: string;
  totalAmount: number;
  status: string;
  orderDate: string;
}

const Pedidos: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Order[]>('/api/user/orders');
        setOrders(response.data.map(order => ({
          ...order,
          totalAmount: Number(order.totalAmount)
        })));
        setError(null);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again.");
        toast.error("Error al cargar los pedidos");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-geometos text-[#5D60a6]">Cargando pedidos...</div>;
  }

  if (error) {
    return <div className="text-center text-xl font-geometos text-red-500">{error}</div>;
  }

  return (
    <div className="pedidos-container text-black">
      <h2 className="text-center text-3xl font-geometos text-[#5D60a6] mb-4">Sus Pedidos</h2>
      {orders.length > 0 ? (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <p>Pedido #{order.orderNumber}</p>
              <p>Fecha: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Total: R$ {order.totalAmount.toFixed(2)}</p>
              <p>Estado: {order.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md mx-auto">
            <p className="text-xl font-geometos text-[#5D60a6] mb-4">No tienes pedidos aun</p>
            <Link href="/">
              <button className="bg-[#04d9b2] hover:bg-[#5D60a6] text-white font-geometos py-2 px-4 rounded-full transition duration-300">
                Realizar un pedido
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
