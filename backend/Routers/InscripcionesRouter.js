const express = require('express');
const router = express.Router();


const { mostrarInscripciones,
    mostrarInscripcion,
    crearInscripcion,
    editarInscripcion,
    eliminarInscripcion} = require('../Controllers/Inscripciones');


router.get("/inscripciones", mostrarInscripciones);
router.get("/inscripcion/:id", mostrarInscripcion);
router.post("/inscripcion", crearInscripcion);
router.put("/inscripcion/:id", editarInscripcion);
router.delete("/inscripcion/:id", eliminarInscripcion);
module.exports = router;