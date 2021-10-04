const express = require('express');
const router = express.Router();
const pool = require('../database/database');

router.get('/admin', async(req, res) =>{
    const carreras = await pool.query('select * from carrera');
    const tipos = await pool.query('select * from tipo');
    const usuarios = await pool.query('select idUsuario,Nombres,Apellidos,(select Tipo from tipo where usuario.Tipo_idTipo=tipo.idTipo) as Tipo,(select Nombre from carrera where usuario.Carrera_idCarrera=carrera.idCarrera) as Carrera from usuario');
    console.log(usuarios);
    res.render('links/admin', {carreras,tipos,usuarios});
})

router.post('/addCarrera', async(req,res) => {
    const{Nombre}=req.body;
    const newObject = {Nombre};
    await pool.query('insert into carrera set ?', [newObject]);
    res.send('resivido');
})

router.post('/addUsuario', async(req,res) => {
    const{idUsuario,Nombres,Apellidos,Tipo_idTipo,Carrera_idCarrera}=req.body;
    const newObject = {idUsuario,Nombres,Apellidos,Tipo_idTipo,Carrera_idCarrera};
    await pool.query('insert into usuario set ?', [newObject]);
    res.send('resivido');
})
module.exports = router;
