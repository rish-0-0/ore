const { Model } = require("./src/lib/Model");
const getConnectionManager = require("./src/lib/Adapter");
const { PostgresConnectionManager } = require("./src/lib/ConnectionManager");

module.exports = {
  Model,
  getConnectionManager,
  PostgresConnectionManager
};
