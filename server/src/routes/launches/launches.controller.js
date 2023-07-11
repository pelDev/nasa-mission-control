const {
  getAllLaunches,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById,
} = require("../../models/launch.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  try {
    const launchBody = req.body;

    if (
      !launchBody.mission ||
      !launchBody.target ||
      !launchBody.launchDate ||
      !launchBody.rocket
    ) {
      return res
        .status(422)
        .json({ error: "Missing required launch property" });
    }

    if (isNaN(new Date(launchBody.launchDate))) {
      return res.status(422).json({ error: "Invalid launch date" });
    }

    const newLaunch = await scheduleNewLaunch({
      ...launchBody,
      launchDate: new Date(launchBody.launchDate),
    });

    return res.status(201).json(newLaunch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || "Something went wrong" });
  }
}

function httpAbortLaunch(req, res) {
  const { id } = req.params;

  if (!existLaunchWithId(Number(id))) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = abortLaunchById(Number(id));

  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
