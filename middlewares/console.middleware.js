// Models
const { Console } = require("../models/consoleModel");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const consoleExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const console = await Console.findOne({
    where: { id },
  });

  // If console doesn't exist, send error message
  if (!console) {
    return next(new AppError("console not found", 404));
  }

  // req.anyPropName = 'anyValue'
  req.console = console;
  next();
});

module.exports = {
  consoleExist,
};
