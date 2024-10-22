const mysql = require("mysql");
const app = require("./app");
require("dotenv").config();
const {
  DB_USER,
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  api_Version,
  serverip,
} = require("./constants");

//Puerto de Conexion
const Port = process.env.Post || 3977;

//Conexion a Base de Datos
const connectionDB = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

connectionDB.connect(function (err) {
  if (err) {
    console.error("Error al conectar ", err.stack);
  }
  console.log("La conexión es exitosa");
  app.listen(Port, () => {
    console.log(
      `Esto es para Postman: http://${serverip}:${Port}/api/${api_Version}`
    );
  });
});

app.get(`/`, (req, res) => {
  console.log(`http://${serverip}`);
  res.send("Para ver si jala de raiz");
});
