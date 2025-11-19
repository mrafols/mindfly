# 🚀 Guía Rápida: Configurar API de AeroDataBox

## ✅ Estado Actual

- ✅ **Desarrollo Local**: Configurado y listo
- ⏳ **Producción (Vercel)**: Pendiente

## 📋 Resumen

Tu API key de AeroDataBox ya está configurada localmente en `.env.local`. Ahora puedes:

### 1. Probar Localmente

```bash
cd /Users/marcrafolsibanez/Dev/mindfly

# Verificar configuración
node check-env.js

# Iniciar servidor de desarrollo
npm run dev
```

Abre http://localhost:3000 y busca un vuelo. Deberías ver en los logs:
```
✅ AeroDataBox: X vuelos encontrados
```

### 2. Configurar en Vercel (Producción)

Tienes dos opciones:

#### Opción A: Dashboard de Vercel (Recomendado)

1. Ve a: https://vercel.com/mrafols-projects/mindfly/settings/environment-variables
2. Click en "Add New Variable"
3. Configura:
   - **Name**: `AERODATABOX_API_KEY`
   - **Value**: `867ea2c403msh9507d185e074c8p15f6jsnad2986aeb34`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
4. Click "Save"
5. Ve a tu proyecto y click "Redeploy"

#### Opción B: CLI de Vercel

```bash
cd /Users/marcrafolsibanez/Dev/mindfly

# Añadir variable de entorno
vercel env add AERODATABOX_API_KEY production
# Cuando pregunte, pega: 867ea2c403msh9507d185e074c8p15f6jsnad2986aeb34

# Redeploy
vercel --prod
```

### 3. Verificar que Funciona

Después de hacer el redeploy:

1. Ve a tu app en producción: https://mindfly.vercel.app
2. Busca un vuelo (ej: VY3900, BCN→MAH)
3. Deberías ver vuelos reales en lugar de simulados

## 🔍 Cómo Verificar que Está Funcionando

### En Desarrollo (Local)
```bash
npm run dev
# Busca un vuelo en http://localhost:3000
# Mira los logs en la consola
```

Deberías ver:
```
✅ AeroDataBox: 52 vuelos encontrados (BCN → MAH)
```

### En Producción (Vercel)
1. Ve a: https://vercel.com/mrafols-projects/mindfly/logs
2. Busca un vuelo en tu app
3. Verifica que no aparezcan errores de "AERODATABOX_API_KEY no configurada"

## 📊 Límites del Plan Gratuito

- **500 requests/mes**
- Cache de 5 minutos (multiplica tu capacidad)
- Sin tarjeta de crédito requerida

## 🆘 Solución de Problemas

### "AERODATABOX_API_KEY no configurada"
- **Local**: Verifica que existe `.env.local` con la API key
- **Vercel**: Verifica que la variable está en Settings → Environment Variables

### "API error: 401" o "API error: 403"
- La API key es incorrecta o expiró
- Verifica en RapidAPI que tu suscripción está activa

### No aparecen vuelos
- Puede que la ruta no tenga vuelos hoy
- Intenta con BCN→MAH o MAD→BCN (rutas con muchos vuelos)
- Verifica que estás dentro del límite de 500 requests/mes

## 📚 Más Información

- **Documentación completa**: [IMPORTANTE_AERODATABOX.md](IMPORTANTE_AERODATABOX.md)
- **Setup detallado**: [SETUP_AERODATABOX.md](SETUP_AERODATABOX.md)
- **RapidAPI Dashboard**: https://rapidapi.com/developer/dashboard

## ✨ Próximos Pasos

1. ✅ Configurar en Vercel (siguiendo las instrucciones arriba)
2. ✅ Hacer un redeploy
3. ✅ Probar búsquedas de vuelos
4. 🎉 ¡Disfruta de datos de vuelos reales!

