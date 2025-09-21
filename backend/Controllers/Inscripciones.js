const {connection} =require('../Config/dataBase');






const mostrarInscripciones = (req, res) => {
    const sql = `
        SELECT i.id_inscripcion,
               i.fecha_inscripcion,
               e.id_estudiante,
               e.nombre AS nombre_estudiante,
               c.id_curso,
               c.nombre AS nombre_curso
        FROM Inscripciones i
        JOIN Estudiantes e ON i.id_estudiante = e.id_estudiante
        JOIN Cursos c ON i.id_curso = c.id_curso
    `;
    connection.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las inscripciones' });
        }
        // Formatear la fecha a dd-mm-aaaa
        const datos = results.map(row => ({
            ...row,
            fecha_inscripcion: row.fecha_inscripcion
                ? new Date(row.fecha_inscripcion).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
                : null
        }));
        res.json(datos);
    });
}


const mostrarInscripcion = (req, res) => {
    const { id } = req.params;


    connection.query('SELECT * FROM Inscripciones WHERE id_inscripcion = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la inscripcion' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Inscripcion no encontrada' });
        }
        res.json(results[0]);
    });
}


const crearInscripcion = (req, res) => {
    const { id_estudiante, id_curso, fecha_inscripcion } = req.body;

    if (!id_estudiante || !id_curso || !fecha_inscripcion) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: id_estudiante, id_curso y fecha_inscripcion'
        });
    }

    connection.query(
        'INSERT INTO Inscripciones (id_estudiante, id_curso, fecha_inscripcion) VALUES (?, ?, ?)',
        [id_estudiante, id_curso, fecha_inscripcion],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    error: 'Error al crear la inscripcion',
                    detalle: error.message
                });
            }
            res.json({
                message: "Inscripcion creada correctamente",
            });
        }
    );
}



const editarInscripcion = (req, res) => {
    const { id } = req.params;
    const { id_estudiante, id_curso, fecha_inscripcion } = req.body;

    if (!id_estudiante || !id_curso || !fecha_inscripcion) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: id_estudiante, id_curso y fecha_inscripcion'
        });
    }

    connection.query(
        'UPDATE Inscripciones SET id_estudiante = ?, id_curso = ?, fecha_inscripcion = ? WHERE id_inscripcion = ?',
        [id_estudiante, id_curso, fecha_inscripcion, id],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al editar la inscripcion' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Inscripcion no encontrada' });
            }
            res.json({ id, id_estudiante, id_curso, fecha_inscripcion });
        }
    );
}



const eliminarInscripcion = (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM Inscripciones WHERE id_inscripcion = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la inscripcion' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Inscripcion no encontrada' });
        }
        res.status(204).send();
    });
}

module.exports = {
    mostrarInscripciones,
    mostrarInscripcion,
    crearInscripcion,
    editarInscripcion,
    eliminarInscripcion
};