const {Router} = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//crear
router.post('/login', [
  check('correo','Correo es obligatorio').isEmail(),
  check('password','Password es obligatorio').not().isEmpty(),
  validarCampos
], login )

module.exports = router;