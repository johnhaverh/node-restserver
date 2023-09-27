const {response} = require('express');
const {Categoria} = require('../models');

const categoriasGet = async (req = request, res = response) => {

    const {limite = 5, desde = 0 } = req.query;
    const query = {estado: true};

    const [total, categorias] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
          .populate('usuario', 'nombre')
          .skip(Number(desde))
          .limit(Number(limite))
    ]);


    res.json({
      total,
      categorias
    })
  }

const categoriasGetId = async (req = request, res = response) => {

  const id= req.params.id;

  const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
  
  res.json({
      categoria
  })
}


const categoriasPut = async (req, res = response) => {
    
    const id= req.params.id;  
    const nombre = req.body.nombre.toUpperCase();

    const data = {
      nombre,
      usuario: req.usuario._id,
    }

    const categoria = await Categoria.findByIdAndUpdate( id, data );
    
    res.json({
        categoria
    })
  }

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

const categoriasPatch = (req, res = response) => {
    res.json({
        msg: 'Peticion Patch - controlador'
    })
  }

const categoriasDelete = async (req, res = response) => {
    
    const id = req.params.id; 
    
    //metodo para borrar fisicamente de la DB
    // const categoria = await Categoria.findByIdAndDelete( id );

    //metodo cambiando solo el estado de la categoria
    const categoria = await Categoria.findByIdAndUpdate( id, {estado: false} );
    
    res.json({
      categoria,
    })
  }


module.exports = {
    categoriasGet,
    categoriasGetId,
    categoriasPut,
    categoriasPost,
    categoriasPatch,
    categoriasDelete,
}