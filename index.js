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

// Generación dinámica de rutas Swagger para las tablas maestras/lookups
const swaggerPaths = {};

const lookupRoutes = [
  { path: "/pais", tag: "Maestro: País" },
  { path: "/region", tag: "Maestro: Región" },
  { path: "/comuna", tag: "Maestro: Comuna" },
  { path: "/sexoAnimal", tag: "Maestro: Sexo Animal" },
  { path: "/estadoVacuna", tag: "Maestro: Estado Vacuna" },
  { path: "/tamanioAnimal", tag: "Maestro: Tamaño Animal" },
  { path: "/usoChip", tag: "Maestro: Uso Chip" },
  { path: "/tipoAlimentacion", tag: "Maestro: Tipo Alimentación" },
  { path: "/tipoActividad", tag: "Maestro: Tipo Actividad" },
  { path: "/caracterAnimal", tag: "Maestro: Carácter Animal" },
  { path: "/tipoEntrenamiento", tag: "Maestro: Tipo Entrenamiento" },
  { path: "/tipoCuidados", tag: "Maestro: Tipo Cuidados" },
  { path: "/estadoReproductivo", tag: "Maestro: Estado Reproductivo" },
  { path: "/raza", tag: "Maestro: Raza" },
  { path: "/ejercicioAnimal", tag: "Maestro: Ejercicio Animal" },
  { path: "/problemaComportamiento", tag: "Maestro: Problema Comportamiento" },
  { path: "/tipoViviendaAnimal", tag: "Maestro: Tipo Vivienda Animal" },
  { path: "/pelechaCaspa", tag: "Maestro: Pelecha Caspa" },
  { path: "/edadAnimal", tag: "Maestro: Edad Animal" },
  { path: "/relacionOtrosAnimales", tag: "Maestro: Relación Otros Animales" },
  { path: "/humano/componenHogar", tag: "Maestro Humano: Componentes del Hogar" },
  { path: "/humano/fraseIdentifica", tag: "Maestro Humano: Frase Identificativa" },
  { path: "/humano/porqueDeseaAdoptar", tag: "Maestro Humano: Por qué Desea Adoptar" },
  { path: "/humano/alergiaEnfermedad", tag: "Maestro Humano: Alergia o Enfermedad" },
  { path: "/humano/haTenidoAnimales", tag: "Maestro Humano: Ha Tenido Animales" },
  { path: "/humano/actualmenteTengo", tag: "Maestro Humano: Actualmente Tengo" },
  { path: "/humano/opinionEsteriliza", tag: "Maestro Humano: Opinión Esterilización" },
  { path: "/humano/dispuestoAdoptar", tag: "Maestro Humano: Dispuesto a Adoptar" },
  { path: "/humano/vivoEn", tag: "Maestro Humano: Vivo En" },
  { path: "/humano/presupuestoMensual", tag: "Maestro Humano: Presupuesto Mensual" },
  { path: "/humano/paseosAnimal", tag: "Maestro Humano: Paseos Animal" },
  { path: "/humano/tiempoSoledadAnimal", tag: "Maestro Humano: Tiempo Soledad Animal" },
  { path: "/adopcion/estanDeAcuerdoAdopcion", tag: "Maestro Adopción: Acuerdo Adopción" },
  { path: "/adopcion/comoPaseaAnimal", tag: "Maestro Adopción: Cómo Pasea Animal" },
  { path: "/adopcion/periodoVacaciones", tag: "Maestro Adopción: Periodo Vacaciones" },
  { path: "/adopcion/cambioDomicilio", tag: "Maestro Adopción: Cambio Domicilio" },
  { path: "/adopcion/herenciaAnimal", tag: "Maestro Adopción: Herencia Animal" },
  { path: "/adopcion/seguridadVivienda", tag: "Maestro Adopción: Seguridad Vivienda" },
  { path: "/adopcion/propiedadVivienda", tag: "Maestro Adopción: Propiedad Vivienda" },
  { path: "/adopcion/recursosUrgencia", tag: "Maestro Adopción: Recursos Urgencia" },
  { path: "/adopcion/medidasComportamiento", tag: "Maestro Adopción: Medidas Comportamiento" },
  { path: "/adopcion/nuevoIntegranteFamiliar", tag: "Maestro Adopción: Nuevo Integrante Familiar" },
  { path: "/adopcion/compromisosAdoptante", tag: "Maestro Adopción: Compromisos Adoptante" },
  { path: "/adopcion/contactoConRescatistas", tag: "Maestro Adopción: Contacto Con Rescatistas" }
];

for (const route of lookupRoutes) {
  swaggerPaths[route.path] = {
    get: {
      summary: `Obtener opciones de ${route.tag}`,
      tags: [route.tag],
      responses: {
        200: {
          description: "Lista de opciones obtenida con éxito",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: { type: "string" },
                    valor: { type: "string" },
                    estado: { type: "number" }
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      summary: `Crear nueva opción de ${route.tag}`,
      tags: [route.tag],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["valor"],
              properties: {
                valor: { type: "string", example: "Ejemplo" }
              }
            }
          }
        }
      },
      responses: {
        201: { description: "Creado exitosamente" },
        400: { description: "Opción duplicada o formato inválido" },
        401: { description: "No autorizado" }
      }
    }
  };
}

// Rutas personalizadas adicionales
swaggerPaths["/registroAnimal"] = {
  post: {
    summary: "Registrar una nueva mascota",
    tags: ["Mascotas / Animales"],
    security: [{ bearerAuth: [] }],
    description: "Registra una mascota con sus características y fotos.",
    responses: {
      201: { description: "Mascota registrada exitosamente" },
      401: { description: "No autorizado" }
    }
  }
};

// Rutas y documentación Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "API ANIMATCH", version: "1.0.0", description: "Documentación de la API ANIMATCH 🐶" },
    servers: [{ url: `http://localhost:${PORT}` }, { url: "https://animatch-api-app.vercel.app" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    paths: swaggerPaths
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