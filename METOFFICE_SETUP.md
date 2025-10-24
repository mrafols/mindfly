# Met Office DataPoint API - Configuración

## 🇬🇧 Servicio Meteorológico Oficial del Reino Unido

La API de Met Office DataPoint proporciona datos meteorológicos oficiales del Reino Unido, incluyendo pronósticos de 5 días y observaciones horarias.

---

## 📋 Características

✅ **Pronósticos de 5 días** para ~5000 ubicaciones en UK  
✅ **Observaciones horarias** de las últimas 24 horas para ~140 sitios  
✅ **Actualizaciones cada hora**  
✅ **Datos en pasos de 3 horas o diarios**  
✅ **100% GRATUITO** para uso personal y desarrollo  
✅ **API oficial** del National Weather Service (NOAA)  

---

## 🔑 Cómo Obtener tu API Key

### Paso 1: Regístrate en Met Office DataPoint

1. Ve a: https://www.metoffice.gov.uk/services/data/datapoint
2. Haz clic en **"Register"** o **"Sign up"**
3. Completa el formulario de registro:
   - Nombre
   - Email
   - Organización (puedes poner "Personal" o "Development")
   - Propósito (selecciona "Development" o "Personal use")

### Paso 2: Confirma tu Email

1. Recibirás un email de confirmación de Met Office
2. Haz clic en el enlace de confirmación
3. Tu cuenta quedará activada

### Paso 3: Obtén tu API Key

1. Inicia sesión en tu cuenta de DataPoint
2. Ve a **"My Account"** o **"API Keys"**
3. Copia tu **API Key** (formato: `01234567-89ab-cdef-0123-456789abcdef`)

### Paso 4: Configura la API Key en MindFly

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Pega tu API key:

```bash
METOFFICE_API_KEY=tu_clave_aqui
```

Ejemplo:
```bash
METOFFICE_API_KEY=01234567-89ab-cdef-0123-456789abcdef
```

---

## ✅ Verificar Configuración

Ejecuta el siguiente comando para verificar que la API está configurada correctamente:

```bash
npm run dev
```

Luego busca un vuelo en Reino Unido (ej: LHR → MAN) y verifica que aparezca la tarjeta de **Met Office UK** en los resultados.

---

## 📊 Datos Disponibles

### Pronósticos (5 días)

- **Temperatura** (°C)
- **Sensación térmica** (°C)
- **Humedad** (%)
- **Velocidad del viento** (mph)
- **Dirección del viento**
- **Visibilidad** (m, ft, yd, mi)
- **Probabilidad de precipitación** (%)
- **Tipo de clima** (30+ códigos detallados)
- **Índice UV**
- **Ráfagas de viento** (mph)

### Observaciones (24 horas)

- **Temperatura actual** (°C)
- **Punto de rocío** (°C)
- **Presión atmosférica** (hPa)
- **Tendencia de presión**
- **Humedad** (%)
- **Viento** (velocidad y dirección)
- **Visibilidad**
- **Condiciones actuales**

---

## 🌍 Cobertura

### ✅ Cobertura Principal

- **Reino Unido** (Inglaterra, Escocia, Gales, Irlanda del Norte)
- ~5000 ubicaciones para pronósticos
- ~140 estaciones meteorológicas para observaciones

### 📍 Cómo Funciona en MindFly

1. Cuando buscas un vuelo, el sistema analiza la ruta
2. Si la ruta pasa por Reino Unido o tiene origen/destino en UK:
   - ✅ Se busca la estación Met Office más cercana
   - ✅ Se obtienen datos meteorológicos oficiales
   - ✅ Se muestra la tarjeta **Met Office UK** con:
     - Temperatura promedio en ruta
     - Viento máximo
     - Probabilidad de precipitación
     - Condiciones en origen y destino

3. Si la ruta está fuera de UK:
   - ℹ️ La tarjeta no se muestra
   - ✅ Se usan otras fuentes de datos (Aviation Weather, GFS, etc.)

---

## 🎨 Visualización en la UI

