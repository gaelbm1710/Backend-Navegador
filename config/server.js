const express = require('express');
const bodyParser = require('body-parser');
const { sql, poolPromise } = require('./db').default;
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');
const sequelize = require('./db').default; // Este es tu archivo de configuración de la DB
require('dotenv').config();

app.use(express.json()); // Middleware para analizar JSON
app.use(bodyParser.json());
app.use('/users', userRoutes);  // Endpoints para usuarios
app.use('/search', searchRoutes);  // Endpoints para consultas y resultados de búsqueda
app.use('/api', userRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('API de Navegador está corriendo');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

// Rutas para manejar usuarios 
app.get('/users', async (req, res) => {
    // ...
});

app.get('/users/:id', async (req, res) => {
    // ...
});

app.post('/users', async (req, res) => {
    // ...
});

app.put('/users/:id', async (req, res) => {
    // ...
});

app.delete('/users/:id', async (req, res) => {
    // ...
});

// Conectar a la base de datos y arrancar el servidor
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor corriendo en http://localhost:3000');
    });
}).catch(err => {
    console.error('Error conectando a la base de datos: ', err);
});