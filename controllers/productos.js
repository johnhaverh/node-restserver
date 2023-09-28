const {response} = require('express');
const {Producto} = require('../models');

const productosGet = async (req = request, res = response) => {

    const {limite = 5, desde = 0 } = req.query;
    const query = {estado: true};

    const [total, productos] = await Promise.all([
      Producto.countDocuments(query),
      Producto.find(query)
          .populate('usuario', 'nombre')
          .populate('categoria', 'nombre')
          .skip(Number(desde))
          .limit(Number(limite))
    ]);


    res.json({
      total,
      productos
    })
  }

const productosGetId = async (req = request, res = response) => {

  const id= req.params.id;

  const producto = await Producto.findById(id)
                              .populate('usuario', 'nombre')
                              .populate('categoria', 'nombre');
  
  res.json({
      producto
  })
}


const productosPut = async (req, res = response) => {

  const {_id, estado, usuario, ...data} = req.body;
    
    const id= req.params.id;
    data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, data , {new: true});
    
    res.json({
        producto
    })
  }

const productosPost = async (req, res = response) => {

    const {estado, usuario, ...body} = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre})

    if(productoDB){
      return res.status(400).json({
        msg: `Producto ${ProductoDB.nombre} ya existe en DB`
      })
    }

    const data ={
      ...body,
      nombre: body.nombre.toUpperCase(),
      usuario: req.usuario._id,
    }
    
    const producto = new Producto(data)

    await producto.save();

    res.status(201).json({
      producto
    })
  }

const productosPatch = (req, res = response) => {
    res.json({
        msg: 'Peticion Patch - controlador'
    })
  }

const productosDelete = async (req, res = response) => {
    
    const id = req.params.id; 
    
    //metodo para borrar fisicamente de la DB
    // const producto = await Producto.findByIdAndDelete( id );

    //metodo cambiando solo el estado de la Producto
    const producto = await Producto.findByIdAndUpdate( id, {estado: false}, {new: true} );
    
    res.json({
      producto,
    })
  }


module.exports = {
    productosGet,
    productosGetId,
    productosPut,
    productosPost,
    productosPatch,
    productosDelete,
}