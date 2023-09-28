const {Router} = require('express');
const { buscar } = require('../controllers/buscar');

const router = Router();

//crear
router.get('/:coleccion/:termino', [

], buscar )


module.exports = router;