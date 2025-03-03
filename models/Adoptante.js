import mongoose from 'mongoose';

const adoptanteSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true, trim: true, lowercase: true },
  componenHogar: { type: mongoose.Schema.Types.ObjectId, ref: 'ComponenHogar', required: true },
  fraseIdentifica: { type: mongoose.Schema.Types.ObjectId, ref: 'FraseIdentifica', required: true }, 
  porqueDeseaAdoptar: { type: mongoose.Schema.Types.ObjectId, ref: 'PorqueDeseaAdoptar', required: true },
  alergiaEnfermedad: { type: mongoose.Schema.Types.ObjectId, ref: 'AlergiaEnfermedad', required: true },
  haTenidoAnimales: { type: mongoose.Schema.Types.ObjectId, ref: 'HaTenidoAnimales', required: true },
  actualmenteTengo: { type: mongoose.Schema.Types.ObjectId, ref: 'ActualmenteTengo', required: true },
  tamAnimal: { type: mongoose.Schema.Types.ObjectId, ref: 'TamanioAnimal', required: true },
  edadAnimal: { type: mongoose.Schema.Types.ObjectId, ref: 'EdadAnimal', required: true },
  opinionEsteriliza: { type: mongoose.Schema.Types.ObjectId, ref: 'OpinionEsteriliza', required: true },
  dispuestoAdoptar: { type: mongoose.Schema.Types.ObjectId, ref: 'DispuestoAdoptar', required: true },
  vivoEn: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoViviendaAnimal', required: true },
  presupuestoMensual: { type: mongoose.Schema.Types.ObjectId, ref: 'PresupuestoMensual', required: true },
  paseosAnimal: { type: mongoose.Schema.Types.ObjectId, ref: 'PaseosAnimal', required: true },
  tiempoSoledadAnimal: { type: mongoose.Schema.Types.ObjectId, ref: 'TiempoSoledadAnimal', required: true },
}, { timestamps: true });

const Adoptante = mongoose.model('Adoptante', adoptanteSchema);
export default Adoptante;