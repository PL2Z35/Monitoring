const express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
const router = express.Router();
const pool = require('../database/database');
const helpers = require('../lib/helpers');

router.get('/teacher', async(req, res) =>{
    if(userActive!=null&&typeActive==2){
        const profesor = await pool.query('select * from usuario where idUsuario = ?', [userActive])
        const materias = await pool.query('select * from materia inner join usuario_materia on usuario_materia.materia_idmateria=materia.idmateria and usuario_materia.usuario_idUsuario=?;',[profesor[0].idUsuario]);
        const profesores = await pool.query('select * from usuario where Tipo_idtipo = 2 and Carrera_idCarrera = ?',[profesor[0].Carrera_idCarrera]);
        const temas = await pool.query('select * from tema');
        res.render('user/profesor', {profesores,profesor,materias,temas});
    }else{
        res.redirect('/');
    }
});

router.post('/addTheme/:materia_idmateria', async(req,res)=>{
    const{Nombre, Descripcion} = req.body;
    const{materia_idmateria} = req.params;
    const object = {Nombre,Descripcion,materia_idmateria};
    if(Nombre.length>0&&Descripcion.length>0){
        await pool.query('insert into tema set ?',[object]);
        req.flash('success', 'Se agrego el tema');
        res.redirect('/user/teacher');
    }else{
        req.flash('message', 'Faltan datos por rellenar');
        res.redirect('/user/teacher');
    }
})

router.get('/deleteTheme/:idtema', async(req,res)=>{
    const {idtema} = req.params;
    const object = {idtema}
    await pool.query('delete from tema where idtema=?',[idtema]);
    req.flash('success', 'Tema borrado');
    res.redirect('/user/teacher');
})

module.exports = router;