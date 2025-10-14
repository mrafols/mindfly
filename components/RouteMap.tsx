'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface RouteMapProps {
  originLat: number;
  originLon: number;
  originName: string;
  destLat: number;
  destLon: number;
  destName: string;
}

export default function RouteMap({
  originLat,
  originLon,
  originName,
  destLat,
  destLon,
  destName,
}: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Crear el mapa
    const map = L.map(mapRef.current).setView(
      [(originLat + destLat) / 2, (originLon + destLon) / 2],
      4
    );

    // Añadir capa de tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Icono personalizado para aeropuertos
    const airportIcon = L.divIcon({
      html: '✈️',
      className: 'airport-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    // Añadir marcadores
    L.marker([originLat, originLon], { icon: airportIcon })
      .addTo(map)
      .bindPopup(`<strong>${originName}</strong>`);

    L.marker([destLat, destLon], { icon: airportIcon })
      .addTo(map)
      .bindPopup(`<strong>${destName}</strong>`);

    // Dibujar línea de ruta
    const routeLine = L.polyline(
      [
        [originLat, originLon],
        [destLat, destLon],
      ],
      {
        color: '#3b82f6',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10',
      }
    ).addTo(map);

    // Ajustar vista para mostrar toda la ruta
    map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [originLat, originLon, originName, destLat, destLon, destName]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-lg shadow-lg z-0"
      style={{ position: 'relative' }}
    />
  );
}

