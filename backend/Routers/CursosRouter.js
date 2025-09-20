const express = require('express');
const router = express.Router();


const { mostrarCursos,
    mostrarCurso} = require('../Controllers/Cursos');


router.get("/cursos", mostrarCursos);
router.get("/curso/:id", mostrarCurso);

module.exports = router;