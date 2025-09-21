const {connection} =require('../Config/dataBase');

const mostrarCursos = (req, res) => {
    connection.query('SELECT * FROM Cursos', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener los cursos' });
        }
        res.json(results);
    });
}


const mostrarCurso = (req, res) => {
    const { id } = req.params;


    connection.query('SELECT * FROM Cursos WHERE id_curso = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el curso' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        res.json(results[0]);

    });
}

// Crear curso
const crearCurso = (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
        return res.status(400).json({ error: 'Faltan datos requeridos: nombre y descripcion' });
    }
    connection.query(
        'INSERT INTO Cursos (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al crear el curso', detalle: error.message });
            }
            res.json({
                message: 'Curso creado correctamente',
                id_curso: results.insertId,
                nombre,
                descripcion
            });
        }
    );
}

// Editar curso
const editarCurso = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    connection.query(
        'UPDATE Cursos SET nombre = ?, descripcion = ? WHERE id_curso = ?',
        [nombre, descripcion, id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al editar el curso' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Curso no encontrado' });
            }
            res.json({ id, nombre, descripcion });
        }
    );
}

// Eliminar curso
const eliminarCurso = (req, res) => {
    const { id } = req.params;
    connection.query(
        'DELETE FROM Cursos WHERE id_curso = ?',
        [id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al eliminar el curso' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Curso no encontrado' });
            }
            res.status(204).send();
        }
    );
}



module.exports = {
    mostrarCursos,
    mostrarCurso,
    crearCurso,
    editarCurso,
    eliminarCurso
};