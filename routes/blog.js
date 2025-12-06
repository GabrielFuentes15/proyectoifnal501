/**
 * ============================================================================
 * RUTAS DEL BLOG
 * ============================================================================
 * 
 * Aquí se definen las rutas para:
 * - Listado de posts (/blog)
 * - Detalle de un post (/blog/:id)
 * 
 * Los posts se cargan desde data/posts.json
 * ============================================================================
 */

const express = require('express');
const router = express.Router();
const { getPosts } = require('../utils/data');

/**
 * RUTA: GET /blog
 * Listado de todos los posts del blog
 * 
 * CAMBIAR: Puedes ajustar la paginación si es necesario
 * Por ahora muestra todos los posts, pero puedes agregar paginación
 */
router.get('/', async (req, res) => {
  try {
    const posts = await getPosts();
    
    // CAMBIAR: Número de posts por página (si implementas paginación)
    const postsPerPage = 6;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    
    const paginatedPosts = posts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(posts.length / postsPerPage);
    
    // Ordenar posts por fecha (más recientes primero)
    const sortedPosts = paginatedPosts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    
    res.render('blog', {
      title: 'Blog - Academia de Muay Thai',
      posts: sortedPosts,
      currentPage: page,
      totalPages: totalPages,
      hasNextPage: endIndex < posts.length,
      hasPrevPage: page > 1
    });
  } catch (error) {
    console.error('Error en ruta blog:', error);
    res.status(500).send('Error al cargar el blog');
  }
});

/**
 * RUTA: GET /blog/:id
 * Detalle de un post específico
 * 
 * CAMBIAR: Puedes modificar cómo se muestra el contenido en blog-detail.ejs
 */
router.get('/:id', async (req, res) => {
  try {
    const posts = await getPosts();
    const postId = parseInt(req.params.id);
    
    // Buscar el post por ID
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      return res.status(404).render('404', {
        title: 'Post no encontrado'
      });
    }
    
    // Obtener posts relacionados (misma categoría, excluyendo el actual)
    const relatedPosts = posts
      .filter(p => p.id !== postId && p.category === post.category)
      .slice(0, 3);
    
    res.render('blog-detail', {
      title: `${post.title} - Blog`,
      post: post,
      relatedPosts: relatedPosts
    });
  } catch (error) {
    console.error('Error en ruta blog detail:', error);
    res.status(500).send('Error al cargar el post');
  }
});

module.exports = router;
