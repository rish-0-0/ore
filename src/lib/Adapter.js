const { POSTGRES_CONNECTION_MANAGER_KEY } = require("../constants");
const { PostgresConnectionManager } = require("./ConnectionManager");

// abstract class
class Adapter {
  dialect = null;

  constructor (config) {
    this.config = config;
  }

  // abstract method
  get instance () { return null; }
}

class NodePostgresAdapter extends Adapter {
  get instance () {
    if (globalThis[POSTGRES_CONNECTION_MANAGER_KEY]) {
      return globalThis[POSTGRES_CONNECTION_MANAGER_KEY];
    }
    const pgConnectionManager = new PostgresConnectionManager(this.config);
    globalThis[POSTGRES_CONNECTION_MANAGER_KEY] = pgConnectionManager;
    Object.freeze(globalThis[POSTGRES_CONNECTION_MANAGER_KEY]);
    // set the dialect
    this.dialect = "postgres";
    return pgConnectionManager;
  }
}

function getConnectionManager (dialect, config) {
  if (dialect === "postgres") {
    return new NodePostgresAdapter(config).instance;
  }
  throw new ReferenceError(`No adapter config available for ${dialect}`);
}

module.exports = getConnectionManager;
