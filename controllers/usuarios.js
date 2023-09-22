const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = (req = request, res = response) => {

    // const query = req.query;
    const {q, nombre='no name', apikey, page=1, limit} = req.query;

    res.json({
        msg: 'Peticion GET - controlador',
        // query
        q,
        nombre,
        page,
        limit
    })
  }

const usuariosPut = (req, res = response) => {
    
  const id= req.params.id;  
    
    res.json({
        msg: 'Peticion Put - controlador',
        id
    })
  }

const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});

    //validacion correo
    // const existeEmail = await Usuario.findOne({correo});
    // if (existeEmail){
    //   return res.status(400).json({
    //     msg: 'Correo ya existe en DB',
    //   });
    // }

    //encriptacion contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.json({
        msg: 'Peticion Post - controlador',
        usuario
    })
  }

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Peticion Patch - controlador'
    })
  }

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Peticion Delete - controlador'
    })
  }


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
}