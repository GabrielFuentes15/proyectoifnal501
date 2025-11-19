# Academia de Muay Thai - Sitio Web Profesional

Sitio web profesional para academia de Muay Thai desarrollado con Node.js, Express, EJS y Bootstrap.

## 📋 Descripción

Este proyecto es una página web completa y profesional inspirada en la estructura de "Muay-Thai-Guy.com", diseñada para ser genérica y fácilmente personalizable. El sitio incluye:

- **Home/Inicio**: Hero principal, programas destacados, recursos gratuitos, testimonios y suscripción
- **Empieza Aquí**: Orientación según nivel (Principiante, Intermedio, Competidor)
- **Acerca de**: Información del entrenador, historia, misión, visión y valores
- **Programas**: Listado y detalle de cursos/programas de entrenamiento
- **Blog**: Listado y detalle de posts con paginación
- **Contacto**: Formulario de contacto funcional
- **Panel Admin**: Administración sencilla de posts y programas (sin autenticación avanzada)

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js (versión 14 o superior)
- npm (viene incluido con Node.js)

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   # Si tienes el proyecto en un repositorio
   git clone [url-del-repositorio]
   
   # O simplemente navega a la carpeta del proyecto
   cd ProyectoFinal
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```
   
   Esto instalará:
   - `express`: Framework web para Node.js
   - `ejs`: Motor de plantillas

3. **Ejecutar el servidor**
   ```bash
   npm start
   ```
   
   O si prefieres desarrollo con auto-reload (requiere nodemon):
   ```bash
   npm run dev
   ```
   
   **Nota**: Si no tienes nodemon instalado globalmente, puedes instalarlo como dependencia de desarrollo:
   ```bash
   npm install --save-dev nodemon
   ```

4. **Abrir en el navegador**
   
   Abre tu navegador y visita:
   ```
   http://localhost:8080
   ```

## 📁 Estructura del Proyecto

```
ProyectoFinal/
│
├── app.js                 # Servidor principal (Node.js + Express)
├── package.json           # Dependencias y scripts del proyecto
├── README.md              # Este archivo
│
├── routes/                # Rutas de la aplicación
│   ├── index.js          # Rutas principales (home, about, contact, start-here)
│   ├── blog.js           # Rutas del blog
│   ├── programs.js       # Rutas de programas/cursos
│   └── admin.js          # Rutas del panel administrativo
│
├── views/                 # Vistas EJS (plantillas)
│   ├── partials/         # Componentes reutilizables
│   │   ├── header.ejs    # Encabezado HTML
│   │   ├── navbar.ejs    # Barra de navegación
│   │   └── footer.ejs    # Pie de página
│   │
│   ├── admin/            # Vistas del panel admin
│   │   ├── dashboard.ejs # Dashboard principal
│   │   ├── posts.ejs     # Listado de posts
│   │   ├── post-form.ejs # Formulario crear/editar post
│   │   ├── programs.ejs  # Listado de programas
│   │   └── program-form.ejs # Formulario crear/editar programa
│   │
│   ├── home.ejs          # Página de inicio
│   ├── start-here.ejs    # Página "Empieza Aquí"
│   ├── about.ejs         # Página "Acerca de"
│   ├── contact.ejs       # Página de contacto
│   ├── programs.ejs      # Listado de programas
│   ├── program-detail.ejs # Detalle de programa
│   ├── blog.ejs          # Listado de posts del blog
│   ├── blog-detail.ejs   # Detalle de post
│   ├── 404.ejs           # Página 404 (no encontrada)
│   └── error.ejs         # Página de error del servidor
│
├── public/                # Archivos estáticos
│   ├── css/
│   │   └── styles.css    # Estilos personalizados (CAMBIAR AQUÍ)
│   ├── img/              # Imágenes (agregar tus imágenes aquí)
│   │   ├── hero/         # Imágenes del hero
│   │   ├── programs/     # Imágenes de programas
│   │   ├── blog/         # Imágenes del blog
│   │   └── ...           # Otras imágenes
│   └── js/               # Scripts JavaScript adicionales (si los necesitas)
│
└── data/                  # Datos en formato JSON
    ├── posts.json        # Posts del blog (CAMBIAR AQUÍ)
    └── programs.json     # Programas/cursos (CAMBIAR AQUÍ)
