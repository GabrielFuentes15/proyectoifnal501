/**
 * ============================================================================
 * RUTAS DEL PANEL ADMINISTRATIVO
 * ============================================================================
 * 
 * NOTA: Este es un panel admin simple SIN autenticación avanzada
 * Para producción, deberías agregar autenticación real
 * 
 * Rutas disponibles:
 * - GET /admin - Dashboard principal
 * - GET /admin/posts - Listado de posts para administrar
 * - GET /admin/posts/new - Formulario crear nuevo post
 * - POST /admin/posts - Crear nuevo post
 * - GET /admin/posts/:id/edit - Formulario editar post
 * - PUT /admin/posts/:id - Actualizar post
 * - DELETE /admin/posts/:id - Eliminar post
 * - GET /admin/programs - Listado de programas para administrar
 * - GET /admin/programs/new - Formulario crear nuevo programa
 * - POST /admin/programs - Crear nuevo programa
 * - GET /admin/programs/:id/edit - Formulario editar programa
 * - PUT /admin/programs/:id - Actualizar programa
 * - DELETE /admin/programs/:id - Eliminar programa
 * ============================================================================
 */

const express = require('express');
const router = express.Router();
const { getPosts, savePosts, getPrograms, savePrograms } = require('../utils/data');

// ============================================================================
// MIDDLEWARE SIMPLE DE AUTENTICACIÓN (BÁSICO)
// ============================================================================
// CAMBIAR: En producción, usa una autenticación real (JWT, sesiones, etc.)
// Por ahora, puedes proteger con una clave simple o dejarlo abierto para desarrollo

// const ADMIN_KEY = 'tu-clave-secreta-aqui';
// const requireAuth = (req, res, next) => {
//   if (req.query.key !== ADMIN_KEY) {
//     return res.status(401).send('Acceso no autorizado');
//   }
//   next();
// };
// router.use(requireAuth);

// ============================================================================
// DASHBOARD PRINCIPAL
// ============================================================================

router.get('/', async (req, res) => {
  try {
    const posts = await getPosts();
    const programs = await getPrograms();
    
    res.render('admin/dashboard', {
      title: 'Panel Administrativo',
      postsCount: posts.length,
      programsCount: programs.length
    });
  } catch (error) {
    console.error('Error en admin dashboard:', error);
    res.status(500).send('Error al cargar el panel');
  }
});

// ============================================================================
// RUTAS DE POSTS (CRUD)
// ============================================================================

// Listado de posts para administrar
router.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.render('admin/posts', {
      title: 'Administrar Posts',
      posts: posts,
      success: req.query.success
    });
  } catch (error) {
    console.error('Error en admin posts:', error);
    res.status(500).send('Error al cargar posts');
  }
});

// Formulario crear nuevo post
router.get('/posts/new', (req, res) => {
  res.render('admin/post-form', {
    title: 'Nuevo Post',
    post: null,
    action: '/admin/posts',
    method: 'POST'
  });
});

// Crear nuevo post
router.post('/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    const newPost = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      title: req.body.title,
      date: req.body.date || new Date().toISOString().split('T')[0],
      category: req.body.category,
      tags: req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : [],
      excerpt: req.body.excerpt,
      content: req.body.content,
      image: req.body.image || '/img/default-post.jpg' // CAMBIAR: Imagen por defecto
    };
    
    posts.push(newPost);
    await savePosts(posts);
    
    res.redirect('/admin/posts?success=created');
  } catch (error) {
    console.error('Error creando post:', error);
    res.status(500).send('Error al crear el post');
  }
});

// Formulario editar post
router.get('/posts/:id/edit', async (req, res) => {
  try {
    const posts = await getPosts();
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return res.status(404).send('Post no encontrado');
    }
    
    res.render('admin/post-form', {
      title: 'Editar Post',
      post: post,
      action: `/admin/posts/${postId}`,
      method: 'PUT'
    });
  } catch (error) {
    console.error('Error en edit post:', error);
    res.status(500).send('Error al cargar el post');
  }
});

// Actualizar post (usando POST con método override)
router.post('/posts/:id', async (req, res) => {
  try {
    const posts = await getPosts();
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      return res.status(404).send('Post no encontrado');
    }
    
    // Si viene un campo _method=PUT, es una actualización
    if (req.body._method === 'PUT') {
      posts[postIndex] = {
        ...posts[postIndex],
        title: req.body.title,
        date: req.body.date,
        category: req.body.category,
        tags: req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : [],
        excerpt: req.body.excerpt,
        content: req.body.content,
        image: req.body.image
      };
      
      await savePosts(posts);
      return res.redirect('/admin/posts?success=updated');
    }
    
    res.redirect('/admin/posts');
  } catch (error) {
    console.error('Error actualizando post:', error);
    res.status(500).send('Error al actualizar el post');
  }
});

