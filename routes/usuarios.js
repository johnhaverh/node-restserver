const {Router} = require('express');
const { check } = require('express-validator');
const { esRoleValido } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosPatch, 
        usuariosDelete 
  } = require('../controllers/usuarios');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet )

router.put('/:id', usuariosPut )

router.post('/', [
  check('nombre','Nombre es obligatorio').not().isEmpty(),
  check('correo','Formato correo errado').isEmail(),
  check('password','Password es tener minimo 6 caracteres').isLength({min: 6}),
  // check('rol','Rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom( esRoleValido ),
  validarCampos
], usuariosPost )

router.patch('/', usuariosPatch )

router.delete('/', usuariosDelete )

module.exports = router;