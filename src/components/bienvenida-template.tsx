
  import React from 'react';
import { Heart, Facebook, Instagram } from 'lucide-react';

const EmailTemplate = ({ firstName }: { firstName: string }) => {
  return (
    <>
      <div style={{ width: '100%', maxWidth: '28rem', margin: '0 auto', border: '1px solid #e5e7eb', borderRadius: '0.375rem', overflow: 'hidden', fontFamily: 'Arial, sans-serif', color: '#5d60a6' }}>
        <div style={{ borderBottom: '1px solid #e5e7eb', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <img src="https://www.tarjetasconamor.com/logo-principal.png" alt="Logo" style={{ height: '3rem' }} />
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>¡Bienvenid@ a Tarjetas con Amor!</h1>
          
          <p style={{ marginBottom: '1rem' }}>Estamos felices de que te hayas unido a nuestra comunidad dónde compartes tus memorias más preciadas, cobrando vida a través de hermosas tarjetas, postales, álbumes personalizados y calendarios.</p>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>¿Qué puedes hacer en Tarjetas con Amor?</h2>
          <ul style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Crear tarjetas únicas: Diseña tarjetas personalizadas para cualquier ocasión, desde cumpleaños hasta aniversarios o solo compartir un momento.</li>
            <li>Enviar postales: Sorprende a tus seres queridos con postales compartiendo tus aventuras.</li>
          </ul>
          
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Solo sigue 4 pasos y en minutos estarás compartiendo tus memorias:</p>
          <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Explora nuestra galería de productos.</li>
            <li>Sube tus fotos favoritas</li>
            <li>Personaliza tus diseños con nuestro editor intuitivo</li>
            <li>Comparte tus memorias!!!</li>
          </ol>
          
          <p style={{ marginBottom: '1rem' }}>¡Esperamos ver tus hermosas creaciones pronto!</p>
          
          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            <a href="https://www.tarjetasconamor.com/my-account" 
               style={{ display: 'inline-block', backgroundColor: '#5D60a6', color: '#fff', padding: '0.75rem 1.5rem', textDecoration: 'none', borderRadius: '0.375rem', fontSize: '1.125rem', fontWeight: 'bold', transition: 'background-color 0.3s' }}
               onMouseOver={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.backgroundColor = '#04d9b2')}
               onMouseOut={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.backgroundColor = '#5D60a6')}>
              Ingresar a tu cuenta
            </a>
          </div>
          
          <p>Crea, comparte y atesora,</p>
          <p style={{ fontWeight: 'bold' }}>El equipo de Tarjetas con Amor.</p>
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

export default EmailTemplate;