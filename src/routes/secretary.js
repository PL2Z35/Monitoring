const express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
const router = express.Router();
const pool = require('../database/database');

router.get('/secretary', async(req, res) =>{
    const secretaria = await pool.query('select * from usuario where idUsuario = ?', [userActive])
    const materias = await pool.query('select * from materia where carrera_idCarrera = ?',[secretaria[0].Carrera_idCarrera]);
    const profesores = await pool.query('select * from usuario where Tipo_idtipo = 2 and Carrera_idCarrera = ?',[secretaria[0].Carrera_idCarrera]);
    console.log(profesores);
    if(userActive!=null&&typeActive==1){
        
        res.render('user/secretaria', {profesores,secretaria,materias});
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

router.post('/asignar/:idmateria', async(req, res)=>{

    const {idUsuario} = req.body;
    const {idmateria} = req.params;
    const usuario_idUsuario = parseInt(idUsuario,10);
    const materia_idmateria = parseInt(idmateria,10);
    const usuario_idTipo=2;
    const usuario_idCarrera = userCarrera;
    const object = {usuario_idUsuario,usuario_idTipo,usuario_idCarrera,materia_idmateria};
    console.log(object);
    await pool.query('insert into usuario_materia set ?',[object]);
    req.flash('success', 'Docente asignado correctamente');
    res.redirect('/user/secretary');
})

module.exports = router;