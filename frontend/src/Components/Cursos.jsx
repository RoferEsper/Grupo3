import axios from 'axios';
import { useEffect, useState } from 'react';
import { ENDPOINTS, URL_CURSOS_LIST } from '../Endpoints/endpoint';
import Table from 'react-bootstrap/Table';

const Cursos = () => {
  const [datos, setData] = useState([]);

  const getCursos = async () => {
    try {
      const response = await axios.get(ENDPOINTS + URL_CURSOS_LIST);
      setData(response.data);
    } catch (error) {
      console.log('Error al obtener los cursos', error);
    }
  };

  useEffect(() => {
    getCursos();
  }, []);

  return (
    <div>
      <h3>Listado de Cursos</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((curso) => (
            <tr key={curso.id_curso}>
              <td>{curso.id_curso}</td>
              <td>{curso.nombre}</td>
              <td>{curso.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Cursos;
