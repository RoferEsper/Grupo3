create table Cursos (
id_curso int auto_increment primary key,
nombre varchar(50),
descripcion varchar (50)
);

create table Estudiantes (
id_estudiante int auto_increment primary key,
nombre varchar (50),
email varchar (50)
);

create table Inscripciones (
id_inscripcion int auto_increment primary key,
id_estudiante int,
foreign key (id_estudiante) references Estudiantes(id_estudiante),
id_curso int,
foreign key (id_curso) references Cursos(id_curso),
fecha_inscripcion date
);
