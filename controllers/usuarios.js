const {response} = require('express');
const {Usuario} = require('../models');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {

    // const query = req.query;
    // const {q, nombre='no name', apikey, page=1, limit} = req.query;
    const {limite = 5, desde = 0 } = req.query;
    const query = {estado: true};
    // const usuarios = await Usuario.find(query)
    //   .skip(Number(desde))
    //   .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
          .skip(Number(desde))
          .limit(Number(limite))
    ]);


    res.json({
      total,
      usuarios
    })
  }

const usuariosGetId = async (req = request, res = response) => {

    const id= req.params.id;

    // const usuario = await Usuario.findById(id);
    
    // res.json({
    //     usuario
    // })

    const { nombre, correo, role, estado, google, _id, img} = await Usuario.findById(id);
    
    res.json({ nombre, correo, role, estado, google, uid: _id, img});
  }

const usuariosPut = async (req, res = response) => {
    
    const id= req.params.id;  
    const {_id, password, google, correo, ...resto} = req.body;

    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );
    
    res.json({
        usuario
    })
  }

const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});

    //encriptacion contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.status(201).res.json({
        usuario
    })
  }

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Peticion Patch - controlador'
    })
  }

  const usuariosDelete = async (req, res = response) => {
    
    const id = req.params.id; 
    
    //metodo para borrar fisicamente de la DB
    // const usuario = await Usuario.findByIdAndDelete( id );
    
    //metodo cambiando solo el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );
    // const usuarioAutenticado = req.usuario;
    // const uid = req.uid;
    
    res.json({
      usuario,
      // usuarioAutenticado
    })
  }


module.exports = {
    usuariosGet,
    usuariosGetId,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
}