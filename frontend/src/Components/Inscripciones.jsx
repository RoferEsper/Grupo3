import axios from 'axios';
import { useEffect, useState } from 'react';
import { ENDPOINTS, URL_INSCRIPCIONES_LIST, URL_INSCRIPCIONES, URL_INSCRIPCIONES_ID } from '../Endpoints/endpoint';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Inscripciones = () => {
  const [datos, setData] = useState([]);
  const [form, setForm] = useState({ id_inscripcion: '', id_curso: '', id_estudiante: '', fecha_inscripcion: '' });
  const [editId, setEditId] = useState(null);

  const getInscripciones = async () => {
    try {
      const response = await axios.get(ENDPOINTS + URL_INSCRIPCIONES_LIST);
  setData(response.data);
    } catch (error) {
      console.log("Error al obtener la inscripcion", error);
    }
  };

  useEffect(() => {
    getInscripciones();
  }, []);

  // Crear o actualizar inscripcion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(ENDPOINTS + URL_INSCRIPCIONES_ID(editId), {
            id_curso: form.id_curso,
            id_estudiante: form.id_estudiante,
            fecha_inscripcion: form.fecha_inscripcion
        });
      } else {
        await axios.post(ENDPOINTS + URL_INSCRIPCIONES, {
            id_curso: form.id_curso,
            id_estudiante: form.id_estudiante,
            fecha_inscripcion: form.fecha_inscripcion
        });
      }
      setForm({ id_curso: '', id_estudiante: '', fecha_inscripcion: ''});
      setEditId(null);
      getInscripciones();
    } catch (error) {
      console.log("Error al guardar inscripcion", error);
    }
  };

  // Eliminar inscripcion
  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta inscripcion?')) {
      try {
  await axios.delete(ENDPOINTS + URL_INSCRIPCIONES_ID(id));
        getInscripciones();
      } catch (error) {
        console.log("Error al eliminar inscripcion", error);
      }
    }
  };

  // Editar inscripcion
  const handleEdit = (inscripcion) => {
  setForm({  id_curso: inscripcion.id_curso, id_estudiante: inscripcion.id_estudiante, fecha_inscripcion: inscripcion.fecha_inscripcion });
    setEditId(inscripcion.id_inscripcion);
  };

  return (
    <div>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>id_inscripcion</th>
            <th>Curso</th>
            <th>Estudiante</th>
            <th>Fecha de inscripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((inscripcion) => (
            <tr key={inscripcion.id_inscripcion}>
              <td>{inscripcion.id_inscripcion}</td>
              <td>{inscripcion.nombre_curso}</td>
              <td>{inscripcion.nombre_estudiante}</td>
              <td>{inscripcion.fecha_inscripcion}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(inscripcion)}
                  style={{ marginRight: 5 }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(inscripcion.id_inscripcion)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr />

      <h3>{editId ? 'Editar Inscripcion' : 'Agregar Inscripcion'}</h3>
      <Form onSubmit={handleSubmit} style={{ maxWidth: 400, marginBottom: 20 }}>
        <Form.Group>
          <Form.Label>id_curso</Form.Label>
          <Form.Control
            type="text"
            value={form.id_curso}
            onChange={e => setForm({ ...form, id_curso: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>id_estudiante</Form.Label>
          <Form.Control
            type="text"
            value={form.id_estudiante}
            onChange={e => setForm({ ...form, id_estudiante: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>fecha_inscripcion</Form.Label>
          <Form.Control
            type="date"
            value={form.fecha_inscripcion}
            onChange={e => setForm({ ...form, fecha_inscripcion: e.target.value })}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: 10 }}>
          {editId ? 'Actualizar' : 'Agregar'}
        </Button>
        {editId && (
          <Button
            variant="secondary"
            style={{ marginLeft: 10, marginTop: 10 }}
            onClick={() => {
              setEditId(null);
              setForm({ id_curso: '', id_estudiante: '', fecha_inscripcion: ''});
            }}
          >
            Cancelar
          </Button>
        )}
      </Form>

      
    </div>
  );
};

export default Inscripciones;