Cuando hay datos de Met Office disponibles, verás una tarjeta como esta:

```
╔═══════════════════════════════════════╗
║  🇬🇧 Met Office UK                    ║
║  Servicio Meteorológico Oficial      ║
║                                       ║
║  🌡️ Temperatura: 15.2°C              ║
║  💨 Viento: 32 km/h (20 mph)         ║
║  🌧️ Precipitación: 25%               ║
║                                       ║
║  🛫 London Heathrow                   ║
║     Temperatura: 16°C (sensación 14°C)║
║     Humedad: 72%                      ║
║     Viento: 18 mph W                  ║
║     Clima: Parcialmente nublado      ║
║                                       ║
║  🛬 Manchester                        ║
║     Temperatura: 14°C (sensación 12°C)║
║     Humedad: 78%                      ║
║     Viento: 22 mph NW                 ║
║     Clima: Nublado                    ║
╚═══════════════════════════════════════╝
```

---

## 🔧 Archivos de Implementación

### Creados
- `lib/metoffice-api.ts` - Cliente de API y funciones principales
- `components/MetOfficeCard.tsx` - Componente de visualización

### Modificados
- `lib/flights.ts` - Integración con el sistema de pronósticos
- `components/FlightSelector.tsx` - Mostrar tarjeta Met Office
- `.env.local` - Configuración de API key
- `.env.example` - Documentación de variables

---

## 📚 Documentación Oficial

- **API Reference**: https://www.metoffice.gov.uk/services/data/datapoint/api-reference
- **Code Definitions**: https://www.metoffice.gov.uk/services/data/datapoint/code-definitions
- **Support**: https://www.metoffice.gov.uk/services/data/datapoint/support

---

## ⚡ Límites de la API

- **Rate Limit**: 100 peticiones por minuto (típico para cuenta gratuita)
- **Timeout**: 10 segundos por petición
- **Cache**: Recomendado cachear respuestas por 5-60 minutos
- **Actualizaciones**: Los pronósticos se actualizan cada hora

---

## 🐛 Troubleshooting

### Error: "METOFFICE_API_KEY no configurada"

**Solución**: Asegúrate de que `.env.local` existe y contiene la API key.

### Error: "Met Office API error: 401"

**Solución**: La API key es inválida. Verifica que la copiaste correctamente.

### Error: "Met Office API error: 403"

**Solución**: Has excedido el límite de peticiones. Espera un minuto e intenta de nuevo.

### No aparece la tarjeta de Met Office

**Causa**: La ruta no pasa por Reino Unido.  
**Solución**: Busca vuelos en UK (ej: LHR→MAN, EDI→LGW, etc.)

### Timeout en las peticiones

**Solución**: El servicio puede estar temporalmente lento. El sistema tiene un timeout de 10s y fallback automático.

---

## 💡 Tips

1. **Cache los datos**: Los pronósticos se actualizan cada hora, no necesitas consultar más frecuentemente
2. **Maneja errores gracefully**: La API puede fallar temporalmente, siempre ten un fallback
3. **Rutas UK**: Aprovecha Met Office para cualquier vuelo que pase por Reino Unido
4. **Combina fuentes**: Usa Met Office junto con Aviation Weather (PIREPs) y GFS para mejor cobertura

---

## 🎯 Ejemplos de Uso

### Buscar vuelos en UK:

- **London Heathrow → Manchester** (LHR → MAN)
- **Edinburgh → London Gatwick** (EDI → LGW)
- **Birmingham → Dublin** (BHX → DUB)
- **Glasgow → Belfast** (GLA → BFS)

Todos estos vuelos mostrarán datos de Met Office. 🇬🇧

---

## ✨ Estado

✅ **IMPLEMENTADO Y FUNCIONANDO**

- API integrada con el sistema de pronósticos
- Ejecución en paralelo con otras fuentes
- Fallback automático si no hay datos
- UI profesional con datos detallados
- Build exitoso sin errores

🚀 **¡Listo para usar!**

