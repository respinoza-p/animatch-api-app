const Adoptante = require("../models/Adoptante");

const createRegistroAdoptante = async (req, res) => {
  try {
    const {
      correo,
      componenHogar,
      fraseIdentifica,
      porqueDeseaAdoptar,
      alergiaEnfermedad,
      haTenidoAnimales,
      actualmenteTengo,
      tamAnimal,
      edadAnimal,
      opinionEsteriliza,
      dispuestoAdoptar,
      vivoEn,
      presupuestoMensual,
      paseosAnimal,
      tiempoSoledadAnimal
    } = req.body;

    // Verificar si ya existe un registro con el mismo correo
    const existeRegistro = await Adoptante.findOne({ correo });

    if (existeRegistro) {
      // Actualizar el registro existente
      const registroActualizado = await Adoptante.findOneAndUpdate(
        { correo },
        {
          componenHogar,
          fraseIdentifica,
          porqueDeseaAdoptar,
          alergiaEnfermedad,
          haTenidoAnimales,
          actualmenteTengo,
          tamAnimal,
          edadAnimal,
          opinionEsteriliza,
          dispuestoAdoptar,
          vivoEn,
          presupuestoMensual,
          paseosAnimal,
          tiempoSoledadAnimal
        },
        { new: true } // Retorna el documento actualizado
      );

      return res.status(200).json({ message: 'Registro actualizado exitosamente', data: registroActualizado });
    }

    // Crear un nuevo registro si no existe
    const nuevoRegistro = new Adoptante({
      correo,
      componenHogar,
      fraseIdentifica,
      porqueDeseaAdoptar,
      alergiaEnfermedad,
      haTenidoAnimales,
      actualmenteTengo,
      tamAnimal,
      edadAnimal,
      opinionEsteriliza,
      dispuestoAdoptar,
      vivoEn,
      presupuestoMensual,
      paseosAnimal,
      tiempoSoledadAnimal
    });

    // Guardar en la base de datos
    await nuevoRegistro.save();
    
    return res.status(201).json({ message: 'Registro guardado exitosamente', data: nuevoRegistro });
  } catch (error) {
    console.error('Error al crear o actualizar el registro del adoptante:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getRegistroAdoptante = async (req, res) => {
  try {
    const { correo } = req.params;

    const registro = await Adoptante.findOne({ correo })
      .populate('componenHogar')
      .populate('fraseIdentifica')
      .populate('porqueDeseaAdoptar')
      .populate('alergiaEnfermedad')
      .populate('haTenidoAnimales')
      .populate('actualmenteTengo')
      .populate('tamAnimal')
      .populate('edadAnimal')
      .populate('opinionEsteriliza')
      .populate('dispuestoAdoptar')
      .populate('vivoEn')
      .populate('presupuestoMensual')
      .populate('paseosAnimal')
      .populate('tiempoSoledadAnimal');

    if (!registro) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    return res.status(200).json({ data: registro });
  } catch (error) {
    console.error('Error al obtener el registro del adoptante:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
    createRegistroAdoptante,
    getRegistroAdoptante
  };