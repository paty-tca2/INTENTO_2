import React from 'react';
import { Heart, Facebook, Instagram, Calendar } from 'lucide-react';

const DateReminderEmailTemplate = ({ firstName, eventName, eventDate }: { firstName: string, eventName: string, eventDate: string }) => {
  return (
    <>
      <div style={{ width: '100%', maxWidth: '28rem', margin: '0 auto', border: '1px solid #e5e7eb', borderRadius: '0.375rem', overflow: 'hidden', fontFamily: 'Arial, sans-serif', color: '#5d60a6' }}>
        <div style={{ borderBottom: '1px solid #e5e7eb', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <img src="https://www.tarjetasconamor.com/logo-principal.png" alt="Logo" style={{ height: '3rem' }} />
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>¡Hola {firstName}! Tienes un evento importante próximo</h1>
          
          <p style={{ marginBottom: '1rem' }}>Te escribimos para recordarte que tienes un evento especial acercándose. ¡No queremos que se te pase por alto esta fecha tan importante!</p>
          
          <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '0.375rem', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
              <Calendar size={24} style={{ marginRight: '0.5rem' }} /> Detalles del evento:
            </h2>
            <p style={{ fontWeight: 'bold' }}>Evento: {eventName}</p>
            <p style={{ fontWeight: 'bold' }}>Fecha: {eventDate}</p>
          </div>
          
          <p style={{ marginBottom: '1rem' }}>¿Por qué no aprovechas esta ocasión para crear una tarjeta especial? En Tarjetas con Amor, puedes diseñar una tarjeta única que capture perfectamente tus sentimientos para este día tan especial.</p>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Ideas para celebrar:</h2>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Crea una tarjeta personalizada con tus fotos favoritas</li>
            <li>Diseña un álbum de recuerdos para regalar</li>
            <li>Envía una postal sorpresa a un ser querido</li>
          </ul>
          
          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            <a href="https://www.tarjetasconamor.com/crear-tarjeta" 
               style={{ display: 'inline-block', backgroundColor: '#5D60a6', color: '#fff', padding: '0.75rem 1.5rem', textDecoration: 'none', borderRadius: '0.375rem', fontSize: '1.125rem', fontWeight: 'bold', transition: 'background-color 0.3s' }}
               onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.backgroundColor = '#04d9b2')}
               onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.backgroundColor = '#5D60a6')}>
              Crear mi tarjeta ahora
            </a>
          </div>
          
          <p>¡Esperamos que tengas un día maravilloso!</p>
          <p style={{ fontWeight: 'bold' }}>El equipo de Tarjetas con Amor</p>
        </div>
        
        <div style={{ backgroundColor: '#f3f4f6', padding: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
            <a href="https://www.facebook.com/profile.php?id=61563723841030" style={{ color: '#5d60a6', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#04d9b1')} onMouseLeave={(e) => (e.currentTarget.style.color = '#5d60a6')}>
              <Facebook size={24} />
            </a>
            <a href="https://www.instagram.com/tarjetasconamor__oficial" style={{ color: '#5d60a6', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#04d9b1')} onMouseLeave={(e) => (e.currentTarget.style.color = '#5d60a6')}>
              <Instagram size={24} />
            </a>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="#" style={{ color: '#5d60a6', textDecoration: 'none', transition: 'color 0.2s' }}>Términos y Condiciones</a>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <Heart size={24} style={{ color: '#04d9b1' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DateReminderEmailTemplate;