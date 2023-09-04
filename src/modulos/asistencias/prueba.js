const express = require('express');
const db = require('../../DB/mysql'); 
const TABLA = 'asistencias';
const tabla2 = 'usuarios'

async function registrarFaltasController() {
  
  let fecha = new Date() || '';
  try {
    // Llama a la función registrarFaltas para obtener los IdUsuario sin registros
    const resultadoConsulta = await registrarFaltas(tabla2,TABLA);
    
    // Verifica si se encontraron IdUsuario sin registros
    if (resultadoConsulta && resultadoConsulta.length > 0) {
      // Los IdUsuario sin registros se encuentran en resultadoConsulta
      // Itera a través de resultadoConsulta y registra faltas para cada usuario
      for (const filaConsulta of resultadoConsulta) {
        const registro = {
          IdUsuarios: filaConsulta.id, // Asumiendo que "id" contiene el IdUsuario
          Fecha: fecha,
          Validacion: 'Falta',
        };

        console.log('Registrando falta para el usuario Id:', filaConsulta.id);
        
        // Inserta el registro en la tabla 'asistencias'
        const respuesta = await db.agregar(TABLA, registro);
        console.log('Falta registrada en la tabla asistencias:', respuesta);
      }

      // Puedes retornar un mensaje de éxito o cualquier otro resultado necesario
      return 'Faltas registradas correctamente.';
      // Llama a una función para registrar automáticamente las faltas para estos usuarios
    } else {
      console.log('Todos los usuarios han registrado asistencia para hoy.');
    }
    // Puedes retornar un mensaje de éxito o cualquier otro resultado necesario
    return 'Faltas registradas correctamente.';
  } catch (error) {
    console.error('Error al registrar faltas:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
}

// Programa la ejecución de registrarFaltasController a las 3 AM todos los días
cron.schedule('41 2 * * *', async () => {
  try {
    const mensaje = await registrarFaltasController();
    console.log(`Ejecución programada a las 3 AM: ${mensaje}`);
  } catch (error) {
    console.error('Error en la ejecución programada:', error);
  }
});