const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// obtener todas las categorìas - publico (get)
router.get('/', (req, res ) => {
  res.json('Get');
})

// obtener una categoría por id - publico (get)
router.get('/:id', (req, res ) => {
  res.json('Get id');
})

// crear nueva categorìa - privado - cualquier rol (push)
router.post('/', (req, res ) => {
  res.json('Push');
})

// actualizar categoria - privado - cualquier rol (put)
router.put('/:id', (req, res ) => {
  res.json('Put');
})

// borrar categoria - privado - admin role (delete)
router.delete('/:id', (req, res ) => {
  res.json('Delete');
})


module.exports = router;