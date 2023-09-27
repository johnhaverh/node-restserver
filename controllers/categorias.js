const {response} = require('express');
const {Categoria} = require('../models');

// const categoriasGet = async (req = request, res = response) => {

//     const {limite = 5, desde = 0 } = req.query;
//     const query = {estado: true};

//     const [total, usuarios] = await Promise.all([
//       Usuario.countDocuments(query),
//       Usuario.find(query)
//           .skip(Number(desde))
//           .limit(Number(limite))
//     ]);


//     res.json({
//       total,
//       usuarios
//     })
//   }

// const categoriasPut = async (req, res = response) => {
    
//     const id= req.params.id;  
//     const {_id, password, google, correo, ...resto} = req.body;

//     if (password){
//         const salt = bcryptjs.genSaltSync();
//         resto.password = bcryptjs.hashSync(password,salt);
//     }

//     const usuario = await Usuario.findByIdAndUpdate( id, resto );
    
//     res.json({
//         usuario
//     })
//   }

const categoriasPost = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre})

    if(categoriaDB){
      return res.status(400).json({
        msg: `Categoría ${categoriaDB.nombre} ya existe en DB`
      })
    }

    const data = {
      nombre,
      usuario: req.usuario._id,
    }

    const categoria = new Categoria(data)

    await categoria.save();

    res.status(201).json({
      categoria
    })
  }

// const categoriasPatch = (req, res = response) => {
//     res.json({
//         msg: 'Peticion Patch - controlador'
//     })
//   }

// const categoriasDelete = async (req, res = response) => {
    
//     const id = req.params.id; 
    
//     //metodo para borrar fisicamente de la DB
//     // const usuario = await Usuario.findByIdAndDelete( id );
    
//     //metodo cambiando solo el estado del usuario
//     const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );
//     // const usuarioAutenticado = req.usuario;
//     // const uid = req.uid;
    
//     res.json({
//       usuario,
//       // usuarioAutenticado
//     })
//   }


module.exports = {
    // categoriasGet,
    // categoriasPut,
    categoriasPost,
    // categoriasPatch,
    // categoriasDelete,
}