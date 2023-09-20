const {response} = require('express');

const usuariosGet = (req = request, res = response) => {

    // const query = req.query;
    const {q, nombre='no name', apikey, page=1, limit} = req.query;


    res.json({
        ok: true,
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
        ok: true,
        msg: 'Peticion Put - controlador',
        id
    })
  }

const usuariosPost = (req, res = response) => {

    // const body = req.body;
    const {nombre, edad} = req.body;

    res.json({
        ok: true,
        msg: 'Peticion Post - controlador',
        nombre, 
        edad
        // body
    })
  }

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Peticion Patch - controlador'
    })
  }

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
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