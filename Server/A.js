const express = require('express');
const app = express();
const port = 1433;

// Configuración de la base de datos
const sql = require('mssql');

const config = {
  server: 'lpdu.database.windows.net',
  database: 'DB_Cliente',
  user: 'AngelLpdu',
  password: 'Narvarez1905',
  port: 1433,
  encrypt: true,
  trustServerCertificate: false,
};

// Ruta de ejemplo para consultar la base de datos
app.get('/consulta-db', async (req, res) => {
  try {
    // Conectar a la base de datos
    await sql.connect(config);

    // Realizar la consulta
    const result = await sql.query('SELECT * FROM Tb_Persona');

    // Devolver los resultados como respuesta
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  } finally {
    // Cerrar la conexión a la base de datos
    await sql.close();
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});
