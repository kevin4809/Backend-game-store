const express = require("express");

const {
  createConsole,
  getAllConsoles,
  updateConsoles,
  deleteConsole,
} = require("../controllers/consoles.controller");

const { consoleExist } = require("../middlewares/console.middleware");

const { protectSession } = require("../middlewares/auth.middlewares");

const consoleRoutes = express.Router();

consoleRoutes.get("/", getAllConsoles);

consoleRoutes.use(protectSession);

consoleRoutes.post("/", createConsole);

consoleRoutes.patch("/:id", consoleExist, updateConsoles);

consoleRoutes.delete("/:id", consoleExist, deleteConsole);

module.exports = { consoleRoutes };
