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

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
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
  const { user_id, query: searchQuery } = req.body; // Renombrar aquí

  // Verificar si la consulta contiene palabras prohibidas
  const forbiddenWords = ["TERRORISMO"];
  const containsForbiddenWord = forbiddenWords.some(
    (word) => searchQuery.toUpperCase().includes(word) // Cambiar a "searchQuery"
  );

  if (containsForbiddenWord) {
    return res
      .status(400)
      .send({ msg: "La consulta contiene palabras prohibidas." });
  }

  try {
    const sql = "INSERT INTO search_queries (user_id, query) VALUES (?, ?)";
    const result = await query(sql, [user_id, searchQuery]); // Cambiar a "searchQuery"
    res.json({
      message: "Consulta de búsqueda creada: ",
      search_id: result.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      msg: "Error al crear la consulta de búsqueda",
      error: error.message,
    });
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
  const { user_id, query } = req.body || {}; // Evita errores si req.body es undefined

  if (!user_id || !query) {
    return res
      .status(400)
      .send({ msg: "user_id y query son campos requeridos" });
  }

  // Verificar si la consulta contiene palabras prohibidas
  const forbiddenWords = [
    "TERRORISMO",
    "VIOLENCIA",
    "EXTREMISMO",
    "ARMAS",
    "ODIO",
    "ATENTADO",
    "ASESINATO",
    "BOMBA",
    "NARCOTRAFICO",
    "PORNO",
    "TERROR\\s*ISMO",
    "EXTR\\s*EMISMO",
    "ASESINATO",
    "AR\\s*MAS",
    "OD\\s*IO",
  ];

  function containsForbiddenWord(query) {
    return forbiddenWords.some((word) => new RegExp(word, "i").test(query));
  }

  if (containsForbiddenWord(searchQuery)) {
    return res
      .status(400)
      .send({ msg: "La consulta contiene palabras prohibidas." });
  }

  try {
    const postgres =
      "INSERT INTO search_queries (user_id, query) VALUES ($1, $2)";
    const result = await queryPostgresql(postgres, [user_id, query]);
    res.json({
      message: "Consulta de búsqueda creada",
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

// Lista de palabras prohibidas
const forbiddenWords = [
  "TERRORISMO",
  "VIOLENCIA",
  "EXTREMISMO",
  "ARMAS",
  "ODIO",
  "ATENTADO",
  "ASESINATO",
  "BOMBA",
  "NARCOTRAFICO",
  "PORNO",
  "TERROR\\s*ISMO",
  "EXTR\\s*EMISMO",
  "ASE\\s*SINATO",
  "AR\\s*MAS",
  "OD\\s*IO",
];

// Función para verificar si una descripción contiene palabras prohibidas
function containsForbiddenWord(text) {
  return forbiddenWords.some((word) => new RegExp(word, "i").test(text));
}

async function querysearchPost(req, res) {
  try {
    const { description } = req.query;
    const normalizedDescription = description ? description.trim() : null;

    // Verificar si contiene palabras prohibidas
    if (normalizedDescription && containsForbiddenWord(normalizedDescription)) {
      return res
        .status(400)
        .send({ msg: "La consulta contiene palabras prohibidas." });
    }

    let baseQuery = "SELECT * FROM search_results";
    const params = [];

    if (normalizedDescription) {
      console.log(`Descripción recibida: ${normalizedDescription}`);
      baseQuery += ` WHERE description LIKE $1`;
      params.push(`%${normalizedDescription}%`);
    }

    const results = await queryPostgresql(baseQuery, params);
    res.status(200).json({
      data: results,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ msg: "Error en el servidor", error });
  }
}

// Exportar los endpoints
module.exports = {
  Ejemplo,
  //createUser,
  getUsers,
  //createSearchQuery,
  getSearchQueries,
  //createSearchResult,
  getSearchResults,
  //createUserPost,
  getUsersPost,
  //createSearchQueryPost,
  getSearchQueriesPost,
  //createSearchResultPost,
  getSearchResultsPost,
  querysearchPost,
};
