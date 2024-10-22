const mysql = require("mysql");
const postgresql = require("@vercel/postgres");
const {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  POST_DATABASE,
  POST_HOST,
  POST_PASSWORD,
  POST_URL,
  POST_USER,
} = require("../constants");

// Configuración de MySQL
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

// Endpoint para ejemplo de consulta en MySQL
async function Ejemplo(req, res) {
  try {
    const response = await query("SELECT * FROM History");
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error al obtener la información", error });
  }
}

// Endpoints para usuarios en MySQL
async function createUser(req, res) {
  const { name, email } = req.body;
  try {
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    const result = await query(sql, [name, email]);
    res.json({ msg: "Usuario creado", user_id: result.insertId });
  } catch (error) {
    res.status(400).send({ msg: "Error al crear usuario: ", error });
  }
}

async function getUsers(req, res) {
  try {
    const sql = "SELECT * FROM users";
    const users = await query(sql);
    res.json(users);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener usuarios: ", error });
  }
}

// Endpoints para consultas de búsqueda en MySQL
async function createSearchQuery(req, res) {
  const { user_id, query } = req.body;
  try {
    const sql = "INSERT INTO search_queries (user_id, query) VALUES (?, ?)";
    const result = await query(sql, [user_id, query]);
    res.json({
      message: "Consulta de búsqueda creada: ",
      search_id: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ msg: "Error al crear la consulta de búsqueda", error });
  }
}

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

// Endpoints para resultados de búsqueda en MySQL
async function createSearchResult(req, res) {
  const { search_id, title, description, url } = req.body;
  try {
    const sql =
      "INSERT INTO search_results (search_id, title, description, url) VALUES (?, ?, ?, ?)";
    const result = await query(sql, [search_id, title, description, url]);
    res.json({
      message: "Resultado de búsqueda creado",
      result_id: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error al crear el resultado", error });
  }
}

async function getSearchResults(req, res) {
  try {
    const sql = "SELECT * FROM search_results";
    const results = await query(sql);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error al obtener los resultados", error });
  }
}

// Configuración de PostgreSQL
const poolPostgresql = postgresql.createPool({
  connectionString: POST_URL,
});

async function queryPostgresql(postgres, params = []) {
  try {
    const result = await poolPostgresql.query(postgres, params);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// Endpoints para usuarios en PostgreSQL
async function createUserPost(req, res) {
  const { name, email } = req.body;
  try {
    const postgres = "INSERT INTO users (name, email) VALUES ($1, $2)";
    const result = await queryPostgresql(postgres, [name, email]);
    res.json({ msg: "Usuario creado", user_id: result.insertId });
  } catch (error) {
    res.status(400).send({ msg: "Error al crear usuario: ", error });
  }
}

async function getUsersPost(req, res) {
  try {
    const postgres = "SELECT * FROM users";
    const users = await queryPostgresql(postgres);
    res.json(users);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener usuarios: ", error });
  }
}

// Endpoints para consultas de búsqueda en PostgreSQL
async function createSearchQueryPost(req, res) {
  const { user_id, query } = req.body;
  try {
    const postgres =
      "INSERT INTO search_queries (user_id, query) VALUES ($1, $2)";
    const result = await queryPostgresql(postgres, [user_id, query]);
    res.json({
      message: "Consulta de búsqueda creada: ",
      search_id: result.insertId,
    });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Error al crear la consulta de búsqueda", error });
  }
}

async function getSearchQueriesPost(req, res) {
  try {
    const postgres = "SELECT * FROM search_queries";
    const queries = await queryPostgresql(postgres);
    res.json(queries);
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Error al obtener las consultas de búsqueda", error });
  }
}

// Endpoints para resultados de búsqueda en PostgreSQL
async function createSearchResultPost(req, res) {
  const { search_id, title, description, url } = req.body;
  try {
    const postgres =
      "INSERT INTO search_results (search_id, title, description, url) VALUES ($1, $2, $3, $4)";
    const result = await queryPostgresql(postgres, [
      search_id,
      title,
      description,
      url,
    ]);
    res.json({
      message: "Resultado de búsqueda creado",
      result_id: result.insertId,
    });
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el resultado", error });
  }
}

async function getSearchResultsPost(req, res) {
  try {
    const postgres = "SELECT * FROM search_results";
    const results = await queryPostgresql(postgres);
    res.json(results);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los resultados", error });
  }
}

// Exportar los endpoints
module.exports = {
  Ejemplo,
  createUser,
  getUsers,
  createSearchQuery,
  getSearchQueries,
  createSearchResult,
  getSearchResults,
  createUserPost,
  getUsersPost,
  createSearchQueryPost,
  getSearchQueriesPost,
  createSearchResultPost,
  getSearchResultsPost,
};
