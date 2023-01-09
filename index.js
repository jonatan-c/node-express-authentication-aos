
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

// Crear el servidor de express
const app = express();

// Base de datos
const db = require("./src/models/Relations");
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// CORS
app.use(cors())
// MORGAN
app.use(morgan('dev'));

// Directorio Público
// app.use( express.static('public') );
const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes");

// Lectura y parseo del body
app.use( express.json() );

// Rutas
// app.use('/api/auth', require('./routes/auth') );
// app.use('/api/events', require('./routes/events') );
app.use("/api/register", userRoutes);
app.use("/api/auth", authRoutes);





// Escuchar peticiones
app.listen( process.env.PORT || 3000, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});
