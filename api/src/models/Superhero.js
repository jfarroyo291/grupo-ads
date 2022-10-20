const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "superhero",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
      },
      intelligence: {
        type: DataTypes.INTEGER,
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      power: {
        type: DataTypes.INTEGER,
      },
      combat: {
        type: DataTypes.INTEGER,
      },
      location: {
        type: DataTypes.STRING,
      },
      vehicle: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      image: {
        type: DataTypes.STRING,
      },
      /* createdDB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }, */
    },
    {
      timestamps: false,
    }
  );
};
