const {Router} = require('express');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosPatch, 
        usuariosDelete 
  } = require('../controllers/usuarios');

const { check } = require('express-validator');

const router = Router();

router.get('/', usuariosGet )
router.put('/:id', usuariosPut )
router.post('/', [
  check('correo','Formato correo errado').isEmail(),
], usuariosPost )
router.patch('/', usuariosPatch )
router.delete('/', usuariosDelete )

module.exports = router;