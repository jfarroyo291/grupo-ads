const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { uploadSuperheroes } = require("./src/controllers/superheroController");
const { uploadVehicles } = require("./src/controllers/vehicleController");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    uploadSuperheroes();
    uploadVehicles();
  });
});
