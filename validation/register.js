const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.first_name = validText(data.first_name) ? data.first_name : "";
  data.last_name = validText(data.last_name) ? data.last_name : "";
  data.email = validText(data.email) ? data.email : "";
  data.username = validText(data.username) ? data.username : "";
  data.password = validText(data.password) ? data.password : "";

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First name is required";
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (!Validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = "Username must be between 3 and 30 chars";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.username = "Password must be between 6 and 30 chars";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
