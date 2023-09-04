exports.success = function(req, res, mensaje = '', status = 200){
    res.status(status).send({
        error: false,
        status: status,
        body: mensaje
    });
}
exports.error = function(req, res, mensaje, status){
    const statusCode = status || 500;
    const mensajeError = mensaje || 'Error interno';
    res.status(statusCode).send({ 
        error: true,
        status: statusCode,
        body: mensajeError
    });
}