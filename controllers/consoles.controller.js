const { Console } = require("../models/consoleModel");
const { Reviews } = require("../models/reviewsModel");
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const createConsole = catchAsync(async (req, res, next) => {
  const { name, company } = req.body;

  const newConsole = await Console.create({ name, company });

  res.status(200).json({
    status: "success",
    data: { newConsole },
  });
});

const getAllConsoles = catchAsync(async (req, res, next) => {
  const consoles = await Console.findAll({
    where: { status: "active" },
    include: { model: Reviews },
  });

  res.status(200).json({
    status: "success",
    data: { consoles },
  });
});

const updateConsoles = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { console } = req;

  await console.updte({ name });

  res.status(200).json({
    status: "success",
    data: { console },
  });
});

const deleteConsole = catchAsync(async (req, res, next) => {
  const { console } = req;

  await console.updte({ status: "deleted" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  createConsole,
  getAllConsoles,
  updateConsoles,
  deleteConsole,
};
