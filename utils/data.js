/**
 * ============================================================================
 * UTILIDADES DE DATOS - FUNCIONES PARA MANEJAR JSON
 * ============================================================================
 * 
 * Este archivo contiene funciones auxiliares para leer y escribir
 * datos desde archivos JSON.
 * 
 * CAMBIAR: Los archivos de datos están en data/posts.json y data/programs.json
 * ============================================================================
 */

const fs = require('fs').promises;
const path = require('path');

/**
 * Lee datos de posts desde el archivo JSON
 * Puedes modificar los posts directamente en data/posts.json
 */
async function getPosts() {
  try {
    const data = await fs.readFile(path.join(__dirname, '..', 'data', 'posts.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo posts.json:', error);
    return [];
  }
}

/**
 * Guarda posts en el archivo JSON
 */
async function savePosts(posts) {
  try {
    await fs.writeFile(
      path.join(__dirname, '..', 'data', 'posts.json'),
      JSON.stringify(posts, null, 2),
      'utf8'
    );
    return true;
  } catch (error) {
    console.error('Error guardando posts.json:', error);
    return false;
  }
}

/**
 * Lee datos de programas desde el archivo JSON
 * Puedes modificar los programas directamente en data/programs.json
 */
async function getPrograms() {
  try {
    const data = await fs.readFile(path.join(__dirname, '..', 'data', 'programs.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo programs.json:', error);
    return [];
  }
}

/**
 * Guarda programas en el archivo JSON
 */
async function savePrograms(programs) {
  try {
    await fs.writeFile(
      path.join(__dirname, '..', 'data', 'programs.json'),
      JSON.stringify(programs, null, 2),
      'utf8'
    );
    return true;
  } catch (error) {
    console.error('Error guardando programs.json:', error);
    return false;
  }
}

module.exports = {
  getPosts,
  savePosts,
  getPrograms,
  savePrograms
};
