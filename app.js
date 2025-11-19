/**
 * ============================================================================
 * APLICACIÓN PRINCIPAL - SERVIDOR NODE.JS + EXPRESS
 * ============================================================================
 * 
 * INSTRUCCIONES DE USO:
 * 1. Instalar dependencias: npm install
 * 2. Ejecutar servidor: npm start
 * 3. Abrir navegador en: http://localhost:8080
 * 
 * Para desarrollo con auto-reload: npm run dev (requiere nodemon instalado)
 * ============================================================================
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// ============================================================================
// CONFIGURACIÓN DE EXPRESS
// ============================================================================

// Configurar EJS como motor de plantillas
// CAMBIAR: Si quieres usar otro motor de vistas (Handlebars, Pug), 
// cambia 'ejs' y ajusta la configuración
app.set('view engine', 'ejs');

// CAMBIAR: Ruta donde están las vistas (por defecto './views')
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde /public
// CAMBIAR: Si cambias la estructura, ajusta esta ruta
app.use(express.static(path.join(__dirname, 'public')));

// ============================================================================
// FUNCIONES AUXILIARES PARA MANEJO DE DATOS JSON
// ============================================================================
// Las funciones están en utils/data.js para mejor organización

// ============================================================================
// RUTAS PRINCIPALES
// ============================================================================

// Importar rutas
const indexRoutes = require('./routes/index');
const blogRoutes = require('./routes/blog');
const programsRoutes = require('./routes/programs');
const adminRoutes = require('./routes/admin');

// Usar rutas
app.use('/', indexRoutes);
app.use('/blog', blogRoutes);
app.use('/programs', programsRoutes);
app.use('/admin', adminRoutes);

// ============================================================================
// MIDDLEWARE DE ERRORES
// ============================================================================

// Página 404 personalizada
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Página no encontrada',
    // CAMBIAR: Puedes agregar más variables aquí si necesitas pasar datos comunes
  });
});

// Manejo de errores del servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Error del servidor',
    error: err
  });
});

// ============================================================================
// INICIAR SERVIDOR
// ============================================================================

app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`  Servidor corriendo en puerto ${PORT}`);
  console.log(`  Abre tu navegador en: http://localhost:${PORT}`);
  console.log(`========================================\n`);
});

// No exportar nada, este archivo solo inicia el servidor
