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



module.exports = {
    mostrarCursos,
    mostrarCurso
};