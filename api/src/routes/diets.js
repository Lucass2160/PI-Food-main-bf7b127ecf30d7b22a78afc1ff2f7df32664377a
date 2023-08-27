const { Router } = require("express");
const { getDietsHandler } = require("../handlers/diets");
const dietsRouter = Router();

dietsRouter.get("/", getDietsHandler);

module.exports = dietsRouter;
