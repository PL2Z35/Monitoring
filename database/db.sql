CREATE DATABASE monitoring;

use monitoring;

CREATE TABLE Tipo(
    idTipo int(11) PRIMARY KEY,
    Tipo varchar(45)
);

CREATE TABLE Carrera(
    idCarrera int(11) PRIMARY KEY,
    Nombre varchar(45)
);

CREATE TABLE Usuario(
    idUsuario int(11) PRIMARY KEY,
    Nombres varchar(45) ,
    Apellidos varchar(45) ,
    Contrasena varchar(45),
    Tipo_idTipo int(11),
    Carrera_idCarrera int(11),
    CONSTRAINT fk_1 FOREIGN KEY (Tipo_idTipo) REFERENCES Tipo (idTipo),
    CONSTRAINT fk_2 FOREIGN KEY (Carrera_idCarrera) REFERENCES Carrera (idCarrera)
);

CREATE TABLE Materia(
    idMateria int(11) PRIMARY KEY,
    Nombre varchar(45),
    creditos int(2),
    Carrera_idCarrera int(11),
    CONSTRAINT fk_1 FOREIGN KEY (Carrera_idCarrera) REFERENCES Carrera (idCarrera),
);

