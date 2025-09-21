const express = require('express');
const router = express.Router();


const { mostrarCursos,
    mostrarCurso,
    crearCurso,
    editarCurso,
    eliminarCurso } = require('../Controllers/Cursos');



router.get("/cursos", mostrarCursos);
router.get("/cursos/:id", mostrarCurso);
router.post("/cursos", crearCurso);
router.put("/cursos/:id", editarCurso);
router.delete("/cursos/:id", eliminarCurso);

module.exports = router;