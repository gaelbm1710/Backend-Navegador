const mysql = require("mysql");
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } = require("../constants");

//Ejemplo para crear un pool https://yarnpkg.com/package?q=mysql&name=mysql#pooling-connections
//Configuracion del pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});
function query(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}
/*
Esta configuracion es para crear consultas 
que no consuman mucho recurso.
Además de que mysql no puede usar promesas así que no puede utilizar 
await
*/

//Ejemplo de Endpoint(Select * from History)
async function Ejemplo(req, res) {
  try {
    const response = await query("SELECT * FROM History");
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error al obtener la información", error });
  }
}
//Crear endpoints
//Aquí van los demás endpoints

//Exportar endpoints
module.exports = {
  Ejemplo,
  //Aquí van los nombres de los endpoints
};
