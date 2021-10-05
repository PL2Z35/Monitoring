const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database/database');
const helpers = require('../lib/helpers');

router.get('/index', (req,res)=>{
    res.render('index');
})

router.post('/index', async(req,res)=>{
    const{idUsuario, Password}=req.body;
    const newObject = {idUsuario,Password}
    console.log(newObject);
    if(newObject.idUsuario=="Admin"&&newObject.Password=="Admin"){
        userActive = "Administrador";
        typeActive = "Administrador";
        res.redirect('/user/admin');
    }else if(newObject.idUsuario!=null&&newObject.Password!=null){
        const object = await pool.query('select * from usuario where idUsuario = ?',[newObject.idUsuario]);
        if(object.length!=0){
            const resp = await helpers.matchPassword(newObject.Password,object[0].Password);
        if(resp){
            userActive = object[0].idUsuario;
            typeActive = object[0].Tipo_idTipo;
            userCarrera = object[0].Carrera_idCarrera;
            console.log(object[0].Tipo_idTipo);
            console.log(object);
            if(object[0].Tipo_idTipo==1){
                res.redirect('/user/secretary');
            }
        }else{
            res.redirect('/');
        }
        }
        res.redirect('/');
    }else{
        res.redirect('/');
    }
})

router.get('/logout',(req,res)=>{
    userActive = null;
    typeActive = null;
    res.redirect('/index');
})

module.exports = router;

