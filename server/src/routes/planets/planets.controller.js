const { getAllPlanets } = require("../../models/planet.model");

const httpGetAllPlanets = (req, res) => {
  return res.status(200).json(getAllPlanets());
};

module.exports = {
  httpGetAllPlanets,
};
