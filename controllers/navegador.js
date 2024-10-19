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
//Usuarios:

//Crear usuario:
async function createUser(req, res) {
  const { name, email } = req.body;
  try {
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    const result = await query(sql, [name, email]);
    res.json({ msg: "Usuario creado", user_id: result.insertId });
  } catch (error) {
    res.status(400).send({ msg: "Error al Crear usuario: ", error });
  }
}

//Obtener los Usuarios:
async function getUsers(req, res) {
  try {
    const sql = "SELECT * FROM users";
    const users = await query(sql);
    res.json(users);
  } catch (error) {
    res.status(400).send({ msg: "Error al obteners usuarios: ", error });
  }
}

// Consultas:

//Crear Consulta
async function createSearchQuery(req, res) {
  const { user_id, query } = req.body;
  try {
    const sql = "INSERT INTO search_queries (user_id, query) VALUES (?, ?)";
    const result = await query(sql, [user_id, query]);
    res.json({
      message: "Consulta de busqueda creada: ",
      search_id: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ msg: "Error al crear la consulta de búsqueda", error });
  }
}

//Obtener las consultas del navegador:
async function getSearchQueries(req, res) {
  try {
    const sql = "SELECT * FROM search_queries";
    const queries = await query(sql);
    res.json(queries);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ msg: "Error al obtener las consultas de búsqueda", error });
  }
}

//Resultados:

//Crear o Insertar Resultados de Bsuquedas
async function createSearchResult(req, res) {
  const { search_id, title, description, url } = req.body;
  try {
    const sql =
      "INSERT INTO search_results (search_id, title, description, url) VALUES (?, ?, ?, ?)";
    const result = await query(sql, [search_id, title, description, url]);
    res.json({
      message: "Resultado de busqueda creado",
      result_id: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error al crear el resultado ", error });
  }
}

//Obtener los resultados:
async function getSearchResults(req, res) {
  try {
    const sql = "SELECT * FROM search_results";
    const results = await query(sql);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error al obtener los resultados ", error });
  }
}

//Exportar endpoints
module.exports = {
  Ejemplo,
  //Aquí van los nombres de los endpoints
  createUser,
  getUsers,
  createSearchQuery,
  getSearchQueries,
  createSearchResult,
  getSearchResults,
};
