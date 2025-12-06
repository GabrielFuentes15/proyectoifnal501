# 📁 Carpeta de Imágenes

Esta carpeta contiene todas las imágenes del sitio web.

## 📂 Estructura Recomendada

Organiza tus imágenes de la siguiente manera:

```
img/
├── hero/
│   └── hero-bg.jpg          # Imagen de fondo del hero (página principal)
├── logo.png                  # Logo del sitio (opcional, también puedes usar texto)
├── trainer.jpg               # Foto del entrenador (página About)
├── programs/                 # Imágenes de programas
│   ├── fundamentos.jpg
│   ├── intermedio.jpg
│   ├── competencia.jpg
│   ├── fitness.jpg
│   └── clinch.jpg
├── blog/                     # Imágenes de posts del blog
│   ├── post-1.jpg
│   ├── post-2.jpg
│   ├── post-3.jpg
│   └── post-4.jpg
└── levels/                   # Imágenes para la página "Empieza Aquí"
    ├── principiante.jpg
    ├── intermedio.jpg
    └── competidor.jpg
```

## 📝 Notas Importantes

1. **Formatos recomendados**: JPG, PNG, WebP
2. **Tamaños sugeridos**:
   - Hero background: 1920x1080px o mayor
   - Imágenes de programas/blog: 800x600px o 1200x800px
   - Logo: 200x200px o proporción similar
   - Fotos de perfil: 400x400px (cuadradas)

3. **Optimización**: Antes de subir, optimiza las imágenes para web:
   - Comprime imágenes para reducir tamaño de archivo
   - Usa herramientas como TinyPNG, ImageOptim, etc.

4. **Placeholders**: Si no tienes imágenes aún, puedes usar:
   - Servicios de placeholder: https://via.placeholder.com/800x600
   - O simplemente deja las rutas y el sitio mostrará el texto alternativo

## 🔗 Actualizar Rutas

Después de agregar tus imágenes, actualiza las rutas en:
- `data/posts.json` - Para imágenes de posts
- `data/programs.json` - Para imágenes de programas
- `views/about.ejs` - Para foto del entrenador
- `public/css/styles.css` - Para imagen de fondo del hero
- `views/start-here.ejs` - Para imágenes de niveles

