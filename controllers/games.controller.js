const { Games } = require("../models/gamesModel");
const { GamesInConsoles } = require("../models/gamesInConsoleModel");
const { Console } = require("../models/consoleModel");
const { Reviews } = require("../models/reviewsModel");
const { catchAsync } = require("../utils/catchAsync.util");

const createGame = catchAsync(async (req, res, next) => {
  const { title, genre, consoleId } = req.body;

  const newGame = await Games.create({ title, genre });

  await GamesInConsoles.create({ consoleId, gameId: newGame.id });

  res.status(200).json({
    status: "success",
    data: { newGame },
  });
});

const getAllGames = catchAsync(async (req, res, next) => {
  const getGames = await Games.findAll({
    where: { status: "active" },
    include: [{ model: Reviews }, { model: Console }],
  });

  res.status(200).json({
    status: "success",
    data: { getGames },
  });
});

const updateGame = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  const updateGame = await Games.findOne({ where: { id } });

  if (!updateGame) {
    return res.status(404).json({
      status: "error",
      message: "the game don't exist",
    });
  }

  await updateGame.update({ title });

  res.status(200).json({
    status: "success",
    data: { updateGame },
  });
});

const toDisableGame = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updateGame = await Games.findOne({ where: { id } });

  if (!updateGame) {
    return res.status(404).json({
      status: "error",
      message: "the game don't exist",
    });
  }

  await updateGame.update({ status: "cancelled" });

  res.status(200).json({
    status: "success",
    data: { updateGame },
  });
});

const newGameReview = catchAsync(async (req, res, next) => {
  const { comment } = req.body;
  const { gameId } = req.params;
  const { sessionUser } = req;

  const newReview = await Reviews.create({
    comment,
    userId: sessionUser.id,
    gameId: gameId,
  });

  res.status(200).json({
    status: "success",
    data: { newReview },
  });
});

module.exports = {
  createGame,
  updateGame,
  getAllGames,
  toDisableGame,
  newGameReview,
};
