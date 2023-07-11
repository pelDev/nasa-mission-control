const launchesDb = require("./launch.mongo");
const planetsDb = require("./planet.mongo");

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Mission 1",
  rocket: "Rocket MSI",
  target: "Mars",
  launchDate: new Date("December 28, 2030"),
  target: "Kepler-442 b",
  customers: ["NASA", "Mobilearnings"],
  upcoming: true,
  success: true,
};

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDb.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
  const planet = await planetsDb.findOne({ kepler_name: launch.target });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  await launchesDb.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

saveLaunch(launch);

async function getAllLaunches() {
  return await launchesDb.find({}, { _id: 0, __v: 0 });
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLauch = {
    ...launch,
    success: true,
    upcoming: true,
    flightNumber: newFlightNumber,
    customers: ["NASA", "Mobilearnings"],
  };

  await saveLaunch(newLauch);

  return newLauch;
}

function existLaunchWithId(id) {
  return launches.has(id);
}

function abortLaunchById(id) {
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  scheduleNewLaunch,
  getAllLaunches,
  existLaunchWithId,
  abortLaunchById,
};
