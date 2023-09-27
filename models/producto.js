const { Schema, model } = require('mongoose');

const ProductoSchema = Schema ({
   
    nombre:{
        type: String,
        required: [true, 'Nombre producto es obligatorio'],
        unique: true
    },   

    estado:{
        type: Boolean,
        default: true,
        required: true,
    }, 
    
    precio:{
        type: Number,
        default: 0
    },     
    
     descripcion:{
         type: String,
     }, 

     disponible:{
         type: Boolean,
         default: true,
     },   

    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },    

    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true,
    },    

})

ProductoSchema.methods.toJSON = function() {
    const { __v, _id, estado, ...producto} = this.toObject();
    producto.uid = _id;
    return producto;
}


module.exports = model( 'Producto', ProductoSchema);