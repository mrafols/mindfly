# 🚀 Configuración de AeroDataBox API

## ¿Por qué AeroDataBox?

AeroDataBox es la fuente **PRINCIPAL** de datos de vuelos en MindFly porque:

✅ **Datos reales verificados** - No simulaciones ni estimaciones
✅ **Horarios exactos** - Salidas y llegadas reales de aerolíneas
✅ **Números de vuelo correctos** - Verificados con aerolíneas
✅ **Información completa** - Aeronave, terminales, puertas
✅ **Cobertura global** - Todas las aerolíneas comerciales

## Paso 1: Obtener API Key

### 1.1 Registrarse en RapidAPI

1. Ve a https://rapidapi.com/auth/sign-up
2. Crea una cuenta (gratis)
3. Verifica tu email

### 1.2 Suscribirse a AeroDataBox

1. Ve a https://api.market/store/aedbx/aerodatabox
2. Haz clic en **"Subscribe to Test"**
3. Selecciona el plan **Basic (FREE)**:
   - ✅ 500 requests/mes
   - ✅ Datos en tiempo real
   - ✅ Sin tarjeta de crédito

### 1.3 Copiar tu API Key

1. Una vez suscrito, ve a https://rapidapi.com/aedbx-aedbx/api/aerodatabox
2. En la esquina superior derecha verás **"X-RapidAPI-Key"**
3. Copia ese valor (algo como: `abc123def456...`)

## Paso 2: Configurar en Vercel (RECOMENDADO)

### Opción A: Dashboard de Vercel

1. Ve a https://vercel.com/mrafols-projects/mindfly
2. Click en **Settings** → **Environment Variables**
3. Add New:
   ```
   Name: AERODATABOX_API_KEY
   Value: [pega tu API key aquí]
   Environments: ✅ Production, ✅ Preview, ✅ Development
   ```
4. Click **Save**

### Opción B: Vercel CLI

```bash
cd /Users/marcrafolsibanez/Dev/mindfly
vercel env add AERODATABOX_API_KEY
# Pega tu API key cuando te lo pida
# Selecciona: Production, Preview, Development
```

### Verificar configuración

```bash
vercel env ls
# Deberías ver AERODATABOX_API_KEY en la lista
```

## Paso 3: Redeploy

```bash
# Hacer un redeploy para que tome las variables
npx vercel --prod
```

O simplemente haz un commit y push:

```bash
git commit --allow-empty -m "Trigger redeploy with AeroDataBox"
git push origin main
```

## Paso 4: Verificar que Funciona

1. Ve a tu app desplegada
2. Busca una ruta (ej: BCN → MAD)
3. En la consola del navegador (F12) deberías ver:
   ```
   🔍 Buscando vuelos BCN → MAD
   📡 Intentando con AeroDataBox API...
   ✅ AeroDataBox: 8 vuelos encontrados
   ```

## 🎯 Planes de AeroDataBox

### Basic (GRATIS)
- **500 requests/mes**
- Datos en tiempo real
- Todas las funciones
- **Perfecto para desarrollo**

### Pro ($9.99/mes)
- **10,000 requests/mes**
- Todo lo de Basic
- Soporte prioritario
- **Recomendado para producción**

### Ultra ($49.99/mes)
- **100,000 requests/mes**
- Sin límites de tasa
- **Para apps de alto tráfico**

## 📊 Consumo Estimado

Con el plan gratuito (500 requests/mes):

- **Búsqueda de vuelo**: 1-2 requests
- **Usuario típico**: 5-10 búsquedas
- **Usuarios/mes soportados**: ~50-100

### Optimización con Cache

MindFly usa cache de 5 minutos, así que:

- Si 10 usuarios buscan BCN→MAD en 5 minutos = **1 request**
- Esto multiplica x10 tu capacidad

## 🔍 ¿Cómo Saber si está Funcionando?

### Logs en Servidor (Vercel)

```bash
# Ver logs en tiempo real
vercel logs --follow

# Buscar logs específicos de AeroDataBox
vercel logs | grep AeroDataBox
```

### En Desarrollo Local

```bash
# Crear .env.local con tu API key
echo "AERODATABOX_API_KEY=tu-key-aqui" > .env.local

# Ejecutar en desarrollo
npm run dev

# Verás logs en la terminal:
# ✅ AeroDataBox: 5 vuelos encontrados
```

## ⚠️ Troubleshooting

### "No se encontraron vuelos"

1. **Verifica la API key**: `vercel env ls`
2. **Verifica el plan**: Asegúrate de estar suscrito en RapidAPI
3. **Límite alcanzado**: Revisa tu usage en RapidAPI dashboard

### "Error 401: Unauthorized"

- API key incorrecta o no configurada
- Verifica que copiaste la key completa

### "Error 429: Too Many Requests"

- Has excedido el límite de 500 requests/mes
- Espera al próximo ciclo o upgrade a Pro

### "Error 403: Forbidden"

- No estás suscrito al plan
- Ve a RapidAPI y suscríbete al plan Basic

## 🔄 Sistema de Fallback

Si AeroDataBox falla o no tiene datos, MindFly automáticamente intenta:

1. **AeroDataBox** (PRINCIPAL) 🥇
2. AviationStack (si configurado)
3. Base de datos local (rutas comunes)
4. OpenSky Network (público)

Pero **siempre intenta AeroDataBox primero**.

## 📝 Notas Importantes

1. **La API key es GRATIS** - No necesitas tarjeta de crédito
2. **500 requests/mes** es suficiente para desarrollo y pruebas
3. **Cache de 5 minutos** multiplica tu capacidad
4. **Los datos son REALES** - No simulaciones
5. **Funciona globalmente** - Todos los aeropuertos comerciales

## 🆘 Soporte

Si tienes problemas:

1. **RapidAPI Support**: https://rapidapi.com/aedbx-aedbx/api/aerodatabox/discussions
2. **AeroDataBox Docs**: https://rapidapi.com/aedbx-aedbx/api/aerodatabox/details
3. **MindFly Issues**: https://github.com/mrafols/mindfly/issues

## ✅ Checklist de Configuración

- [ ] Cuenta en RapidAPI creada
- [ ] Suscrito a AeroDataBox (plan Basic)
- [ ] API key copiada
- [ ] Variable de entorno en Vercel configurada
- [ ] Redeploy realizado
- [ ] Probado en la aplicación
- [ ] Logs verificados (✅ AeroDataBox: X vuelos encontrados)

---

**¿Listo?** Una vez configurada la API key, MindFly mostrará **vuelos reales** con datos verificados de todas las aerolíneas del mundo. 🚀✈️

