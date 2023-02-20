/*
 * server.js
 */
 
/* Librerías necesarias para crear la aplicación */
const express = require("express");
const app = express();
const port = 3000;
var http = require('http').Server(app);
var io   = require('socket.io')(http);
 
 
/*
 *  Configuramos nuestra ruta (index) principal con
 *  express para mostrar el chat
 */
app.get('/', function(req, res) {
  res.sendFile( __dirname + '/chat.html');
});
 

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  socket.on('nuevo mensaje', (datos) => {
    console.log(`Mensaje recibido de ${datos.usuario}: ${datos.mensaje}`);
    io.emit('nuevo mensaje', datos);
  });
   
  /*
   * Imprimimos en consola cada vez que un usuario
   * se desconecte del sistema.
   */
  socket.on('disconnect', function() {
    console.log('Usuario desconectado');
  });
   
});

/*
 * Iniciamos la aplicación en el puerto 3000
 */
http.listen(3000, function() {
    console.log('listening on *:3000');
  });