# 🚀 Guía Rápida de Instalación

Esta guía te ayudará a instalar y ejecutar el proyecto rápidamente.

## ⚡ Instalación Rápida (3 pasos)

### 1️⃣ Instalar Dependencias

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- `express` - Framework web para Node.js
- `ejs` - Motor de plantillas

### 2️⃣ Ejecutar el Servidor

```bash
npm start
```

O si quieres desarrollo con auto-reload (requiere nodemon):

```bash
npm run dev
```

### 3️⃣ Abrir en el Navegador

Abre tu navegador y visita:

```
http://localhost:8080
```

## ✅ Verificar que Todo Funciona

Una vez que el servidor esté corriendo, deberías ver en la consola:

```
========================================
  Servidor corriendo en puerto 8080
  Abre tu navegador en: http://localhost:8080
========================================
```

### Páginas para Verificar

- **Home**: http://localhost:8080/
- **Empieza Aquí**: http://localhost:8080/start-here
- **Programas**: http://localhost:8080/programs
- **Blog**: http://localhost:8080/blog
- **Acerca de**: http://localhost:8080/about
- **Contacto**: http://localhost:8080/contact
- **Panel Admin**: http://localhost:8080/admin

## 🔧 Solución de Problemas

### Error: "Cannot find module 'express'"

**Solución**: Asegúrate de haber ejecutado `npm install` primero.

### Error: "Port 8080 is already in use"

**Solución**: 
1. Cambia el puerto en `app.js` (línea 20): `const PORT = process.env.PORT || 3001;`
2. O detén el proceso que está usando el puerto 8080

### El servidor no inicia

**Verifica**:
1. Tienes Node.js instalado: `node --version` (debe ser 14 o superior)
2. Estás en la carpeta correcta del proyecto
3. Ejecutaste `npm install`

## 📝 Notas Importantes

1. **Primera vez**: La primera vez que ejecutas `npm install`, puede tardar unos minutos mientras descarga las dependencias.

2. **Imágenes**: Las imágenes están referenciadas pero pueden no existir aún. Eso es normal. El sitio funcionará sin ellas, solo mostrará texto alternativo.

3. **Datos**: Los datos de ejemplo están en `data/posts.json` y `data/programs.json`. Puedes editarlos directamente o usar el panel admin.

## 🎨 Personalización

Una vez que el sitio funcione, puedes empezar a personalizar:

1. **Colores**: `public/css/styles.css` (variables CSS)
2. **Textos**: Edita las vistas `.ejs` en `views/`
3. **Datos**: Edita `data/posts.json` y `data/programs.json`
4. **Imágenes**: Agrega tus imágenes en `public/img/`

## 📚 Próximos Pasos

Después de verificar que todo funciona:

1. Lee el `README.md` completo para más detalles
2. Revisa `public/img/README.md` para saber dónde poner las imágenes
3. Personaliza los textos y colores según tus necesidades
4. Agrega tus propias imágenes y contenido

---

**¡Listo!** Si tienes algún problema, revisa los comentarios en el código (busca `// CAMBIAR:` o `<!-- CAMBIAR: -->`).

