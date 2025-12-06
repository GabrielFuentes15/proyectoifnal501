/**
 * ============================================================================
 * RUTAS PRINCIPALES DEL SITIO
 * ============================================================================
 * 
 * Aquí se definen las rutas para:
 * - Home / Inicio (/)
 * - Start Here / Empieza Aquí (/start-here)
 * - About / Acerca de (/about)
 * - Contact / Contacto (/contact)
 * ============================================================================
 */

const express = require('express');
const router = express.Router();
const { getPrograms, getPosts } = require('../utils/data');

/**
 * RUTA: GET /
 * Página principal (Home)
 * 
 * CAMBIAR: Puedes modificar qué datos se pasan a la vista
 * - Los programas destacados vienen de data/programs.json
 * - Los posts recientes vienen de data/posts.json
 */
router.get('/', async (req, res) => {
  try {
    const programs = await getPrograms();
    const posts = await getPosts();
    
    // Obtener solo programas destacados (los primeros 3)
    const featuredPrograms = programs.slice(0, 3);
    
    // Obtener posts recientes (los últimos 3)
    const recentPosts = posts.slice(-3).reverse();
    
    res.render('home', {
      title: 'Inicio - Academia de Muay Thai',
      // CAMBIAR: Título de la página (aparece en la pestaña del navegador)
      featuredPrograms: featuredPrograms,
      recentPosts: recentPosts
    });
  } catch (error) {
    console.error('Error en ruta home:', error);
    res.status(500).send('Error al cargar la página principal');
  }
});

/**
 * RUTA: GET /start-here
 * Página "Empieza Aquí" - Orientación según nivel
 * 
 * CAMBIAR: Puedes modificar el contenido de los niveles
 * directamente en la vista start-here.ejs
 */
router.get('/start-here', (req, res) => {
  res.render('start-here', {
    title: 'Empieza Aquí - Academia de Muay Thai'
  });
});

/**
 * RUTA: GET /about
 * Página "Acerca de" - Información del entrenador/creador
 * 
 * CAMBIAR: Puedes modificar el contenido directamente en la vista about.ejs
 * - Foto del entrenador
 * - Historia
 * - Misión, visión, valores
 */
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'Acerca de - Academia de Muay Thai'
  });
});

/**
 * RUTA: GET /contact
 * Página de contacto - Muestra el formulario
 * 
 * CAMBIAR: La estructura del formulario está en views/contact.ejs
 */
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contacto - Academia de Muay Thai',
    success: req.query.success === 'true'
  });
});

/**
 * RUTA: POST /contact
 * Procesa el formulario de contacto
 * 
 * NOTA: Esta es una versión simulada, no envía correos reales
 * CAMBIAR: Si quieres integrar un servicio de envío de correos (como Nodemailer),
 * puedes agregarlo aquí
 */
router.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Simulación: aquí podrías guardar en BD o enviar correo
  console.log('Mensaje de contacto recibido:');
  console.log('Nombre:', name);
  console.log('Email:', email);
  console.log('Asunto:', subject);
  console.log('Mensaje:', message);
  
  // Redirigir con mensaje de éxito
  res.redirect('/contact?success=true');
});

module.exports = router;
