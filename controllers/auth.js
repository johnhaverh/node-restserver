const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {

    const { correo, password} = req.body;

    try {
      const usuario = await Usuario.findOne( {correo} );
      
      if (!usuario){
        return res.status(400).json({
          msg: 'Usuario / Password no validos - correo errado',
        })
      }

      if (!usuario.estado){
        return res.status(400).json({
          msg: 'Usuario / Password no validos - inactivo',
        })
      }

      const validaPassword = bcryptjs.compareSync(password, usuario.password)

      if (!validaPassword){
        return res.status(400).json({
          msg: 'Usuario / Password no validos - password errado',
        })
      }

      //generacion JWT
      const token = await generarJWT(usuario.id);

      res.json({
        usuario,
        token
      })
    } catch (error) {
      return res.status(500).json({
        msg: `Fallo el login - contactar al administrador ${error}`,
      })
    }

  }


module.exports = {
    login,
}