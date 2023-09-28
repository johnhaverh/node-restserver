const {Router} = require('express');
const { check } = require('express-validator');
const { existeProductoById,
        productoExiste,
        existeCategoriaById
} = require('../helpers/db-validators');

const { validarCampos,
        tieneRole,
        validarJWT
 } = require('../middlewares');

const { productosGet,
        productosGetId,
        productosPut,
        productosPost,
        productosPatch,
        productosDelete,
} = require('../controllers/productos');

const router = Router();

// obtener todas las productos - publico (get)
router.get('/', productosGet )

// obtener una producto por id - publico (get)
router.get('/:id', [
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(existeProductoById),
  validarCampos
],productosGetId )

// crear nueva producto - privado - cualquier rol (push)
router.post('/', [
  validarJWT,
  check('nombre','Nombre es obligatorio').not().isEmpty(),
  check('nombre').custom( productoExiste ),
  check('categoria','No es un ID valido').isMongoId(),
  check('categoria').custom(existeCategoriaById),
  validarCampos
], productosPost );

// actualizar producto - privado - cualquier rol (put)
router.put('/:id', [
  validarJWT,
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(existeProductoById),
  check('nombre','Nombre es obligatorio').not().isEmpty(),
  check('nombre').custom( productoExiste ),
  validarCampos
],productosPut )

router.patch('/', productosPatch )

// borrar producto - privado - admin role (delete)
router.delete('/:id', [
  validarJWT,
  tieneRole('ADMIN_ROLE'),
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(existeProductoById),
  validarCampos
],productosDelete )


module.exports = router;