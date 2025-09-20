const express = require('express');
const router = express.Router();


const { mostrarEstudiantes,
    mostrarEstudiante,
    crearEstudiante,
    editarEstudiante,
    eliminarEstudiante} = require('../Controllers/Estudiantes');


router.get("/estudiantes", mostrarEstudiantes);
router.get("/estudiante/:id", mostrarEstudiante);
router.post("/estudiante", crearEstudiante);
router.put("/estudiante/:id", editarEstudiante);
router.delete("/estudiante/:id", eliminarEstudiante);

module.exports = router;