```

## 🎨 Personalización

### Cambiar Colores

Abre `public/css/styles.css` y modifica las variables CSS en la sección `:root` (líneas 19-44):

```css
:root {
    --primary-color: #0d6efd;    /* Cambia este color */
    --secondary-color: #6c757d;  /* Y este */
    /* ... más variables ... */
}
```

### Cambiar Textos

Los textos están distribuidos en las vistas EJS. Busca comentarios que digan `<!-- CAMBIAR: ... -->` para encontrar dónde modificar:

- **Títulos**: Busca en cada vista `.ejs`
- **Descripciones**: Busca en `views/` y en `data/posts.json` / `data/programs.json`
- **Hero**: `views/home.ejs` (línea 22)

### Cambiar Imágenes

1. **Logo**: Cambia la ruta en `views/partials/navbar.ejs` (línea 17 o comenta la opción 2)
2. **Hero**: Agrega tu imagen en `public/img/hero/hero-bg.jpg` y ajusta la ruta en `public/css/styles.css` (línea 128)
3. **Programas**: Agrega imágenes en `public/img/programs/` y actualiza las rutas en `data/programs.json`
4. **Blog**: Agrega imágenes en `public/img/blog/` y actualiza las rutas en `data/posts.json`
5. **Fotos de perfil**: Agrega en `public/img/` y actualiza la ruta en `views/about.ejs`

### Cambiar Tipografías

1. Modifica las URLs de Google Fonts en `views/partials/header.ejs` (línea 26)
2. Actualiza las variables de fuente en `public/css/styles.css` (líneas 39-42)

### Agregar/Modificar Posts

Edita el archivo `data/posts.json` directamente o usa el panel admin en:
```
http://localhost:8080/admin/posts
```

### Agregar/Modificar Programas

Edita el archivo `data/programs.json` directamente o usa el panel admin en:
```
http://localhost:8080/admin/programs
```

## 🔧 Panel Administrativo

Accede al panel administrativo en:
```
http://localhost:8080/admin
```

**Nota**: Este panel NO tiene autenticación avanzada. Para producción, se recomienda agregar:
- Autenticación con JWT o sesiones
- Middleware de autenticación
- Protección de rutas

Puedes habilitar una clave simple editando `routes/admin.js` (líneas 14-23).

### Funcionalidades del Admin

- ✅ Ver dashboard con estadísticas
- ✅ CRUD completo de posts (Crear, Leer, Actualizar, Eliminar)
- ✅ CRUD completo de programas
- ✅ Validación de formularios

## 📝 Notas Importantes

1. **Formulario de Contacto**: Actualmente solo simula el envío. Para producción, integra un servicio como:
   - Nodemailer (para enviar emails)
   - SendGrid
   - Mailgun
   - Etc.

2. **Newsletter**: El formulario del newsletter en la página de inicio no tiene backend funcional. Puedes integrar:
   - Mailchimp
   - SendGrid
   - Otu servicio de newsletter preferido

3. **Imágenes**: El proyecto incluye referencias a imágenes que debes agregar en `public/img/`. Puedes usar placeholders mientras desarrollas.

4. **Producción**: Para producción:
   - Configura variables de entorno (puerto, URLs, etc.)
   - Agrega autenticación al panel admin
   - Implementa envío real de correos
   - Optimiza imágenes
   - Configura HTTPS
   - Usa un proceso manager como PM2

## 🛠️ Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor
npm start

# Iniciar en modo desarrollo (con auto-reload, requiere nodemon)
npm run dev
```

## 📚 Tecnologías Utilizadas

- **Node.js**: Runtime de JavaScript
- **Express**: Framework web
- **EJS**: Motor de plantillas
- **Bootstrap 5**: Framework CSS
- **Font Awesome**: Iconos
- **Google Fonts**: Tipografías

## 📄 Licencia

Este proyecto está disponible para uso personal y educativo.

## 🤝 Soporte

Si tienes preguntas o necesitas ayuda con la personalización:
1. Revisa los comentarios en el código (están marcados con `// CAMBIAR:` o `<!-- CAMBIAR: -->`)
2. Consulta la documentación de [Express](https://expressjs.com/) y [Bootstrap](https://getbootstrap.com/)

---

**¡Listo para personalizar y usar!** 🥊

Recuerda que todos los elementos personalizables están marcados con comentarios en el código.
