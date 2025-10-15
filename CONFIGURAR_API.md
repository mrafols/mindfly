# 🔑 Guía Completa: Configurar AeroDataBox API

## 📋 Lo que has logrado hasta ahora

✅ Código actualizado para usar AeroDataBox API
✅ Sistema de búsqueda de 3 niveles implementado
✅ Archivo `.env.local` creado
✅ Build exitoso

---

## 🚀 PASO A PASO: Obtener tu API Key

### Paso 1: Crear cuenta en RapidAPI (2 minutos)

1. Ve a: **https://rapidapi.com/**
2. Clic en "Sign Up" (arriba derecha)
3. Registrate con Google/GitHub o email
4. Verifica tu email

### Paso 2: Suscribirte a AeroDataBox (3 minutos)

1. Ve a: **https://rapidapi.com/aedbx-aedbx/api/aerodatabox**
2. Clic en el botón azul **"Subscribe to Test"**
3. Verás 4 planes:

```
┌─────────────────────────────────────────────┐
│ BASIC (GRATIS) ← Selecciona este           │
│ • 500 requests/mes                          │
│ • Datos en tiempo real                      │
│ • Perfecto para desarrollo                  │
│ • $0.00/mes                                 │
└─────────────────────────────────────────────┘
```

4. Selecciona **"Basic"** (el gratuito)
5. Clic en **"Subscribe"**
6. Añade un método de pago (NO te cobrarán si te quedas en el plan gratuito)
7. Confirma la suscripción

### Paso 3: Copiar tu API Key (1 minuto)

1. Una vez suscrito, verás la página de la API
2. En la parte superior, verás un ejemplo de código
3. En el header `X-RapidAPI-Key:` verás tu key
4. **Copia toda la key** (es algo como: `1234567890abcdef1234567890abcdef`)

---

## 🔧 Configurar la API Key en tu Proyecto

### Opción A: Configurar Localmente

1. Abre el archivo `.env.local` en tu proyecto:
   ```bash
   code .env.local
   # O usa tu editor favorito
   ```

2. Reemplaza `PEGA_TU_KEY_AQUI` con tu API key real:
   ```bash
   AERODATABOX_API_KEY=tu-key-real-de-rapidapi-aqui
   ```

3. Guarda el archivo

4. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Opción B: Configurar en Vercel (Producción)

Si ya desplegaste en Vercel:

1. Ve a tu proyecto en **https://vercel.com**
2. Settings → Environment Variables
3. Añade nueva variable:
   - **Name**: `AERODATABOX_API_KEY`
   - **Value**: Tu API key de RapidAPI
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
4. Redeploy tu aplicación

---

## ✅ Verificar que Funciona

### Método 1: Ver los Logs

1. Ejecuta tu aplicación en desarrollo:
   ```bash
   npm run dev
   ```

2. Busca un vuelo, por ejemplo: **VY3900**

3. En la consola del servidor (terminal) verás:
   ```
   🔍 Buscando vuelo VY3900 en AeroDataBox API...
   ✅ Vuelo encontrado en AeroDataBox API
   ✅ Ruta identificada: BCN → MAH
   ```

### Método 2: Probar Vuelos Reales

Prueba con estos números de vuelo reales:
- **VY3900** - Barcelona → Menorca (Vueling)
- **IB1013** - Barcelona → Madrid (Iberia)
- **UX1031** - Barcelona → Madrid (Air Europa)
- **BA478** - Barcelona → Londres (British Airways)

---

## 🎯 Sistema de 3 Niveles Implementado

Tu aplicación ahora busca vuelos en este orden:

```
┌─────────────────────────────────────────────┐
│ NIVEL 1: AeroDataBox API ⭐                 │
│ • Datos reales y actualizados               │
│ • Horarios exactos                          │
│ • Información completa                      │
│ • Origen y destino automático               │
└─────────────────────────────────────────────┘
         ↓ (si falla o no hay API key)
┌─────────────────────────────────────────────┐
│ NIVEL 2: Base de Datos Local 📊            │
│ • Vuelos comunes españoles                  │
│ • Rutas principales: BCN-MAH, BCN-MAD, etc. │
│ • Horarios típicos                          │
└─────────────────────────────────────────────┘
         ↓ (si no encuentra el vuelo)
┌─────────────────────────────────────────────┐
│ NIVEL 3: Vuelo Simulado 🔧                 │
│ • Ruta predeterminada: BCN → MAD            │
│ • Siempre muestra pronóstico                │
│ • Última opción                             │
└─────────────────────────────────────────────┘
```

