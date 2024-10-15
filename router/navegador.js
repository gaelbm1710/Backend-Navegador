const express = require("express");
const NavegadorController = require("../controllers/navegador");

const api = express.Router();

//Rutas
//Ejemplo de Ruta
api.get("/ejemplo", NavegadorController.Ejemplo);

module.exports = api;
