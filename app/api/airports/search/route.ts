import { NextRequest, NextResponse } from 'next/server';
import { searchAirports } from '@/lib/airports';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Buscar aeropuertos usando la función existente
    const results = searchAirports(query, 10);

    // Formatear resultados
    const airports = results.map(airport => ({
      iata: airport.code,
      name: airport.name,
      city: airport.city,
      country: airport.country,
      lat: airport.lat,
      lon: airport.lon
    }));

    return NextResponse.json({ airports });
  } catch (error) {
    console.error('Error en búsqueda de aeropuertos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

