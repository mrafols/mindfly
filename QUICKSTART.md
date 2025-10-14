# 🚀 Inicio Rápido - MindFly

## Configuración Local (5 minutos)

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Ejecutar en Modo Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### 3. Construir para Producción
```bash
npm run build
npm start
```

## Despliegue en Vercel (2 minutos)

### Opción A: Con GitHub
1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. ¡Deploy!

### Opción B: Con Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

## Uso de la Aplicación

1. **Página Principal** (`/`)
   - Selecciona idioma (ES/EN)
   - Busca aeropuertos de origen y destino
   - Haz clic en "Buscar Pronóstico"

2. **Página de Pronóstico** (`/forecast`)
   - Visualiza el mapa de la ruta
   - Lee las condiciones meteorológicas
   - Revisa las explicaciones tranquilizadoras

## Características Clave

✈️ **+30 Aeropuertos**: Principales ciudades de Europa, América, Asia
🌤️ **Datos en Tiempo Real**: API meteorológica actualizada
🗺️ **Mapas Interactivos**: Visualización de rutas con Leaflet
🌐 **Multiidioma**: Español e Inglés
📱 **100% Responsive**: Funciona en todos los dispositivos
🔒 **Sin API Keys**: No requiere configuración adicional

## Estructura del Código

```
app/[locale]/          → Páginas con rutas internacionalizadas
components/            → Componentes reutilizables
lib/airports.ts        → Base de datos de aeropuertos
lib/weather.ts         → Integración con API meteorológica
messages/              → Traducciones (es.json, en.json)
i18n/                  → Configuración de internacionalización
```

## Personalización Rápida

### Añadir Más Aeropuertos
Edita `lib/airports.ts`:
```typescript
{ code: 'ABC', name: 'Nombre', city: 'Ciudad', country: 'País', lat: 0, lon: 0 }
```

### Cambiar Idiomas
Edita `messages/es.json` y `messages/en.json`

### Modificar Estilos
Los estilos usan Tailwind CSS en los componentes

### Cambiar Colores
Busca las clases de Tailwind como `bg-blue-600`, `text-blue-900`, etc.

## Comandos Útiles

```bash
npm run dev          # Desarrollo con hot reload
npm run build        # Construcción optimizada
npm start            # Servidor de producción
npm run lint         # Verificar código
```

## Solución Rápida de Problemas

### No carga la página
- Verifica que el puerto 3000 esté libre
- Ejecuta `npm install` de nuevo

### Errores de build
- Borra `.next` y ejecuta `npm run build` de nuevo
- Verifica la versión de Node.js (>= 18)

### El mapa no se muestra
- Verifica la conexión a internet (requiere tiles de OpenStreetMap)
- Revisa la consola del navegador para errores

### Los datos del clima no cargan
- Verifica conexión a internet
- La API Open-Meteo es gratuita y no requiere autenticación

## Próximos Pasos

1. 📖 Lee el [README.md](README.md) completo
2. 🚀 Revisa [DEPLOYMENT.md](DEPLOYMENT.md) para despliegue avanzado
3. 🤝 Lee [CONTRIBUTING.md](CONTRIBUTING.md) si quieres contribuir

## Soporte

¿Problemas? Abre un Issue en GitHub con:
- Descripción del problema
- Pasos para reproducir
- Screenshots si es relevante

---

¡Disfruta usando MindFly! ✈️💙

