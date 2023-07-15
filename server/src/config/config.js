const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const envValidation = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "production", "test")
      .required(),
    MONGO_URL: Joi.string().required(),
    SPACEX_URL: Joi.string().required(),
  })
  .unknown();

const { value: envVar, error } = envValidation
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  nodeEnv: envVar.NODE_ENV,
  mongoUrl: envVar.MONGO_URL,
  spaceXUrl: envVar.SPACEX_URL,
};
