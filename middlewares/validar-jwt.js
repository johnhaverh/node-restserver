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

        if ( !usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB',
            })
        }

        if ( !usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivo',
            })
        }


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