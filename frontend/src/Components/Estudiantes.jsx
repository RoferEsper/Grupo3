import axios from 'axios';
import { useEffect, useState } from 'react';
import { ENDPOINTS, URL_ESTUDIANTES_LIST, URL_ESTUDIANTE, URL_ESTUDIANTE_ID } from '../Endpoints/endpoint';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Estudiantes = () => {
  const [datos, setData] = useState([]);
  const [form, setForm] = useState({ nombre: '', email: '' });
  const [editId, setEditId] = useState(null);

  const getEstudiantes = async () => {
    try {
  const response = await axios.get(ENDPOINTS + URL_ESTUDIANTES_LIST);
  setData(response.data);
    } catch (error) {
      console.log("Error al obtener los estudiantes", error);
    }
  };

  useEffect(() => {
    getEstudiantes();
  }, []);

  // Crear o actualizar estudiante
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(ENDPOINTS + URL_ESTUDIANTE_ID(editId), {
          nombre: form.nombre,
          email: form.email
        });
      } else {
        await axios.post(ENDPOINTS + URL_ESTUDIANTE, {
          nombre: form.nombre,
          email: form.email
        });
      }
      setForm({ nombre: '', email: '' });
      setEditId(null);
      getEstudiantes();
    } catch (error) {
      console.log("Error al guardar el estudiante", error);
    }
  };

  // Eliminar estudiante
  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este estudiante?')) {
      try {
  await axios.delete(ENDPOINTS + URL_ESTUDIANTE_ID(id));
        getEstudiantes();
      } catch (error) {
        console.log("Error al eliminar el estudiante", error);
      }
    }
  };

  // Editar estudiante
  const handleEdit = (estudiante) => {
  setForm({ nombre: estudiante.nombre, email: estudiante.email });
    setEditId(estudiante.id_estudiante);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((estudiante) => (
            <tr key={estudiante.id_estudiante}>
              <td>{estudiante.id_estudiante}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.email}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(estudiante)}
                  style={{ marginRight: 5 }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(estudiante.id_estudiante)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

          <hr />
          
      <h3>{editId ? 'Editar Estudiante' : 'Agregar Estudiante'}</h3>
      <Form onSubmit={handleSubmit} style={{ maxWidth: 400, marginBottom: 20 }}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
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
              setForm({ nombre: '', email: '' });
            }}
          >
            Cancelar
          </Button>
        )}
      </Form>

      
    </div>
  );
};

export default Estudiantes;