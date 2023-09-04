const TABLA = 'usuarios';
const bcrypt =require ('bcrypt');

module.exports = function(dbInyectada){

    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql');
    }

    function todos(){
        return db.todos(TABLA);
    }
    function uno(id){
        return db.uno(TABLA, id);
    }
    async function agregar(body){
        let user = body.usuario || '';
        let password = body.contraseña || '';

        if(body.contraseña){
            password = await bcrypt.hash(body.contraseña.toString(), 5) 
       }
        const usuario = {
            IdUsuarios:body.id,
            Nombres: body.nombre,
            Apellidos: body.apellidos,
            Activo: body.activo,
            Usuario:user ,
            Contraseña:password,
        } 
        const respuesta = await db.agregar(TABLA, usuario);

         return respuesta;

    }
    
    function eliminar(body){
        return db.eliminar(TABLA, body);
    }
    return {
        todos,
        uno,
        agregar,
        eliminar
    }
}
