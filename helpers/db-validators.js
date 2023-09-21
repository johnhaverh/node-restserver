const Role = require('../models/role');

const esRoleValido = async (rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
      throw new Error(`Rol: ${ rol} no existe en DB`)
    }
}

module.exports = {
    esRoleValido
}