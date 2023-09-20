const {response} = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Peticion GET - controlador'
    })
  }

const usuariosPut = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Peticion Put - controlador'
    })
  }

const usuariosPost = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Peticion Post - controlador'
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