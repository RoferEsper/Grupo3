import axios from 'axios';
import { useEffect, useState } from 'react';
import { ENDPOINTS, URL_ESTUDIANTES } from '../Endpoints/endpoint';
import Table from 'react-bootstrap/Table';


const Home = () => {

const [datos, setData] = useState([])

const getEstudiantes = async() => {

try {
    const response = await axios.get(ENDPOINTS + URL_ESTUDIANTES);
    console.log(response.data);
    setData(response.data)
    
if (response.status === 200){
    console.log("Estudiantes obtenidos")
}
} catch (error) {
    console.log("Error al obtener los estudiantes", error)
}
}

useEffect(() => {
    getEstudiantes()
}, [])

  return (

    <div>
       <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((estudiantes) => (
            <tr key={estudiantes.id_estudiante}>
                <td>{estudiantes.id_estudiante}</td>
                <td>{estudiantes.nombre}</td>
                <td>{estudiantes.email}</td>
            </tr>

        ))}
      </tbody>
    </Table>
    </div>
  )
}

export default Home