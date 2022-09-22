const { db, DataTypes } = require("../utils/database.util");

const GamesInConsoles = db.define("gamesInConsoles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  consoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = { GamesInConsoles };
