const express = require("express");
const { api_Version } = require("./constants");
const app = express();
const cors = require("cors");

//Rutas
const navegadorRoutes = require("./router/navegador");

//Cors
app.use(cors());

// Configurar Rutas
app.use(`/api/${api_Version}`, navegadorRoutes);

module.exports = app;
