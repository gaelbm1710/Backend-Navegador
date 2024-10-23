var mysql = require('mysql2');

var conexion = mysql.createConnection({
    host: "localhost",
    database: "navegador",
    user: "root",
    password: "" 
});

conexion.connect(function(error){
    if (error) {
        throw error;
    } else {
        console.log("Conexión exitosa");   
    }
});
