const express = require("express");

const { httpGetAllLaunches } = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.route("/").get(httpGetAllLaunches);

module.exports = launchesRouter;
