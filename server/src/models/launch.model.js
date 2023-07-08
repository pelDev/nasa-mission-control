const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Mission 1",
  rocket: "Rocket MSI",
  target: "Mars",
  launchDate: new Date("December 28, 2030"),
  destination: "Kepler-442 b",
  customers: ["NASA", "Mobilearnings"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;

  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["NASA", "Mobilearnings"],
      upcoming: true,
      success: true,
    })
  );

  return launches.get(latestFlightNumber);
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
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
};
