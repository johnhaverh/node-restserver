const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Peticion GET'
    })
  })

  router.put('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Peticion PUT'
    })
  })

  router.post('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Peticion POST'
    })
  })

  router.delete('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Peticion DELETE'
    })
  })

module.exports = router;