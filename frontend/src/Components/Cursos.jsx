import axios from 'axios';
import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../Endpoints/endpoint';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Cursos = () => {
  const [datos, setData] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [editId, setEditId] = useState(null);

  const getCursos = async () => {
    try {
  const response = await axios.get(ENDPOINTS + '/cursos');
      setData(response.data);
    } catch (error) {
      console.log('Error al obtener los cursos', error);
    }
  };

  useEffect(() => {
    getCursos();
  }, []);

  // Crear o actualizar curso
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${ENDPOINTS}/cursos/${editId}`, {
          nombre: form.nombre,
          descripcion: form.descripcion
        });
      } else {
        await axios.post(`${ENDPOINTS}/cursos`, {
          nombre: form.nombre,
          descripcion: form.descripcion
        });
      }
      setForm({ nombre: '', descripcion: '' });
      setEditId(null);
      getCursos();
    } catch (error) {
      console.log('Error al guardar el curso', error);
    }
  };

  // Eliminar curso
  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este curso?')) {
      try {
  await axios.delete(`${ENDPOINTS}/cursos/${id}`);
        getCursos();
      } catch (error) {
        console.log('Error al eliminar el curso', error);
      }
    }
  };

  // Editar curso
  const handleEdit = (curso) => {
    setForm({ nombre: curso.nombre, descripcion: curso.descripcion });
    setEditId(curso.id_curso);
  };

  return (
    <div>
      <h3>{editId ? 'Editar Curso' : 'Agregar Curso'}</h3>
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
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            value={form.descripcion}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
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
              setForm({ nombre: '', descripcion: '' });
            }}
          >
            Cancelar
          </Button>
        )}
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((curso) => (
            <tr key={curso.id_curso}>
              <td>{curso.id_curso}</td>
              <td>{curso.nombre}</td>
              <td>{curso.descripcion}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(curso)}
                  style={{ marginRight: 5 }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(curso.id_curso)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cursos;
