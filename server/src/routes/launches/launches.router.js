const express = require("express");

const {
  httpGetAllLaunches,
  httpAddNewLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.route("/").get(httpGetAllLaunches).post(httpAddNewLaunch);

module.exports = launchesRouter;
