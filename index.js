const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");

// Inicialización de Express
const app = express();
const PORT = process.env.PORT || 5001;

// Conectar a la base de datos
connectDB();

// Configuración de CORS con orígenes permitidos desde .env
const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : ["*"];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(morgan("dev"));

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API ANIMATCH",
      version: "1.0.0",
      description: "Documentación de la API ANIMATCH 🐶",
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: "Servidor local" },
      { url: "https://animatch-api-app.vercel.app", description: "Servidor en producción" }
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
      },
    },
    security: [{ oauth2: ["read", "write"] }],
  },
  apis: ["./routes/*.js"],
};

// Generar la documentación Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Cargar rutas desde un archivo separado
const routes = require("./routes");
app.use("/api", routes);

// Middleware para manejar errores globales
app.use((err, req, res, next) => {
  console.error("Error no manejado:", err);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📌 Documentación Swagger: http://localhost:${PORT}/api-docs`);
});