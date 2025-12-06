/**
 * ============================================================================
 * RUTAS DE PROGRAMAS/CURSOS
 * ============================================================================
 * 
 * Aquí se definen las rutas para:
 * - Listado de programas (/programs)
 * - Detalle de un programa (/programs/:id)
 * 
 * Los programas se cargan desde data/programs.json
 * ============================================================================
 */

const express = require('express');
const router = express.Router();
const { getPrograms } = require('../utils/data');

/**
 * RUTA: GET /programs
 * Listado de todos los programas/cursos
 * 
 * CAMBIAR: Puedes agregar filtros por nivel, precio, etc.
 */
router.get('/', async (req, res) => {
  try {
    const programs = await getPrograms();
    
    // CAMBIAR: Opcionalmente puedes filtrar por nivel
    const level = req.query.level; // ej: ?level=principiante
    let filteredPrograms = programs;
    
    if (level) {
      filteredPrograms = programs.filter(p => 
        p.level.toLowerCase() === level.toLowerCase()
      );
    }
    
    res.render('programs', {
      title: 'Programas - Academia de Muay Thai',
      programs: filteredPrograms,
      currentLevel: level || 'all'
    });
  } catch (error) {
    console.error('Error en ruta programs:', error);
    res.status(500).send('Error al cargar los programas');
  }
});

/**
 * RUTA: GET /programs/:id
 * Detalle de un programa específico
 * 
 * CAMBIAR: Puedes modificar cómo se muestra el contenido en program-detail.ejs
 */
router.get('/:id', async (req, res) => {
  try {
    const programs = await getPrograms();
    const programId = parseInt(req.params.id);
    
    // Buscar el programa por ID
    const program = programs.find(p => p.id === programId);
    
    if (!program) {
      return res.status(404).render('404', {
        title: 'Programa no encontrado'
      });
    }
    
    // Obtener programas relacionados (mismo nivel, excluyendo el actual)
    const relatedPrograms = programs
      .filter(p => p.id !== programId && p.level === program.level)
      .slice(0, 3);
    
    res.render('program-detail', {
      title: `${program.name} - Programas`,
      program: program,
      relatedPrograms: relatedPrograms
    });
  } catch (error) {
    console.error('Error en ruta program detail:', error);
    res.status(500).send('Error al cargar el programa');
  }
});

module.exports = router;
