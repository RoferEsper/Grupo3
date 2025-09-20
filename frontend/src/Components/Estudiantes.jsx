import React, { useEffect, useState } from "react";
import API from "../api";

export default function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nombre, setNombre] = useState("");

  const fetchEstudiantes = async () => {
    const res = await API.get("/estudiantes");
    setEstudiantes(res.data);
  };

  const agregarEstudiante = async () => {
    if (!nombre.trim()) return;
    await API.post("/estudiantes", { nombre });
    setNombre("");
    fetchEstudiantes();
  };

  const eliminarEstudiante = async (id) => {
    await API.delete(`/estudiantes/${id}`);
    fetchEstudiantes();
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  return (
    <div>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del estudiante"
      />
      <button onClick={agregarEstudiante}>Agregar</button>

      <ul>
        {estudiantes.map((est) => (
          <li key={est.id}>
            {est.nombre}
            <button onClick={() => eliminarEstudiante(est.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
