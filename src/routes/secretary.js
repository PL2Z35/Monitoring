const express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
const router = express.Router();
const pool = require('../database/database');

router.get('/secretary', async(req, res) =>{
    const usuarios = await pool.query('select idUsuario,Nombres,Apellidos,Carrera_idCarrera,Tipo_idTipo,(select Tipo from tipo where usuario.Tipo_idTipo=tipo.idTipo) as Tipo,(select Nombre from carrera where usuario.Carrera_idCarrera=carrera.idCarrera) as Carrera from usuario');
    const secretaria = await pool.query('select * from usuario where idUsuario = ?', [userActive])
    const materias = await pool.query('select * from materia where carrera_idCarrera = ?',[secretaria[0].Carrera_idCarrera]);
    if(userActive!=null&&typeActive==1){
        res.render('user/secretaria', {usuarios,secretaria,materias});
    }else{
        res.redirect('/');
    }
});

router.post('/addMateria', async(req,res)=>{
    const {Materia} = req.body;
    const carrera_idCarrera = userCarrera;
    const object = {Materia,carrera_idCarrera};
    await pool.query('insert into materia set ?',[object]);
    req.flash('success', 'Materia agregada correctamente');
    res.redirect('/user/secretary');
})

module.exports = router;