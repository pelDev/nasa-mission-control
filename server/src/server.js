const http = require("http");

const app = require("./app");
const { loadPlanetsData } = require("./models/planet.model");
const { mongoConnect } = require("./services/mongo");
const { loadLaunchData } = require("./models/launch.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
