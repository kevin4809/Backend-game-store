const express = require("express");


const gameRoutes = express.Router();

//controllers

const {
  createGame,
  getAllGames,
  updateGame,
  toDisableGame,
  newGameReview,
} = require("../controllers/games.controller");

//middlaweres
const { protectSession } = require("../middlewares/auth.middlewares");

gameRoutes.get("/", getAllGames);

gameRoutes.use(protectSession);

gameRoutes.post("/", createGame);

gameRoutes.patch("/:id", updateGame);

gameRoutes.delete("/:id", toDisableGame);

gameRoutes.post("/reviews/:gameId", newGameReview);

module.exports = { gameRoutes };
