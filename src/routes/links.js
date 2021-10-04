const express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
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
    if(!isEmpty(newObject)){
        await pool.query('insert into carrera set ?', [newObject]);
        req.flash('success', 'Carrera agregada correctamente');
    }else{
        req.flash('message', 'Faltan espacios por rellenar');
    }
    
    res.redirect('/links/admin');
})

router.post('/addUsuario', async(req,res) => {
    const{idUsuario,Nombres,Apellidos,Tipo_idTipo,Carrera_idCarrera}=req.body;
    const newObject = {idUsuario,Nombres,Apellidos,Tipo_idTipo,Carrera_idCarrera};
    if(!isEmpty(newObject)){
        await pool.query('insert into usuario set ?', [newObject]);
        req.flash('success', 'Usuario agregado correctamente');
    }else{
        req.flash('message', 'Faltan espacios por rellenar');
    }
    res.redirect('/links/admin');
})

router.get('/deleteUsuario/:idUsuario', async(req,res) => {
    const {idUsuario} = req.params;
    await pool.query('delete from usuario where idUsuario = ?',[idUsuario]);
    req.flash('success', 'Usuario elmininado correctamente');
    res.redirect('/links/admin');
})

router.get('/deleteCarrera/:idCarrera', async(req,res) => {
    const {idCarrera} = req.params;
    console.log(idCarrera);
    await pool.query('delete from carrera where idCarrera = ?',[idCarrera]);
    req.flash('success', 'Carrera eliminada correctamente');
    res.redirect('/links/admin');
})

router.post('/editUsuario/:idUsuario', async(req,res) => {
    const {idUsuario, Nombres,Apellidos,Tipo_idTipo,Carrera_idCarrera} = req.body;
    const usuario = {idUsuario,Nombres,Apellidos,Tipo_idTipo,Carrera_idCarrera};
    if(!isEmpty(usuario)){
        pool.query('update usuario set ? where idUsuario = ?',[usuario, idUsuario]);
        req.flash('success', 'Usuario modificado correctamente');
    }else{
        req.flash('message', 'Faltan espacios por rellenar');
    }
    res.redirect('/links/admin');
})

module.exports = router;

function isEmpty(object){
    for (let i = 0; i < Object.values(object).length; i++) {
        if(Object.values(object)[i]==''||Object.values(object)[i]==NULL){
            return true;
        } 
    }
    return false;
}