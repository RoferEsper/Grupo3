import React from 'react'
import Estudiantes from '../Components/Estudiantes'
import Cursos from '../Components/Cursos'
import Inscripciones from '../Components/Inscripciones'
import '../Css/HomePage.css' // Importa el CSS

const HomePage = () => {
  return (
    <div className="app-container">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="brand">Institución</div>
        <nav className="links">
          <a href="#estudiantes">Estudiantes</a>
          <a href="#cursos">Cursos</a>
          <a href="#inscripciones">Inscripciones</a>
        </nav>
      </header>

      {/* GRID DE COMPONENTES */}
       <section id="cursos" className="card">
          <h2>Cursos</h2>
          <Cursos />
        </section>
        <hr />
      <div className="cards-grid">
        <section id="estudiantes" className="card">
          <h2>Estudiantes</h2>
         <center><Estudiantes /></center>
        </section>

    
        <section id="inscripciones" className="card">
          <h2>Inscripciones</h2>
          <center><Inscripciones /></center>
        </section>
      </div>
    </div>
  )
}

export default HomePage;
