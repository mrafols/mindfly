# ✈️ MindFly - Vuela Tranquilo

MindFly es una aplicación web diseñada para tranquilizar a las personas que sienten ansiedad al volar. Proporciona información meteorológica detallada y explicaciones claras sobre las condiciones de vuelo entre dos aeropuertos.

## 🌟 Características

- ✈️ **Búsqueda por Número de Vuelo**: Busca tu vuelo específico para obtener pronóstico personalizado
- 🌪️ **Pronóstico de Turbulencias**: Análisis detallado de turbulencias a lo largo de toda la ruta
- 🌍 **Búsqueda de Rutas**: Busca entre más de 30 aeropuertos principales del mundo
- 🌤️ **Datos Meteorológicos en Tiempo Real**: Información actualizada del clima en origen, destino y punto medio de la ruta
- 🗺️ **Visualización de Rutas**: Mapas interactivos que muestran tu trayectoria de vuelo
- 📊 **Gráficos de Turbulencias**: Visualización detallada de la probabilidad y severidad de turbulencias
- ✈️ **Información de Aeronaves**: Detalles sobre el tipo de avión y su capacidad para manejar turbulencias
- 📖 **Explicaciones Detalladas**: Información clara y tranquilizadora sobre las condiciones meteorológicas
- 🌐 **Multiidioma**: Disponible en español e inglés
- 📱 **Diseño Responsivo**: Funciona perfectamente en móviles, tabletas y escritorio

## 🚀 Tecnologías Utilizadas

- **Next.js 15**: Framework de React con App Router
- **TypeScript**: Para un desarrollo más seguro y mantenible
- **Tailwind CSS**: Para un diseño moderno y responsivo
- **next-intl**: Internacionalización completa
- **Leaflet**: Mapas interactivos
- **Open-Meteo API**: Datos meteorológicos gratuitos y precisos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm start
```

## 🌐 Despliegue en Vercel

Este proyecto está optimizado para desplegarse en Vercel:

1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente la configuración de Next.js
3. ¡Despliega con un clic!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 🎯 Uso

### Búsqueda Simplificada por Número de Vuelo
1. Selecciona tu idioma preferido (español o inglés)
2. Introduce tu número de vuelo (ej: VY3900, IB1013, FR2541)
3. Haz clic en "Buscar Pronóstico"
4. **¡Listo!** El pronóstico de turbulencias se genera automáticamente

El sistema:
- 🔍 Busca automáticamente tu vuelo en bases de datos reales
- 🗺️ Identifica la ruta (origen y destino)
- 🌪️ Calcula el pronóstico de turbulencias completo
- 📊 Muestra toda la información instantáneamente

### Información Disponible
- 🗺️ Mapa interactivo de tu ruta de vuelo
- 🌤️ Condiciones meteorológicas en origen, destino y ruta
- 🌪️ Pronóstico detallado de turbulencias a lo largo del vuelo
- 📊 Gráficos de probabilidad y severidad de turbulencias
- ✈️ Información sobre tu aeronave específica
- 📖 Explicaciones claras y tranquilizadoras sobre cada condición

## 🛫 Aeropuertos Disponibles

La aplicación incluye información de más de 30 aeropuertos principales:

### España
- Madrid (MAD)
- Barcelona (BCN)
- Málaga (AGP)
- Palma de Mallorca (PMI)
- Y más...

### Europa
- London Heathrow (LHR)
- Paris CDG (CDG)
- Frankfurt (FRA)
- Amsterdam (AMS)
- Y más...

### América
- New York JFK (JFK)
- Los Angeles (LAX)
- Miami (MIA)
- Y más...

### Asia y Oceanía
- Dubai (DXB)
- Singapore (SIN)
- Tokyo (HND)
- Sydney (SYD)
- Y más...

## 🔧 Configuración

La aplicación no requiere claves de API ya que utiliza Open-Meteo, un servicio gratuito de datos meteorológicos.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 💙 Sobre el Proyecto

MindFly fue creado con el objetivo de ayudar a las personas con miedo a volar. Entendemos que la información clara y las explicaciones tranquilizadoras pueden marcar una gran diferencia en la experiencia de vuelo.

Recuerda: **Volar es el medio de transporte más seguro del mundo** ✈️💙

## 🙏 Agradecimientos

- Datos meteorológicos proporcionados por [Open-Meteo](https://open-meteo.com/)
- Mapas por [OpenStreetMap](https://www.openstreetmap.org/)
- Iconos y diseño inspirados en principios de UX para reducir la ansiedad
