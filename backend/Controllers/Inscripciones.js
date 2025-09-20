const {connection} =require('../Config/dataBase');






const mostrarInscripciones = (req, res) => {
    connection.query('SELECT * FROM Inscripciones', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las inscripciones' });
        }
        res.json(results);
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
    const { id_estudiante, id_curso } = req.body;

    if (!id_estudiante || !id_curso) {
        return res.status(400).json({
            error: 'Faltan datos requeridos: id_estudiante y id_curso'
        });
    }

    
    connection.query(
        'INSERT INTO Inscripciones (id_estudiante, id_curso) VALUES (?, ?)',
        [id_estudiante, id_curso],
        (error, results) => {
            if (error) {
                return res.status(500).json({
                    error: 'Error al crear la inscripcion',
                    detalle: error.message // muestra el error real
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
    const { id_estudiante, id_curso } = req.body;

    connection.query('UPDATE Inscripciones SET id_estudiante = ?, id_curso = ? WHERE id_inscripcion = ?', [id_estudiante, id_curso, id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al editar la inscripcion' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Inscripcion no encontrada' });
        }
        res.json({ id, id_estudiante, id_curso });
    });
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