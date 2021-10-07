const express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
const router = express.Router();
const pool = require('../database/database');

router.get('/secretary', async(req, res) =>{
    if(userActive!=null&&typeActive==1){
        const secretaria = await pool.query('select * from usuario where idUsuario = ?', [userActive])
        const materias = await pool.query('select * from materia where carrera_idCarrera = ?',[secretaria[0].Carrera_idCarrera]);
        const profesores = await pool.query('select * from usuario where Tipo_idtipo = 2 and Carrera_idCarrera = ?',[secretaria[0].Carrera_idCarrera]);
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
    console.log(materia_idmateria);
    const respu = await pool.query('select * from usuario_materia where materia_idmateria = ? and usuario_idTipo=2',[materia_idmateria]);
    if(respu.length==0){
        await pool.query('insert into usuario_materia set ?',[object]);
        req.flash('success', 'Docente asignado correctamente');
    }else{
        req.flash('message', 'Ya hay docente designado.');
    }
    res.redirect('/user/secretary');
})

router.get('/delete/:idmateria', async(req, res)=>{
    const {idmateria} =req.params;
    const object = {idmateria};
    try {
        await pool.query('delete from materia where idmateria = ?',[idmateria]);
        req.flash('success', 'Materia borrada correctamente');
    } catch (error) {
        req.flash('message', 'Hay un profesor asignado a la clase.');
    }
    res.redirect('/user/secretary');
})

module.exports = router;