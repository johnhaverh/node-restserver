const Role = require('../models/role');
const { Usuario, 
        Categoria
} = require('../models');

//validaciones usuario
const esRoleValido = async (rol = 'USER_ROLE') =>{
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

const existeUsuarioById = async (id ) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error(`id: ${ id} no existe en DB`)
    }
}
//validaciones categorias

const existeCategoriaById = async (id ) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria){
        throw new Error(`id: ${ id} no existe en DB`)
    }
}


const categoriaExiste = async (nombre = '') => {

    const nombreQuery = nombre.toUpperCase();

    const existeCategoria = await Categoria.findOne({nombreQuery});
    if (existeCategoria){
        throw new Error(`Categoria: ${ nombre} ya existe en DB`)
    //   return res.status(400).json({
    //     msg: 'Correo ya existe en DB',
    //   });
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioById,
    existeCategoriaById,
    categoriaExiste
}