// Eliminar post
router.post('/posts/:id/delete', async (req, res) => {
  try {
    const posts = await getPosts();
    const postId = parseInt(req.params.id);
    const filteredPosts = posts.filter(p => p.id !== postId);
    
    await savePosts(filteredPosts);
    res.redirect('/admin/posts?success=deleted');
  } catch (error) {
    console.error('Error eliminando post:', error);
    res.status(500).send('Error al eliminar el post');
  }
});

// ============================================================================
// RUTAS DE PROGRAMAS (CRUD)
// ============================================================================

// Listado de programas para administrar
router.get('/programs', async (req, res) => {
  try {
    const programs = await getPrograms();
    res.render('admin/programs', {
      title: 'Administrar Programas',
      programs: programs,
      success: req.query.success
    });
  } catch (error) {
    console.error('Error en admin programs:', error);
    res.status(500).send('Error al cargar programas');
  }
});

// Formulario crear nuevo programa
router.get('/programs/new', (req, res) => {
  res.render('admin/program-form', {
    title: 'Nuevo Programa',
    program: null,
    action: '/admin/programs',
    method: 'POST'
  });
});

// Crear nuevo programa
router.post('/programs', async (req, res) => {
  try {
    const programs = await getPrograms();
    const newProgram = {
      id: programs.length > 0 ? Math.max(...programs.map(p => p.id)) + 1 : 1,
      name: req.body.name,
      level: req.body.level,
      duration: req.body.duration,
      description: req.body.description,
      fullDescription: req.body.fullDescription || req.body.description,
      price: req.body.price || 'Gratuito',
      image: req.body.image || '/img/default-program.jpg', // CAMBIAR: Imagen por defecto
      featured: req.body.featured === 'on'
    };
    
    programs.push(newProgram);
    await savePrograms(programs);
    
    res.redirect('/admin/programs?success=created');
  } catch (error) {
    console.error('Error creando programa:', error);
    res.status(500).send('Error al crear el programa');
  }
});

// Formulario editar programa
router.get('/programs/:id/edit', async (req, res) => {
  try {
    const programs = await getPrograms();
    const programId = parseInt(req.params.id);
    const program = programs.find(p => p.id === programId);
    
    if (!program) {
      return res.status(404).send('Programa no encontrado');
    }
    
    res.render('admin/program-form', {
      title: 'Editar Programa',
      program: program,
      action: `/admin/programs/${programId}`,
      method: 'PUT'
    });
  } catch (error) {
    console.error('Error en edit program:', error);
    res.status(500).send('Error al cargar el programa');
  }
});

// Actualizar programa
router.post('/programs/:id', async (req, res) => {
  try {
    const programs = await getPrograms();
    const programId = parseInt(req.params.id);
    const programIndex = programs.findIndex(p => p.id === programId);
    
    if (programIndex === -1) {
      return res.status(404).send('Programa no encontrado');
    }
    
    if (req.body._method === 'PUT') {
      programs[programIndex] = {
        ...programs[programIndex],
        name: req.body.name,
        level: req.body.level,
        duration: req.body.duration,
        description: req.body.description,
        fullDescription: req.body.fullDescription || req.body.description,
        price: req.body.price,
        image: req.body.image,
        featured: req.body.featured === 'on'
      };
      
      await savePrograms(programs);
      return res.redirect('/admin/programs?success=updated');
    }
    
    res.redirect('/admin/programs');
  } catch (error) {
    console.error('Error actualizando programa:', error);
    res.status(500).send('Error al actualizar el programa');
  }
});

// Eliminar programa
router.post('/programs/:id/delete', async (req, res) => {
  try {
    const programs = await getPrograms();
    const programId = parseInt(req.params.id);
    const filteredPrograms = programs.filter(p => p.id !== programId);
    
    await savePrograms(filteredPrograms);
    res.redirect('/admin/programs?success=deleted');
  } catch (error) {
    console.error('Error eliminando programa:', error);
    res.status(500).send('Error al eliminar el programa');
  }
});

module.exports = router;
