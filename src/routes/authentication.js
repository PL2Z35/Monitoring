const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/index', (req,res)=>{
    res.render('index');
})

router.post('/index', (req,res)=>{
    const{idUsuario, Password}=req.body;
    const newObject = {idUsuario,Password}
    console.log(newObject);
    if(newObject.idUsuario=="Admin"&&newObject.Password=="Admin"){
        userActive = "Administrador";
        typeActive = "Administrador";
        res.redirect('/user/admin');
    }else{
        res.redirect('/index');
    }
})

router.get('/logout',(req,res)=>{
    userActive = null;
    typeActive = null;
    res.redirect('/index');
})

module.exports = router;

