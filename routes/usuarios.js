const {Router} = require('express');
const { check } = require('express-validator');
const { esRoleValido,
        emailExiste,
        existeUsuarioById
  } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosGetId,
        usuariosPut, 
        usuariosPost, 
        usuariosPatch, 
        usuariosDelete 
  } = require('../controllers/usuarios');

const { validarCampos,
        validarJWT,
        adminRole,
        tieneRole
} = require('../middlewares')

const router = Router();

//consultar
router.get('/', usuariosGet )

//consultar por ID
router.get('/:id', [
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioById),
  validarCampos
],usuariosGetId )

//actualizar
router.put('/:id', [
  validarJWT,
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioById),
  check('rol').custom( esRoleValido ),
  validarCampos
],usuariosPut )

//crear
router.post('/', [
  validarJWT,
  check('nombre','Nombre es obligatorio').not().isEmpty(),
  check('correo','Formato correo errado').isEmail(),
  check('correo').custom( emailExiste ),
  check('password','Password es tener minimo 6 caracteres').isLength({min: 6}),
  check('rol').custom( esRoleValido ),
  validarCampos
  // check('rol','Rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
], usuariosPost )


router.patch('/', usuariosPatch )

//borrar
router.delete('/:id', [
  validarJWT,
  // adminRole,
  tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioById),
  validarCampos
],usuariosDelete )

module.exports = router;