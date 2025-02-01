const Pais = require("../models/Pais");

// Obtener todos los países
exports.getPaises = async (req, res) => {
    try {
        const paises = await Pais.find();
        res.json(paises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo país con validación de duplicados
exports.createPais = async (req, res) => {
    try {
        const { nombre } = req.body;

        // Normalizar el nombre (trim y minúsculas)
        const nombreNormalizado = nombre.trim().toLowerCase();

        // Verificar si el país ya existe (búsqueda insensible a mayúsculas)
        const paisExistente = await Pais.findOne({ nombre: new RegExp(`^${nombreNormalizado}$`, "i") });

        if (paisExistente) {
            return res.status(400).json({ message: "El país ya está registrado." });
        }

        // Crear el nuevo país
        const nuevoPais = new Pais({ nombre: nombreNormalizado });
        await nuevoPais.save();

        console.log(`Nuevo país creado: ${nuevoPais.nombre}`);
        res.status(201).json(nuevoPais);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};