# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a MindFly! Este documento te guiará a través del proceso.

## Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código. Por favor, reporta comportamientos inaceptables.

## ¿Cómo Puedo Contribuir?

### 🐛 Reportar Bugs

Si encuentras un bug:

1. **Verifica** que no haya sido reportado ya en los Issues
2. **Abre un nuevo Issue** con:
   - Título descriptivo
   - Pasos para reproducir el problema
   - Comportamiento esperado vs comportamiento actual
   - Screenshots si es relevante
   - Información del navegador/sistema

### 💡 Sugerir Mejoras

Para sugerir nuevas características:

1. **Verifica** que no haya sido sugerido ya
2. **Abre un Issue** describiendo:
   - El problema que resuelve
   - Cómo debería funcionar
   - Por qué sería útil para los usuarios

### 🔨 Pull Requests

1. **Fork** el repositorio
2. **Crea una rama** desde `main`:
   ```bash
   git checkout -b feature/nombre-descriptivo
   ```
3. **Haz tus cambios**:
   - Sigue el estilo de código existente
   - Añade comentarios donde sea necesario
   - Actualiza la documentación si es relevante
4. **Prueba tus cambios**:
   ```bash
   npm run build
   npm run lint
   ```
5. **Commit** con mensajes descriptivos:
   ```bash
   git commit -m "feat: añadir búsqueda de aeropuertos por país"
   ```
6. **Push** a tu fork:
   ```bash
   git push origin feature/nombre-descriptivo
   ```
7. **Abre un Pull Request** en GitHub

## Estilo de Código

### TypeScript/React

- Usa TypeScript para todo el código
- Componentes funcionales con Hooks
- Props con interfaces tipadas
- Nombres descriptivos para variables y funciones

### Commits

Seguimos la convención de commits semánticos:

- `feat:` Nueva característica
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formato, punto y coma faltante, etc
- `refactor:` Refactorización de código
- `test:` Añadir tests
- `chore:` Mantenimiento

Ejemplo:
```
feat: añadir más aeropuertos latinoamericanos
fix: corregir cálculo de distancia en hemisferio sur
docs: actualizar README con nuevas características
```

## Áreas de Contribución

### Aeropuertos 🛫

Ayuda añadiendo más aeropuertos a `lib/airports.ts`:

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

### Traducciones 🌐

Mejora las traducciones en:
- `messages/es.json` (Español)
- `messages/en.json` (Inglés)

O añade nuevos idiomas:
1. Crea `messages/[codigo].json`
2. Actualiza `i18n/routing.ts`
3. Añade el idioma al selector

### Explicaciones Meteorológicas 🌤️

Mejora las explicaciones en `lib/weather.ts` para que sean más:
- Tranquilizadoras
- Precisas científicamente
- Fáciles de entender

### UI/UX 🎨

Mejora el diseño y la experiencia de usuario:
- Accesibilidad
- Diseño responsive
- Animaciones suaves
- Feedback visual

## Estructura del Proyecto

```
mindfly/
├── app/              # Páginas Next.js
│   └── [locale]/     # Rutas con idiomas
├── components/       # Componentes React
├── lib/             # Lógica de negocio
│   ├── airports.ts  # Base de datos de aeropuertos
│   └── weather.ts   # API meteorológica
├── messages/        # Archivos de traducción
├── i18n/           # Configuración de idiomas
└── public/         # Assets estáticos
```

## Proceso de Revisión

1. Un mantenedor revisará tu PR
2. Pueden solicitar cambios
3. Una vez aprobado, se fusionará
4. Los cambios se desplegarán automáticamente

## Testing

Antes de enviar un PR, verifica:

- ✅ `npm run build` funciona sin errores
- ✅ `npm run lint` no muestra errores
- ✅ La aplicación funciona en desarrollo
- ✅ Los cambios son responsive (móvil/tablet/escritorio)
- ✅ Funciona en ambos idiomas (es/en)

## ¿Necesitas Ayuda?

- Abre un Issue con tus preguntas
- Revisa los Issues existentes
- Contacta a los mantenedores

## Reconocimiento

Todos los contribuyentes serán añadidos al README. ¡Gracias por hacer MindFly mejor! 💙✈️

