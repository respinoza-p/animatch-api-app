const express = require("express");
const router = express.Router();

// Servicios comunes
const authRoutes = require("./auth");
const paisRoutes = require("./pais");
const regionRoutes = require("./region");
const comunaRoutes = require("./comuna");

// Servicios para animal
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
const edadAnimal = require("./edadAnimal");

// Servicios para humanos
const componenHogar = require("./componenHogar");
const fraseIdentifica = require("./fraseIdentifica");
const porqueDeseaAdoptar = require("./porqueDeseaAdoptar");
const alergiaEnfermedad = require("./alergiaEnfermedad");
const haTenidoAnimales = require("./haTenidoAnimales");
const actualmenteTengo = require("./actualmenteTengo");
const opinionEsteriliza = require("./opinionEsteriliza");
const dispuestoAdoptar = require("./dispuestoAdoptar");
const vivoEn = require("./vivoEn");
const presupuestoMensual = require("./presupuestoMensual");
const paseosAnimal = require("./paseosAnimal");
const tiempoSoledadAnimal = require("./tiempoSoledadAnimal");

// Servicios para el formulario de adopcion
const estanDeAcuerdoAdopcion = require("./estanDeAcuerdoAdopcion");
const comoPaseaAnimal = require("./comoPaseaAnimal");
const periodoVacaciones = require("./periodoVacaciones");
const cambioDomicilio = require("./cambioDomicilio");
const herenciaAnimal = require("./herenciaAnimal");
const seguridadVivienda = require("./seguridadVivienda");
const propiedadVivienda = require("./propiedadVivienda");
const recursosUrgencia = require("./recursosUrgencia");
const medidasComportamiento = require("./medidasComportamiento");
const nuevoIntegranteFamiliar = require("./nuevoIntegranteFamiliar");

// Rutas servicios comunes
router.use("/auth", authRoutes);
router.use("/pais", paisRoutes);
router.use("/region", regionRoutes);
router.use("/comuna", comunaRoutes);

// Rutas servicios para animal
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
router.use("/edadAnimal", edadAnimal);

// Rutas servicios humano
router.use("/humano/componenHogar", componenHogar);
router.use("/humano/fraseIdentifica", fraseIdentifica);
router.use("/humano/porqueDeseaAdoptar", porqueDeseaAdoptar);
router.use("/humano/alergiaEnfermedad", alergiaEnfermedad);
router.use("/humano/haTenidoAnimales", haTenidoAnimales);
router.use("/humano/actualmenteTengo", actualmenteTengo);
router.use("/humano/opinionEsteriliza", opinionEsteriliza);
router.use("/humano/dispuestoAdoptar", dispuestoAdoptar);
router.use("/humano/vivoEn", vivoEn);
router.use("/humano/presupuestoMensual", presupuestoMensual);
router.use("/humano/paseosAnimal", paseosAnimal);
router.use("/humano/tiempoSoledadAnimal", tiempoSoledadAnimal);

// Rutas servicios para formulario de adopcion
router.use("/adopcion/estanDeAcuerdoAdopcion", estanDeAcuerdoAdopcion);
router.use("/adopcion/comoPaseaAnimal", comoPaseaAnimal);
router.use("/adopcion/periodoVacaciones", periodoVacaciones);
router.use("/adopcion/cambioDomicilio", cambioDomicilio);
router.use("/adopcion/herlenciaAnima", herenciaAnimal);
router.use("/adopcion/seguridadVivienda", seguridadVivienda);
router.use("/adopcion/propiedadVivienda", propiedadVivienda);
router.use("/adopcion/recursosUrgencia", recursosUrgencia);
router.use("/adopcion/medidasComportamiento", medidasComportamiento);
router.use("/adopcion/nuevoIntegranteFamiliar", nuevoIntegranteFamiliar);

module.exports = router;