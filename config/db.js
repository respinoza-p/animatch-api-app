const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Intenta conectar a la base de datos MongoDB usando la URI almacenada en las variables de entorno
    await mongoose.connect(process.env.MONGODB_URI);
    // Muestra un mensaje en la consola si la conexión es exitosa
    console.log("Conectado a MongoDB");
  } catch (error) {
    // Muestra el error en la consola si la conexión falla
    console.error(error);
    // Termina el proceso con un código de error
    process.exit(1);
  }
};

// Exporta la función connectDB para que pueda ser utilizada en otros archivos
module.exports = connectDB;