import React, { useEffect, useState } from "react";
import API from "../api";

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [nombre, setNombre] = useState("");

  const fetchCursos = async () => {
    const res = await API.get("/cursos");
    setCursos(res.data);
  };

  const agregarCurso = async () => {
    if (!nombre.trim()) return;
    await API.post("/cursos", { nombre });
    setNombre("");
    fetchCursos();
  };

  const eliminarCurso = async (id) => {
    await API.delete(`/cursos/${id}`);
    fetchCursos();
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <div>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del curso"
      />
      <button onClick={agregarCurso}>Agregar</button>

      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>
            {curso.nombre}
            <button onClick={() => eliminarCurso(curso.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
