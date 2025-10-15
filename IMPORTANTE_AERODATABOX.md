# ⚠️ IMPORTANTE: Configurar AeroDataBox API

## 🚨 Problema Actual

**Los vuelos que se muestran son SIMULADOS de una base de datos local limitada.**

Por ejemplo, para BCN→MAH (Barcelona-Menorca):
- ❌ Base de datos local: Solo 21 vuelos añadidos manualmente
- ✅ **AeroDataBox real**: Todos los vuelos del día (50+ vuelos)

### Rutas con datos limitados:
- BCN → MAH (Barcelona → Menorca) - Solo 21 vuelos en base local
- Muchas otras rutas europeas no están en la base local
- Horarios pueden no coincidir con la realidad

## ✅ Solución: Activar AeroDataBox

AeroDataBox te dará **TODOS los vuelos reales** de **TODAS las aerolíneas** automáticamente.

### Pasos Rápidos (5 minutos):

1. **Registrarse en RapidAPI** (gratis)
   - https://rapidapi.com/auth/sign-up

2. **Suscribirse a AeroDataBox** (plan gratis)
   - https://api.market/store/aedbx/aerodatabox
   - Click "Subscribe to Test"
   - Seleccionar plan **Basic (FREE)** - 500 requests/mes

3. **Copiar tu API Key**
   - La verás en RapidAPI como "X-RapidAPI-Key"
   - Es algo como: `abc123def456...`

4. **Configurar en Vercel**
   
   **Opción A - Dashboard (más fácil):**
   - Ve a: https://vercel.com/mrafols-projects/mindfly/settings/environment-variables
   - Click "Add New"
   - Name: `AERODATABOX_API_KEY`
   - Value: [pega tu API key]
   - Environments: ✅ Todos
   - Save
   
   **Opción B - CLI:**
   ```bash
   cd /Users/marcrafolsibanez/Dev/mindfly
   vercel env add AERODATABOX_API_KEY
   # Pega tu API key cuando te lo pida
   ```

5. **Redeploy**
   ```bash
   npx vercel --prod
   ```

## 📊 Comparación

### Sin AeroDataBox (ACTUAL)
```
BCN → MAH
❌ 21 vuelos simulados
❌ Horarios aproximados
❌ Puede no coincidir con realidad
❌ Hay que añadir cada ruta manualmente
```

### Con AeroDataBox
```
BCN → MAH
✅ 50+ vuelos reales
✅ Horarios exactos de aerolíneas
✅ Todos los vuelos del día
✅ Actualizado en tiempo real
✅ TODAS las rutas automáticamente
```

## 🆓 Es Gratis

- **500 requests/mes** (suficiente para desarrollo)
- **Sin tarjeta de crédito**
- **Sin compromiso**
- Cache de 5 minutos multiplica tu capacidad

## 🔍 Cómo Verificar que Funciona

Después de configurar, busca BCN→MAH y verás en los logs de Vercel:

```
🔍 Buscando vuelos BCN → MAH
📡 Intentando con AeroDataBox API...
✅ AeroDataBox: 52 vuelos encontrados
```

En lugar de:
```
🔍 Buscando vuelos BCN → MAH
📡 Intentando con AeroDataBox API...
⚠️ AeroDataBox: No se encontraron vuelos
📚 Buscando en base de datos local...
✅ Base de datos local: 21 vuelos encontrados
```

## 📝 Documentación Completa

Ver: [SETUP_AERODATABOX.md](SETUP_AERODATABOX.md) para instrucciones detalladas paso a paso.

---

**TL;DR:** Configura AeroDataBox API (gratis, 5 minutos) para obtener todos los vuelos reales en lugar de datos simulados limitados.

