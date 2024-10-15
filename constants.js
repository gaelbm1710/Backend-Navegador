require("dotenv").config();

//Datos de Conexion a Base de Datos
const DB_USER = process.env.MDB_USER;
const DB_PASSWORD = process.env.MDB_PASSWORD;
const DB_HOST = process.env.MDB_HOST;
const DB_DATABASE = process.env.MDB_DATABASE;

//Informacion de API
const api_Version = process.env.API_VERSION;
const serverip = process.env.IP_SERVER;

module.exports = {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DATABASE,
  api_Version,
  serverip,
};
