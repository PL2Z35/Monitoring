const express = require('express');
const { NULL } = require('mysql/lib/protocol/constants/types');
const router = express.Router();
const pool = require('../database/database');

router.get('/secretary', async(req, res) =>{
    const carreras = await pool.query('select * from carrera');
    const tipos = await pool.query('select * from tipo');
    const usuarios = await pool.query('select idUsuario,Nombres,Apellidos,Carrera_idCarrera,Tipo_idTipo,(select Tipo from tipo where usuario.Tipo_idTipo=tipo.idTipo) as Tipo,(select Nombre from carrera where usuario.Carrera_idCarrera=carrera.idCarrera) as Carrera from usuario');
    res.render('user/secretaria', {usuarios});
})

module.exports = router;