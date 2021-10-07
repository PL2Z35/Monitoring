const express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
const router = express.Router();
const pool = require('../database/database');
const helpers = require('../lib/helpers');

router.get('/student', async(req, res) =>{
    if(userActive!=null&&typeActive==3){
        const estudiante = await pool.query('select * from usuario where idUsuario = ?', [userActive]);
        const materias = await pool.query('select * from materia inner join usuario_materia on usuario_materia.materia_idmateria=materia.idmateria and usuario_idCarrera=? and usuario_materia.usuario_idTipo=2',[estudiante[0].Carrera_idCarrera]);
        const temas = await pool.query('select * from tema');
        const profesores = await pool.query('select Nombres,Apellidos,usuario_materia.materia_idmateria from usuario,usuario_materia where usuario.idUsuario = usuario_idUsuario and usuario_idCarrera=? and usuario_idTipo=2',[estudiante[0].Carrera_idCarrera]);
        const materiasmias = await pool.query('select * from materia inner join usuario_materia on usuario_materia.materia_idmateria=materia.idmateria and usuario_idCarrera=? and usuario_materia.usuario_idTipo=3 and usuario_idUsuario=?',[estudiante[0].Carrera_idCarrera,estudiante[0].idUsuario]);
        console.log(materiasmias);
        res.render('user/estudiante', {estudiante,profesores,materias,temas,materiasmias});
    }else{
        res.redirect('/');
    }
});

router.post('/asigMateria/:materia_idmateria', async(req,res) => {
    const {materia_idmateria} = req.params;
    const user = await pool.query('select * from usuario where idUsuario = ?',[userActive]);
    const object = {usuario_idUsuario:user[0].idUsuario, usuario_idTipo: user[0].Tipo_idTipo, usuario_idCarrera:user[0].Carrera_idCarrera,materia_idmateria};
    const resp = await pool.query('select * from usuario_materia where usuario_idUsuario=? and materia_idmateria=?;',[user[0].idUsuario,materia_idmateria]);
    if(resp.length>0){
        req.flash('message', 'El estudiente ya inscribio la materia');
        res.redirect('/user/student');
    }else{
        await pool.query('insert into usuario_materia set ?',[object]);
        req.flash('success', 'Materia agregada al semestre');
        res.redirect('/user/student');
    }
})

router.get('/delete/asigMateria/:materia_idmateria', async(req, res) =>{
    const {materia_idmateria} = req.params;
    const usuario_idUsuario = userActive;
    await pool.query('delete from usuario_materia where usuario_idUsuario = ? and materia_idmateria=?',[usuario_idUsuario,materia_idmateria]);
    req.flash('success', 'Materia borrada del semestre');
    res.redirect('/user/student');
})

module.exports = router;