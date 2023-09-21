const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema ({
    nombre:{
        type: String,
        required: [true, 'Nombre es obligatorio']
    },    
    correo:{
        type: String,
        required: [true, 'Correo es obligatorio'],
        unique: true
    },    
    password:{
        type: String,
        required: [true, 'Password es obligatorio']
    },    
    img:{
        type: String,
    },    
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },    
    estado:{
        type: Boolean,
        default: true
    },    
    google:{
        type: Boolean,
        default: false
    },
})


module.exports = model( 'Usuario', UsuarioSchema);