const express = require("express");
const NavegadorController = require("../controllers/navegador");

const api = express.Router();

//Rutas
//Ejemplo de Ruta
api.get("/ejemplo", NavegadorController.Ejemplo);

//Ususarios:
api.post("/usuario", NavegadorController.createUser);
api.get("/usuario", NavegadorController.getUsers);
//Consultas:
api.post("/consultas", NavegadorController.createSearchQuery);
api.get("/consultas", NavegadorController.getSearchQueries);
//Resultados:
api.post("/resultados", NavegadorController.createSearchResult);
api.get("/resultados", NavegadorController.getSearchResults);

module.exports = api;
