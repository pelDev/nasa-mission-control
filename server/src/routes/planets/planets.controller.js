const planets = require("../../models/Planets.model");

const getAllPlanets = (req, res) => {
  return res.status(200).json(planets);
};

module.exports = {
  getAllPlanets,
};
