const axios = require("axios");

const config = require("../config/config");
const launchesDb = require("./launch.mongo");
const planetsDb = require("./planet.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

async function populateLaunches() {
  console.log("Downloading launch data...");

  const response = await axios.post(`${config.spaceXUrl}/launches/query`, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log("Problem downloading launch data");
    throw new Error("Problem downloading launch data");
  }

  const launchDocs = response.data.docs;

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc.payloads || [];

    const customers = payloads.flatMap((payload) => {
      return payload.customers;
    });

    const launch = {
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      rocket: launchDoc.rocket.name,
      launchDate: new Date(launchDoc.date_local),
      upcoming: launchDoc.upcoming,
      success: launchDoc.success,
      customers,
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);

    await saveLaunch(launch);
  }
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  console.log(firstLaunch);

  if (firstLaunch) {
    console.log("Launch data already downloaded...");
  } else {
    await populateLaunches();
  }
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDb.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
  await launchesDb.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function getAllLaunches(skip, limit) {
  return await launchesDb
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function scheduleNewLaunch(launch) {
  const planet = await planetsDb.findOne({ kepler_name: launch.target });

  if (!planet) {
    throw new Error("No matching planet found");
  }

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

async function findLaunch(filter) {
  return await launchesDb.findOne(filter);
}

async function existLaunchWithId(id) {
  return await findLaunch({ flightNumber: id });
}

async function abortLaunchById(id) {
  const aborted = await launchesDb.updateOne(
    { flightNumber: id },
    {
      success: false,
      upcoming: false,
    }
  );

  return aborted.modifiedCount === 1;
}

module.exports = {
  loadLaunchData,
  scheduleNewLaunch,
  getAllLaunches,
  existLaunchWithId,
  abortLaunchById,
};
