const {response} = require('express');
const bcryptjs = require('bcryptjs');

const {Usuario} = require('../models');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req, res=response) => {
    const  {id_token} = req.body;

    try {
      const {nombre, img, correo} = await googleVerify(id_token);
      
      let usuario = await Usuario.findOne( {correo} );

      if (!usuario){
          const data = {
              nombre,
              correo,
              password: ':P',
              img,
              google: true,
          };

          usuario = new Usuario (data);
          await usuario.save();
      }

      if (!usuario.estado) {
        return res.status(401).json({
          msg: `Usuario bloqueado - validar con administrador`,
        })
      }

      //generacion JWT
      const token = await generarJWT(usuario.id);

      res.json({
        usuario,
        token,
        msg: `Validacion OK - Google`,
      })
    } catch (error) {
      return res.status(400).json({
        msg: `Fallo Google login - contactar al administrador ${error}`,
      })
    }
  }

  const validarTokenUsuario = async (req, res = response) => {
    const token = await generarJWT(req.usuario._id);
  
    res.json({
      usuario: req.usuario,
      token: token,
    });
};


module.exports = {
    login,
    googleSignIn,
    validarTokenUsuario
}