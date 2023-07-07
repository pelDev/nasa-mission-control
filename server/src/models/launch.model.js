const launches = new Map();

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

module.exports = {
  getAllLaunches,
};
