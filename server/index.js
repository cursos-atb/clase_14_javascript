// api
/*
    campus virtual CRUD
    administrador -> lista de:
                        profesores -> id, nombre
                        estudiantes -> id, nombre
                        materias -> id, nombre, profesores[], estudiantes[]
*/

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let profesores = [
    {id: 1, nombre: "Juan Perez"},
    {id: 2, nombre: "Eric Gomez"}
];

let estudiantes = [
    {id: 1, nombre: "Jose"},
    {id: 2, nombre: "Diego"}
];

let materias = [
    {id: 1, nombre: "Javascrip de cero a experto", profesores: [2], estudiantes: [1,2]} 
];

// obtener listas

app.get("/profesores",(req, res) => res.json(profesores));
app.get("/estudiantes",(req, res) => res.json(estudiantes));
app.get("/materias",(req, res) => {
    res.json(materias.map(m => ({
        ...m,
        profesores: m.profesores.map(id => profesores.find(p => p.id === id)?.nombre),
        estudiantes: m.estudiantes.length
    })));
    
});
app.get("/materiasEstudiantes",(req, res) => {
    const resultado = materias.map(m => ({
        nombre: m.nombre,
        estudiantes: m.estudiantes.length
    }));
    
    res.json(resultado);
    
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));