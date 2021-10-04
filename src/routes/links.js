const express = require('express');
const router = express.Router();
const pool = require('../database/database');

router.get('/admin', async(req, res) =>{
    const carreras = await pool.query('select * from carrera');
    const tipos = await pool.query('select * from tipo');
    const usuarios = await pool.query('select idUsuario,Nombres,Apellidos,Carrera_idCarrera,Tipo_idTipo,(select Tipo from tipo where usuario.Tipo_idTipo=tipo.idTipo) as Tipo,(select Nombre from carrera where usuario.Carrera_idCarrera=carrera.idCarrera) as Carrera from usuario');
    res.render('links/admin', {carreras,tipos,usuarios});
})

router.post('/addCarrera', async(req,res) => {
    const{Nombre}=req.body;
    const newObject = {Nombre};
    await pool.query('insert into carrera set ?', [newObject]);
    res.redirect('/links/admin');
})

router.post('/addUsuario', async(req,res) => {
    const{idUsuario,Nombres,Apellidos,Tipo_idTipo,Carrera_idCarrera}=req.body;
    const newObject = {idUsuario,Nombres,Apellidos,Tipo_idTipo,Carrera_idCarrera};
    await pool.query('insert into usuario set ?', [newObject]);
    res.redirect('/links/admin');
})

router.get('/deleteUsuario/:idUsuario', async(req,res) => {
    const {idUsuario} = req.params;
    await pool.query('delete from usuario where idUsuario = ?',[idUsuario]);
    res.redirect('/links/admin');
})

router.get('/deleteCarrera/:idCarrera', async(req,res) => {
    const {idCarrera} = req.params;
    console.log(idCarrera);
    await pool.query('delete from carrera where idCarrera = ?',[idCarrera]);
    res.redirect('/links/admin');
})

router.post('/editUsuario/:idUsuario', async(req,res) => {
    const {idUsuario, Nombres,Apellidos,Tipo_idTipo,Carrera_idCarrera} = req.body;
    const usuario = {idUsuario,Nombres,Apellidos,Tipo_idTipo,Carrera_idCarrera};
    console.log(usuario);
    pool.query('update usuario set ? where idUsuario = ?',[usuario, idUsuario]);
    res.redirect('/links/admin');
})

module.exports = router;
