const { Router } = require("express");
const recipeRouter = require("../routes/recipe");
const dietsRouter = require("../routes/diets");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipeRouter);
router.use("/diets", dietsRouter);

module.exports = router;
