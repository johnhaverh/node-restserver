const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: 'Debe informar el token',
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;

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