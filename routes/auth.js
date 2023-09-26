const {Router} = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//crear
router.post('/login', [
  check('correo','Correo es obligatorio').isEmail(),
  check('password','Password es obligatorio').not().isEmpty(),
  validarCampos
], login )


//google
router.post('/google', [
  check('id_token','Token Google es obligatorio').not().isEmpty(),
  validarCampos
], googleSignIn )

module.exports = router;