require("dotenv").config();

//Datos de Conexion a Base de Datos MYSQL
const DB_USER = process.env.MDB_USER;
const DB_PASSWORD = process.env.MDB_PASSWORD;
const DB_HOST = process.env.MDB_HOST;
const DB_DATABASE = process.env.MDB_DATABASE;

//Datos de Conexion a Base de Datos Postgresql
const POST_URL = process.env.POSTGRES_URL;
const POST_USER = process.env.POSTGRES_USER;
const POST_HOST = process.env.POSTGRES_HOST;
const POST_PASSWORD = process.env.POSTGRES_PASSWORD;
const POST_DATABASE = process.env.POSTGRES_DATABASE;

//Informacion de API
const api_Version = process.env.API_VERSION;
const serverip = process.env.IP_SERVER;

module.exports = {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DATABASE,
  POST_DATABASE,
  POST_HOST,
  POST_PASSWORD,
  POST_URL,
  POST_USER,
  api_Version,
  serverip,
};
