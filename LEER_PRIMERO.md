# 👋 ¡Bienvenido a MindFly!

## 🎉 ¡Tu aplicación está lista!

MindFly es una aplicación web completamente funcional para tranquilizar a personas con miedo a volar. 

---

## 🚀 Iniciar en 3 Pasos

### 1️⃣ Ver la aplicación funcionando
```bash
npm run dev
```
Abre tu navegador en: **http://localhost:3000**

### 2️⃣ Probar la funcionalidad
1. La app se abrirá en español por defecto
2. Cambia de idioma con los botones 🇪🇸 ES / 🇬🇧 EN
3. Busca un vuelo:
   - Origen: **Barcelona** (o escribe "BCN")
   - Destino: **Madrid** (o escribe "MAD")
4. Haz clic en **"Buscar Pronóstico"**
5. Verás:
   - 🗺️ Mapa interactivo con la ruta
   - 🌤️ Clima en origen, ruta y destino
   - 📖 Explicaciones detalladas y tranquilizadoras

### 3️⃣ Desplegar a Vercel
```bash
# Opción A: Con CLI
npm install -g vercel
vercel --prod

# Opción B: Desde GitHub
# 1. Sube el código a GitHub
# 2. Ve a vercel.com
# 3. Importa tu repositorio
# 4. ¡Deploy!
```

---

## 📋 ¿Qué incluye el proyecto?

✅ **30+ aeropuertos** de todo el mundo
✅ **Datos meteorológicos en tiempo real** (Open-Meteo API)
✅ **Mapas interactivos** con Leaflet
✅ **Español e Inglés** completamente traducido
✅ **Diseño responsive** (móvil, tablet, desktop)
✅ **Explicaciones tranquilizadoras** sobre el clima y vuelo
✅ **Cero configuración** - no necesitas API keys
✅ **Listo para producción** - build exitoso

---

## 📚 Documentación Disponible

```
📄 README.md             → Visión general y setup completo
📄 QUICKSTART.md         → Inicio rápido (5 minutos)
📄 DEPLOYMENT.md         → Cómo desplegar en Vercel
📄 FEATURES.md           → Características técnicas detalladas
📄 CONTRIBUTING.md       → Guía para contribuir
📄 PROJECT_SUMMARY.md    → Resumen ejecutivo del proyecto
```

**Empieza con este archivo**, luego lee `QUICKSTART.md` 😊

---

## 🛠️ Comandos Útiles

```bash
npm run dev          # Desarrollo (con hot reload)
npm run build        # Construir para producción
npm start            # Servidor de producción
npm run lint         # Verificar código
```

---

## 🌍 Aeropuertos Disponibles

### 🇪🇸 España
Madrid, Barcelona, Málaga, Palma, Sevilla, Valencia, Alicante, Bilbao

### 🇪🇺 Europa
Londres, París, Frankfurt, Ámsterdam, Roma, Milán, Múnich, Lisboa, Zúrich, Viena

### 🌎 América
Nueva York, Los Ángeles, Miami, Ciudad de México, Toronto, São Paulo, Buenos Aires

### 🌏 Asia y Oceanía
Dubái, Singapur, Tokio, Hong Kong, Sídney

**¿Quieres añadir más?** Edita `lib/airports.ts`

---

## 🎨 Personalización Rápida

### Cambiar textos
Edita los archivos:
- `messages/es.json` (Español)
- `messages/en.json` (Inglés)

### Añadir aeropuertos
Edita `lib/airports.ts`:
```typescript
{ 
  code: 'XXX', 
  name: 'Nombre del Aeropuerto',
  city: 'Ciudad', 
  country: 'País', 
  lat: 0.0000, 
  lon: 0.0000 
}
```

### Cambiar colores
Busca y reemplaza las clases de Tailwind:
- `bg-blue-600` → Color de fondo
- `text-blue-900` → Color de texto
- `from-blue-50 to-indigo-100` → Gradiente

---

## 🐛 ¿Problemas?

### El servidor no inicia
```bash
# Reinstala dependencias
rm -rf node_modules
npm install
npm run dev
```

### Error de build
```bash
# Limpia y reconstruye
rm -rf .next
npm run build
```

### El mapa no se ve
- Verifica tu conexión a internet
- Revisa la consola del navegador (F12)

---

## 💡 Características Destacadas

### Para Usuarios
- 🔍 **Búsqueda inteligente** con autocompletado
- 🌡️ **Datos reales** de temperatura, viento, visibilidad
- 🗺️ **Mapas interactivos** de la ruta de vuelo
- 💙 **Mensajes tranquilizadores** sobre seguridad aérea
- 🌐 **Cambio de idioma** instantáneo

### Para Desarrolladores
- ⚡ **Next.js 15** con App Router
- 🎯 **TypeScript** type-safe
- 🎨 **Tailwind CSS** para estilos
- 🌍 **next-intl** para i18n
- 📦 **114KB** de JavaScript compartido
- 🚀 **Build en 4 segundos**

---

## 🎯 Próximos Pasos Sugeridos

1. **Ahora**: Prueba la app localmente (`npm run dev`)
2. **Hoy**: Despliega a Vercel (gratis)
3. **Esta semana**: 
   - Personaliza textos y colores
   - Añade más aeropuertos
   - Comparte con amigos
4. **Este mes**:
   - Añade más idiomas
   - Implementa analytics
   - Mejora SEO

---

## 📱 Redes Sociales

Comparte MindFly:
```
🛫 ¿Miedo a volar? Prueba MindFly - una app que te muestra 
el clima de tu ruta y te explica todo de forma tranquilizadora.

🌐 [tu-url-vercel].vercel.app
✈️ #MindFly #AviaciónSegura #SinMiedo
```

---

## ❤️ Hecho con Amor

Este proyecto fue creado para ayudar a personas con ansiedad al volar. Si te ayuda o conoces a alguien que podría beneficiarse, ¡compártelo!

**Recuerda**: Volar es el medio de transporte más seguro del mundo. Los datos no mienten. 📊✈️

---

## 🤝 ¿Preguntas?

- 📖 Lee la documentación completa en `README.md`
- 🐛 Reporta bugs en GitHub Issues
- 💬 Comparte feedback
- ⭐ Dale una estrella en GitHub si te gusta

---

**¡Disfruta de MindFly!** 💙✈️🌤️

*Vuela tranquilo, vuela informado.*

