const { StatusCodes } = require("http-status-codes");

const AppErrors = require("./error-handler");
const e = require("express");

class ValidationError extends AppErrors {
  constructor(error) {
    let errName = error.name;
    let explanation = [];
    // error.errors.forEach((err) => {
    //   explanation.push(err.message;
    // });
    error.errors.forEach((err) => {
      explanation.push(err.message);
    });

    super(errName, "Validation Error", explanation, StatusCodes.BAD_REQUEST);
  }
}

module.exports = ValidationError;
