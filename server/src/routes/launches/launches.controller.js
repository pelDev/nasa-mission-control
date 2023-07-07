const { getAllLaunches, addNewLaunch } = require("../../models/launch.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launchBody = req.body;

  if (
    !launchBody.mission ||
    !launchBody.target ||
    !launchBody.launchDate ||
    !launchBody.rocket
  ) {
    return res.status(422).json({ error: "Missing required launch property" });
  }

  if (isNaN(new Date(launchBody.launchDate))) {
    return res.status(422).json({ error: "Invalid launch date" });
  }

  const launch = addNewLaunch({
    ...launchBody,
    launchDate: new Date(launchBody.launchDate),
  });

  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
