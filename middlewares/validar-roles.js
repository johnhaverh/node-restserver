
const adminRole = (req, res = response, next ) => {
    
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Token no ha sido validado',
        });
    }

    const {rol, nombre} = req.usuario;

    if (rol != 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: ` ${nombre} no es usuario Administrador`,
        });       
    }

    next();
}

const tieneRole = (...roles) => {

    return (req, res = response, next ) => {
        
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Token no ha sido validado',
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: ` ${req.usuario.nombre} debe tener uno de estos roles ${roles}`,
            });       
        }

        next();
    }
}

module.exports = {
    adminRole,
    tieneRole
}