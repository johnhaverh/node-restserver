const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos, validarArchivo } = require('../middlewares');
const { archivosPost, imagenPut, imagenGet, imagenCloudinaryPut } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

//crear
router.post('/', validarArchivo, archivosPost )

//actualziar
router.put('/:coleccion/:id', [
  validarArchivo,
  check('id','No es un ID valido').isMongoId(),
  check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
  validarCampos
 ], imagenCloudinaryPut )
// ], imagenPut )

//mostrar
router.get('/:coleccion/:id', [
  check('id','No es un ID valido').isMongoId(),
  check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
  validarCampos
], imagenGet )

module.exports = router;