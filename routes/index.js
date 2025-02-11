const express = require("express");
const router = express.Router();

// Definir todas las rutas de la API
const authRoutes = require("./auth");
const paisRoutes = require("./pais");
const regionRoutes = require("./region");
const comunaRoutes = require("./comuna");
const sexoAnimalRoutes = require("./sexoAnimal");
const estadoVacunaRoutes = require("./estadoVacuna");
const tamanioAnimalRoutes = require("./tamanioAnimal");
const usoChipRoutes = require("./usoChip");
const tipoAlimentacionRoutes = require("./tipoAlimentacion");
const tipoActividadRoutes = require("./tipoActividad");
const caracterAnimalRoutes = require("./caracterAnimal");
const tipoEntrenamientoRoutes = require("./tipoEntrenamiento");
const tipoCuidadosRoutes = require("./tipoCuidados");
const estadoReproductivoRoutes = require("./estadoReproductivo");
const razaRoutes = require("./raza");
const ejercicioAnimalRoutes = require("./ejercicioAnimal");
const problemaComportamientoRoutes = require("./problemaComportamiento");
const tipoViviendaAnimalRoutes = require("./tipoViviendaAnimal");
const pelechaCaspaRoutes = require("./pelechaCaspa");

// Usar todas las rutas
router.use("/auth", authRoutes);
router.use("/pais", paisRoutes);
router.use("/region", regionRoutes);
router.use("/comuna", comunaRoutes);
router.use("/sexoAnimal", sexoAnimalRoutes);
router.use("/estadoVacuna", estadoVacunaRoutes);
router.use("/tamanioAnimal", tamanioAnimalRoutes);
router.use("/usoChip", usoChipRoutes);
router.use("/tipoAlimentacion", tipoAlimentacionRoutes);
router.use("/tipoActividad", tipoActividadRoutes);
router.use("/caracterAnimal", caracterAnimalRoutes);
router.use("/tipoEntrenamiento", tipoEntrenamientoRoutes);
router.use("/tipoCuidados", tipoCuidadosRoutes);
router.use("/estadoReproductivo", estadoReproductivoRoutes);
router.use("/raza", razaRoutes);
router.use("/ejercicioAnimal", ejercicioAnimalRoutes);
router.use("/problemaComportamiento", problemaComportamientoRoutes);
router.use("/tipoViviendaAnimal", tipoViviendaAnimalRoutes);
router.use("/pelechaCaspa", pelechaCaspaRoutes);

module.exports = router;