const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

// Inicialización de Express
const app = express();
const PORT = process.env.PORT || 5001;

// Conectar a la base de datos
connectDB();

// 🔹 Configurar CORS con orígenes desde .env
const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true // Permite cookies y headers de autenticación
}));

// 🔹 Middleware para manejar preflight requests
app.options("*", cors());

// Middleware JSON y logs
app.use(express.json());
app.use(morgan("dev"));

// 🔹 Medidas de Seguridad
// 1. Helmet para cabeceras HTTP seguras (desactivamos CSP para mantener compatibilidad con Swagger UI)
app.use(helmet({ contentSecurityPolicy: false }));

// 2. Sanitizar req.body, req.query y req.params para prevenir NoSQL Injection
app.use(mongoSanitize());

// 3. Limitador de peticiones (Rate Limiter) contra ataques de fuerza bruta / DoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 solicitudes por IP
  message: { message: "Demasiadas peticiones desde esta IP, por favor intente de nuevo más tarde." }
});
app.use("/api", limiter);

// 🔹 Middleware Global para CORS en las respuestas
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Rutas y documentación Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "API ANIMATCH", version: "1.0.0", description: "Documentación de la API ANIMATCH 🐶" },
    servers: [{ url: `http://localhost:${PORT}` }, { url: "https://animatch-api-app.vercel.app" }],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Cargar rutas
const routes = require("./routes");
app.use("/api", routes);

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  console.log(`📌 Swagger en http://localhost:${PORT}/api-docs`);
});