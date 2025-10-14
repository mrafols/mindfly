# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar MindFly en Vercel de manera rápida y sencilla.

## Opción 1: Despliegue desde GitHub (Recomendado)

### Paso 1: Preparar el Repositorio
```bash
# Inicializar git si no lo has hecho
git init

# Añadir todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit: MindFly app"

# Crear repositorio en GitHub y subir el código
git remote add origin https://github.com/tu-usuario/mindfly.git
git branch -M main
git push -u origin main
```

### Paso 2: Importar en Vercel
1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en "Add New..." → "Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js
5. Haz clic en "Deploy"

¡Y listo! Tu aplicación estará disponible en una URL de Vercel.

## Opción 2: Despliegue con Vercel CLI

### Paso 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Paso 2: Login
```bash
vercel login
```

### Paso 3: Desplegar
```bash
# Desde el directorio del proyecto
vercel

# Para producción
vercel --prod
```

## Configuración Adicional

### Variables de Entorno
No se requieren variables de entorno ya que usamos APIs gratuitas sin autenticación.

### Dominios Personalizados
1. En el dashboard de Vercel, ve a tu proyecto
2. Settings → Domains
3. Añade tu dominio personalizado
4. Configura los registros DNS según las instrucciones

### Actualizaciones Automáticas
Si desplegaste desde GitHub:
- Cada push a la rama `main` desplegará automáticamente a producción
- Cada push a otras ramas creará una preview deployment

## Verificación Post-Despliegue

Después del despliegue, verifica:
- ✅ La página principal carga correctamente
- ✅ El cambio de idioma funciona (ES ↔️ EN)
- ✅ La búsqueda de aeropuertos muestra sugerencias
- ✅ La página de forecast muestra el mapa y los datos meteorológicos
- ✅ El sitio es responsive en móvil

## Monitoreo

Vercel proporciona:
- Analytics de uso
- Logs en tiempo real
- Métricas de rendimiento (Core Web Vitals)

Accede a esto desde el dashboard de tu proyecto en Vercel.

## Solución de Problemas

### Error de Build
Si el build falla:
```bash
# Prueba construir localmente
npm run build

# Verifica que todas las dependencias estén instaladas
npm install
```

### Error 404 en Rutas
Vercel maneja automáticamente las rutas de Next.js. Si tienes problemas:
- Verifica que `vercel.json` esté configurado correctamente
- Comprueba que el middleware esté funcionando

### Performance
Para mejorar el rendimiento:
- Las imágenes se optimizan automáticamente con Next.js Image
- Los assets estáticos se sirven desde el CDN de Vercel
- Las páginas estáticas se pre-renderizan en build time

## Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Next.js en Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Dominios y DNS](https://vercel.com/docs/concepts/projects/domains)

