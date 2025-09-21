export const ENDPOINTS = 'http://localhost:8000';
// Endpoints CRUD estudiantes
export const URL_ESTUDIANTES_LIST = '/estudiantes'; // GET
export const URL_ESTUDIANTE = '/estudiante'; // POST
export const URL_ESTUDIANTE_ID = (id) => `/estudiante/${id}`; // GET, PUT, DELETE
// Endpoint solo lectura cursos
export const URL_CURSOS_LIST = '/cursos'; // GET
export const URL_INSCRIPCIONES_LIST = '/inscripciones'; // GET
export const URL_INSCRIPCIONES = '/inscripcion'; // POST
export const URL_INSCRIPCIONES_ID = (id) => `/inscripcion/${id}`; // GET, PUT, DELETE