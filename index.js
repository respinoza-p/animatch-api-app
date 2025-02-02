const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Inicialización de Express
const app = express();
const PORT = process.env.PORT || 5001;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de Swagger con OAuth2 y definición de Países y Regiones
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API ANIMATCH",
      version: "1.0.0",
      description: "Documentación de la API ANIMATCH 🐶",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        oauth2: {
          type: "oauth2",
          flows: {
            authorizationCode: {
              authorizationUrl: "https://auth.animatch.com/oauth/authorize",
              tokenUrl: "https://auth.animatch.com/oauth/token",
              scopes: {
                read: "Permite leer datos",
                write: "Permite escribir datos",
              },
            },
          },
        },
      },
      schemas: {
        Pais: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID único del país" },
            nombre: { type: "string", description: "Nombre del país" },
            fechaRegistro: { type: "string", format: "date-time", description: "Fecha de registro" },
            estado: { type: "integer", enum: [0, 1], description: "Estado del país (0: inactivo, 1: activo)" },
          },
          required: ["nombre"],
        },
        Region: {
          type: "object",
          properties: {
            id: { type: "string", description: "ID único de la región" },
            nombre: { type: "string", description: "Nombre de la región" },
            estado: { type: "integer", enum: [0, 1], description: "Estado de la región (0: inactivo, 1: activo)" },
            pais: { type: "string", description: "ID del país al que pertenece" },
          },
          required: ["nombre", "pais"],
        },
      },
    },
    security: [{ oauth2: ["read", "write"] }],
  },
  apis: ["./routes/*.js"], // Ruta a los archivos de rutas
};

// Generar la documentación Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Endpoint para la documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/pais", require("./routes/pais"));
app.use("/api/region", require("./routes/region"));
app.use("/api/comuna", require("./routes/comuna"));
app.use("/api/sexoAnimal", require("./routes/sexoAnimal"));
app.use("/api/estadoVacuna", require("./routes/estadoVacuna"));
app.use("/api/tamanioAnimal", require("./routes/tamanioAnimal"));
app.use("/api/usoChip", require("./routes/usoChip"));
app.use("/api/tipoAlimentacion", require("./routes/tipoAlimentacion"));

// Mostrar enlaces de la API en la consola
const showApiLinks = (port) => {
  console.log("\n📌 API disponible en las siguientes rutas:");
  console.log(`🔹 Países:`);
  console.log(`   - GET  -> http://localhost:${port}/api/pais`);
  console.log(`   - POST -> http://localhost:${port}/api/pais`);
  console.log(`🔹 Regiones:`);
  console.log(`   - GET  -> http://localhost:${port}/api/region`);
  console.log(`   - POST -> http://localhost:${port}/api/region`);
  console.log(`🔹 Comunas:`);
  console.log(`   - GET  -> http://localhost:${port}/api/comuna`);
  console.log(`   - POST -> http://localhost:${port}/api/comuna`);
  console.log(`🔹 Sexo del animal:`);
  console.log(`   - GET  -> http://localhost:${port}/api/sexoAnimal`);
  console.log(`   - POST -> http://localhost:${port}/api/sexoAnimal`);
  console.log(`🔹 Estado de vacunas del animal`);
  console.log(`   - GET  -> http://localhost:${port}/api/estadoVacuna`);
  console.log(`   - POST -> http://localhost:${port}/api/estadoVacuna`);
  console.log(`🔹 Tamaños posibles del animal`);
  console.log(`   - GET  -> http://localhost:${port}/api/tamanioAnimal`);
  console.log(`   - POST -> http://localhost:${port}/api/tamanioAnimal`);
  console.log(`🔹 Estado para el uso de chip del animal`);
  console.log(`   - GET  -> http://localhost:${port}/api/usoChip`);
  console.log(`   - POST -> http://localhost:${port}/api/usoChip`);
  console.log(`🔹 Tipos de alimentación del animal`);
  console.log(`   - GET  -> http://localhost:${port}/api/tipoAlimentacion`);
  console.log(`   - POST -> http://localhost:${port}/api/tipoAlimentacion`);  
  console.log(`🔹 Documentación Swagger:`);
  console.log(`   - http://localhost:${port}/api-docs\n`);  
};

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  showApiLinks(PORT);
});