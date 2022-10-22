const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  getSuperheroes,
  postSuperhero,
  updateSuperhero,
} = require("../controllers/superheroController");
const { getVehicle } = require("../controllers/vehicleController");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/vehicles", getVehicle);
router.get("/superheroes", getSuperheroes);
router.post("/superheroes", postSuperhero);
router.put("/superheroes/:id", updateSuperhero);

module.exports = router;
