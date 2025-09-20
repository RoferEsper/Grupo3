import React, { useEffect, useState } from "react";
import API from "../api";

export default function Inscripciones() {
  const [inscripciones, setInscripciones] = useState([]);
  const [cursoId, setCursoId] = useState("");
  const [estudianteId, setEstudianteId] = useState("");

  const fetchInscripciones = async () => {
    const res = await API.get("/inscripciones");
    setInscripciones(res.data);
  };

  const agregarInscripcion = async () => {
    if (!cursoId || !estudianteId) return;
    await API.post("/inscripciones", { cursoId, estudianteId });
    setCursoId("");
    setEstudianteId("");
    fetchInscripciones();
  };

  const eliminarInscripcion = async (id) => {
    await API.delete(`/inscripciones/${id}`);
    fetchInscripciones();
  };

  useEffect(() => {
    fetchInscripciones();
  }, []);

  return (
    <div>
      <input
        value={cursoId}
        onChange={(e) => setCursoId(e.target.value)}
        placeholder="ID Curso"
      />
      <input
        value={estudianteId}
        onChange={(e) => setEstudianteId(e.target.value)}
        placeholder="ID Estudiante"
      />
      <button onClick={agregarInscripcion}>Inscribir</button>

      <ul>
        {inscripciones.map((ins) => (
          <li key={ins.id}>
            Curso {ins.cursoId} - Estudiante {ins.estudianteId}
            <button onClick={() => eliminarInscripcion(ins.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
