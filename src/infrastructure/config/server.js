const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database'); // Importa la conexión a la base de datos
const userRoutes = require('../webserver/routes/userRoutes');
const dashboardRoutes = require('../webserver/routes/dashboardRoutes');
const clientRoutes = require('../webserver/routes/clientRoutes');
//const loanRoutes = require('../webserver/routes/loanRoutes');

// Crear instancia de Express
const app = express();

// Middlewares
app.use(cors()); // Permite solicitudes desde otros dominios
app.use(bodyParser.json()); // Para analizar JSON en el cuerpo de las solicitudes

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/clients', clientRoutes); // Cambiado para que monte directamente en /api/clients
//app.use('/api/loans', loanRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
