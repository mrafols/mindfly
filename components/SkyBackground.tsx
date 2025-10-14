'use client';

import { useEffect, useState } from 'react';

export default function SkyBackground() {
  const [planes, setPlanes] = useState<{ id: number; delay: number; top: string }[]>([]);

  useEffect(() => {
    // Generar aviones con diferentes delays
    const planesData = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      delay: i * 7,
      top: `${20 + i * 25}%`,
    }));
    setPlanes(planesData);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Fondo de cielo con gradiente */}
      <div className="absolute inset-0 sky-gradient" />
      
      {/* Nubes flotantes */}
      <div className="cloud w-24 h-8 top-[15%] left-[10%] cloud-animation" style={{ animationDelay: '0s' }} />
      <div className="cloud w-32 h-10 top-[25%] left-[60%] cloud-animation" style={{ animationDelay: '5s' }} />
      <div className="cloud w-28 h-9 top-[40%] left-[30%] cloud-animation" style={{ animationDelay: '10s' }} />
      <div className="cloud w-20 h-7 top-[60%] left-[75%] cloud-animation" style={{ animationDelay: '15s' }} />
      <div className="cloud w-36 h-11 top-[70%] left-[20%] cloud-animation" style={{ animationDelay: '20s' }} />
      <div className="cloud w-24 h-8 top-[85%] left-[50%] cloud-animation" style={{ animationDelay: '25s' }} />

      {/* Aviones volando */}
      {planes.map((plane) => (
        <div
          key={plane.id}
          className="absolute text-4xl fly-animation"
          style={{
            top: plane.top,
            animationDelay: `${plane.delay}s`,
          }}
        >
          ✈️
        </div>
      ))}

      {/* Efecto de brillo en la parte superior */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white/20 to-transparent" />
    </div>
  );
}

