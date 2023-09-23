const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: 'Debe informar el token',
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        req.usuario = usuario;
        // req.uid=uid;

        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido',
        })
    }
}

module.exports = {
    validarJWT
}