const express = require("express");
const NavegadorController = require("../controllers/navegador");

const api = express.Router();

//Ejemplo de Ruta
api.get("/ejemplo", NavegadorController.Ejemplo);

//Rutas con MYSQL
//Ususarios:
api.post("/mysqlusuario", NavegadorController.createUser);
api.get("/mysqlusuario", NavegadorController.getUsers);
//Consultas:
api.post("/mysqlconsultas", NavegadorController.createSearchQuery);
api.get("/mysqlconsultas", NavegadorController.getSearchQueries);
//Resultados:
api.post("/mysqlresultados", NavegadorController.createSearchResult);
api.get("/mysqlresultados", NavegadorController.getSearchResults);

//Rutas con PostgreSQL
//Ususarios:
api.post("/postusuario", NavegadorController.createUserPost);
api.get("/postusuario", NavegadorController.getUsersPost);
//Consultas:
api.post("/postconsultas", NavegadorController.createSearchQueryPost);
api.get("/postconsultas", NavegadorController.getSearchQueriesPost);
//Resultados:
api.post("/postresultados", NavegadorController.createSearchResultPost);
api.get("/postresultados", NavegadorController.getSearchResultsPost);

module.exports = api;
