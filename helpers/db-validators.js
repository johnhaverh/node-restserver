const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
      throw new Error(`Rol: ${ rol} no existe en DB`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        throw new Error(`Correo: ${ correo} ya existe en DB`)
    //   return res.status(400).json({
    //     msg: 'Correo ya existe en DB',
    //   });
    }
}

module.exports = {
    esRoleValido,
    emailExiste
}