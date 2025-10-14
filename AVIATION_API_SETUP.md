# 🔑 Configuración de AviationStack API

## API Key
```
0552d0931fe0d8e5bdcd16cf72392b41
```

## Configurar en Vercel

### Opción 1: Desde el Dashboard de Vercel (Recomendado)

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto **mindfly**
3. Ve a **Settings** → **Environment Variables**
4. Añade una nueva variable:
   - **Name**: `AVIATIONSTACK_API_KEY`
   - **Value**: `0552d0931fe0d8e5bdcd16cf72392b41`
   - **Environment**: Selecciona **Production**, **Preview**, y **Development**
5. Haz clic en **Save**
6. Redeploy el proyecto

### Opción 2: Desde la CLI

```bash
# En el directorio del proyecto
npx vercel env add AVIATIONSTACK_API_KEY production
# Cuando pregunte por el valor, pega: 0552d0931fe0d8e5bdcd16cf72392b41

# Luego redeploy
npx vercel --prod
```

## ¿Qué hace esta API?

**AviationStack** proporciona datos de vuelos en tiempo real:
- ✈️ Vuelos actuales entre aeropuertos
- 📊 Estado de vuelos (scheduled, active, landed, cancelled)
- 🛫 Horarios reales de salida y llegada
- ✈️ Información de aerolíneas y aeronaves
- 🌍 Cobertura global de rutas

## Plan Gratuito

- **100 requests/mes**
- Datos de vuelos históricos y en tiempo real
- Cobertura de aeropuertos globales
- Sin necesidad de tarjeta de crédito

## Sistema de Fallback

Si AviationStack no está disponible o se agotan las requests:

1. 🔄 **Base de datos local** con rutas comunes (BCN-MAD, MAD-BCN, BCN-LHR, etc.)
2. 🌐 **OpenSky Network** (API pública gratuita)
3. 📋 **Datos de referencia** de aerolíneas principales

## Verificar Configuración

Después de configurar, verifica que funciona:

```bash
# En local
echo $AVIATIONSTACK_API_KEY

# En Vercel
npx vercel env ls
```

## Links Útiles

- [AviationStack Dashboard](https://aviationstack.com/dashboard)
- [Documentación API](https://aviationstack.com/documentation)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

