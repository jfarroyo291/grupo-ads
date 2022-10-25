require("dotenv").config();
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const { Superhero, Vehicle } = require("../db");
const allSuperheroes = require("../../allSuperhero.json");

const uploadSuperheroes = async (req, res) => {
  try {
    const superheroName = allSuperheroes.map((s) => {
      return {
        name: s.name,
        fullName: s.biography.fullName,
        intelligence: s.powerstats.intelligence,
        speed: s.powerstats.speed,
        power: s.powerstats.power,
        combat: s.powerstats.combat,
        location: s.work.base,
        vehicle: s.biography.vehicles,
        image: s.images.md,
      };
    });
    if ((await Superhero.count()) === 0) {
      Superhero.bulkCreate(superheroName);
    }
    console.log("Los superheroes fueron cargados a la bd!");
  } catch {
    console.log("Superheroes could not be uploaded to the database.");
  }
};

const getSuperheroes = async (req, res, next) => {
  const { name, location } = req.query;
  if (name || location) {
    try {
      let search = await Superhero.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${name}` } },
            { location: { [Op.iLike]: `%${location}` } },
          ],
        },
      });
      if (search.length === 0) {
        return res.status(404).send("Not found");
      }
      return res.status(200).send(search);
    } catch {
      //next(error);
      res.status(400).send("SORRY!! Something went wrong in your search!");
    }
  } else {
    try {
      const superheroesTotal = await Superhero.findAll({
        limit: 500,
      });
      res.status(200).send(superheroesTotal);
    } catch {
      res.status(404).send("SORRY!! Something went wrong with the superheroes");
    }
  }
};

const postSuperhero = async (req, res, next) => {
  try {
    const {
      name,
      fullName,
      intelligence,
      speed,
      power,
      combat,
      location,
      vehicle,
      image,
    } = req.body;
    if (name) {
      let getVehicleDB = await Vehicle.findAll({
        where: { name: vehicle },
      });
      let vehicleNameDB = getVehicleDB.map((a) => {
        return a.dataValues.name;
      });
      //console.log(getVehicleDB);
      const newSuperhero = await Superhero.create({
        name,
        fullName,
        intelligence,
        speed,
        power,
        combat,
        location,
        image,
      });
      newSuperhero.addVehicle(getVehicleDB);
      return res.status(200).send(newSuperhero);
    }
  } catch {
    //next(error);
    res.status(404).send("SORRY!! Something went wrong in create superhero.");
  }
};

const updateSuperhero = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id) {
      const { name, location } = req.body;
      const updatedSuperhero = await Superhero.update(
        {
          name,
          location,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).send(updatedSuperhero);
    }
  } catch {
    res.status(404).send("SORRY!! Something went wrong in update superhero.");
  }
};

module.exports = {
  uploadSuperheroes,
  getSuperheroes,
  postSuperhero,
  updateSuperhero,
};
