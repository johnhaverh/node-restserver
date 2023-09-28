const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivo } = require('../controllers/uploads');

const router = Router();

//crear
router.post('/', [
  // check('correo','Correo es obligatorio').isEmail(),
  // check('password','Password es obligatorio').not().isEmpty(),
  // validarCampos
], cargarArchivo )

module.exports = router;