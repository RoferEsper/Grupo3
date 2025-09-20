const express = require ("express")
const mysql = require ("mysql2")
const estudiantes = require ("./Router/EstudiantesRouter")
const cursos = require ("./Router/CursosRouter")
const inscripciones = require ("./Router/InscripcionesRouter")
const cors = require ("cors")

const app = express()

//Habilita CORS
app.use(cors())

app.use(express.json())

app.use("/",estudiantes)
app.use("/",cursos)
app.use("/",inscripciones)

app.get("/", (req,res) => {
    res.send("API de estudiantes")
})

app.listen(8000, () => {
    console.log("Servidor corriendo en el puerto 8000")
})