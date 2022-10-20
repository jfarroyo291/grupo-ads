require("dotenv").config();
const { Vehicle } = require("../db");
const allVehicles = require("../../vehicles.json");

const uploadVehicles = async () => {
  try {
    const vehicleName = allVehicles.map((v) => {
      return {
        name: v.name,
      };
    });
    if ((await Vehicle.count()) === 0) {
      Vehicle.bulkCreate(vehicleName);
    }
    console.log("Los vehículos fueron cargados a la bd!");
  } catch {
    console.log("Vehiculos could not be uploaded to the database.");
  }
};

const getVehicle = async (req, res) => {
  try {
    /* vehicleName.forEach((vehicle) => {
      Vehicle.findAll({
        where: { name: vehicle.name },
      });
    }); */
    // console.log(vehicleName);
    const vehicleTotal = await Vehicle.findAll();
    res.status(200).send(vehicleTotal);
  } catch {
    res.status(404).send("SORRY!! Something went wrong with the vehicles");
  }
};

module.exports = {
  uploadVehicles,
  getVehicle,
};