---

## 🔍 Ejemplo de Funcionamiento

### Con API Key Configurada ✅

```
Usuario busca: VY3900
    ↓
🔍 Busca en AeroDataBox API
    ↓
✅ Encuentra: VY3900 - Barcelona (BCN) → Menorca (MAH)
    ↓
📊 Genera pronóstico de turbulencias para BCN → MAH
    ↓
🎉 Usuario ve información real y precisa
```

### Sin API Key (Fallback) ⚠️

```
Usuario busca: VY3900
    ↓
🔍 Busca en AeroDataBox API → ❌ No configurada
    ↓
🔍 Busca en base de datos local
    ↓
✅ Encuentra: VY3900 en ruta BCN → MAH
    ↓
📊 Genera pronóstico de turbulencias para BCN → MAH
    ↓
👍 Usuario ve información correcta (de base de datos local)
```

---

## 📊 Límites del Plan Gratuito

```
Plan Basic (Gratis):
├─ 500 requests/mes
├─ ~16 requests/día
└─ Perfecto para:
   ├─ Desarrollo local
   ├─ Testing
   └─ Apps con poco tráfico (~100-200 usuarios/mes)
```

Si necesitas más:
- **Plan Pro**: $9.99/mes → 10,000 requests
- **Plan Ultra**: $49.99/mes → 100,000 requests

---

## 🐛 Solución de Problemas

### Problema 1: "AERODATABOX_API_KEY no configurada"

**Solución**:
1. Verifica que `.env.local` existe
2. Verifica que la variable está escrita correctamente: `AERODATABOX_API_KEY`
3. Reinicia el servidor: `npm run dev`

### Problema 2: "AeroDataBox API error: 401"

**Solución**:
- Tu API key es incorrecta
- Copia de nuevo desde RapidAPI
- Asegúrate de que estás suscrito al plan

### Problema 3: "AeroDataBox API error: 429"

**Solución**:
- Superaste el límite de 500 requests/mes
- Espera al siguiente mes
- O actualiza a plan Pro

### Problema 4: El vuelo no se encuentra

**Solución**:
- Verifica el número de vuelo en FlightRadar24 o Google Flights
- El sistema usará fallback nivel 2 o 3 automáticamente

---

## 🎯 Próximos Pasos

Una vez configurado:

1. ✅ Prueba con vuelos reales
2. ✅ Verifica los logs en la consola
3. ✅ Comprueba que VY3900 ahora muestra BCN → MAH (no BCN → MAD)
4. ✅ Celebra que tienes datos reales de vuelos 🎉

---

## 📝 Resumen

**Antes**:
- ❌ VY3900 mostraba BCN → MAD (incorrecto)
- ❌ Datos de vuelos hardcodeados
- ❌ Sin información real

**Ahora**:
- ✅ VY3900 muestra BCN → MAH (correcto)
- ✅ Datos reales de AeroDataBox API
- ✅ Horarios actualizados
- ✅ Fallback a base de datos local si la API no está disponible
- ✅ Sistema robusto de 3 niveles

---

## 🔗 Enlaces Útiles

- **RapidAPI**: https://rapidapi.com/
- **AeroDataBox**: https://rapidapi.com/aedbx-aedbx/api/aerodatabox
- **Documentación AeroDataBox**: https://docs.aerodatabox.com/
- **FlightRadar24** (verificar vuelos): https://www.flightradar24.com/

---

**¿Necesitas ayuda?** 
- Revisa los logs en la consola
- Verifica que la API key está correctamente configurada
- Asegúrate de estar en el plan Basic (gratis)

---

**Fecha**: 15 de octubre de 2025  
**Estado**: ✅ Listo para configurar  
**Build**: ✅ Exitoso  
**Next Steps**: Obtener API key y configurar

