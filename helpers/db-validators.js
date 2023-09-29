const Role = require('../models/role');
const { Usuario, 
        Categoria,
        Producto
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


//validaciones productos

const existeProductoById = async (id ) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto){
        throw new Error(`id: ${ id} no existe en DB`)
    }
}


const productoExiste = async (nombre = '') => {

    const nombreQuery = nombre.toUpperCase();

    const existeProducto = await Producto.findOne({nombreQuery});
    if (existeProducto){
        throw new Error(`Producto: ${ nombre} ya existe en DB`)
    //   return res.status(400).json({
    //     msg: 'Correo ya existe en DB',
    //   });
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioById,
    existeCategoriaById,
    categoriaExiste,
    existeProductoById,
    productoExiste,
    coleccionesPermitidas
}