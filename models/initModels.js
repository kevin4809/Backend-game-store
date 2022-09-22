const { Console } = require("./consoleModel");
const { Games } = require("./gamesModel");
const { Reviews } = require("./reviewsModel");
const { User } = require("./user.model");

const initModels = () => {
  User.hasMany(Reviews, { foreignKey: "userId" });
  Reviews.belongsTo(User);

  Games.hasMany(Reviews, { foreignKey: "gameId" });
  Reviews.belongsTo(Games);

  Games.belongsToMany(Console, {
    through: "gamesInConsoles",
    foreignKey: "gameId",
  });
  Console.belongsToMany(Games, {
    through: "gamesInConsoles",
    foreignKey: "consoleId",
  });
};

module.exports = { initModels };
