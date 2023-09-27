const {Router} = require('express');
const { check } = require('express-validator');
const { existeCategoriaById,
        categoriaExiste
} = require('../helpers/db-validators');

const { validarCampos,
        tieneRole,
        validarJWT
 } = require('../middlewares');

const { categoriasGet,
        categoriasGetId,
        categoriasPut,
        categoriasPost,
        categoriasPatch,
        categoriasDelete,
} = require('../controllers/categorias');

const router = Router();

// obtener todas las categorìas - publico (get)
router.get('/', categoriasGet )

// obtener una categoría por id - publico (get)
router.get('/:id', [
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(existeCategoriaById),
  validarCampos
],categoriasGetId )

// crear nueva categorìa - privado - cualquier rol (push)
router.post('/', [
  validarJWT,
  check('nombre','Nombre es obligatorio').not().isEmpty(),
  check('nombre').custom( categoriaExiste ),
  validarCampos
], categoriasPost );

// actualizar categoria - privado - cualquier rol (put)
router.put('/:id', [
  validarJWT,
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(existeCategoriaById),
  check('nombre','Nombre es obligatorio').not().isEmpty(),
  check('nombre').custom( categoriaExiste ),
  validarCampos
],categoriasPut )

router.patch('/', categoriasPatch )

// borrar categoria - privado - admin role (delete)
router.delete('/:id', [
  validarJWT,
  tieneRole('ADMIN_ROLE'),
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(existeCategoriaById),
  validarCampos
],categoriasDelete )


module.exports = router;