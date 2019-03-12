module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // error de aplicacion customizado
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // error de validacion mongoose
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // error de authenticacion jwt
        return res.status(401).json({ message: 'Token invalido' });
    }

    // por defecto error de servidor 500
    return res.status(500).json({ message: err.message });
}