const { PostgresConnectionManager } = require("./ConnectionManager");

// abstract class
class Adapter {
  constructor (adapter, config) {
    this.adapter = adapter;
    this.config = config;
  }

  // abstract method
  get instance () { return null; }
}

class NodePostgresAdapter extends Adapter {
  get instance () {
    if (globalThis.pgConnectionMgr) {
      return globalThis.pgConnectionMgr;
    }
    const pgConnectionManager = new PostgresConnectionManager(this.config);
    globalThis.pgConnectionMgr = pgConnectionManager;
    Object.freeze(globalThis.pgConnectionMgr);
    return pgConnectionManager;
  }
}

function getConnectionManager (adapter, config) {
  if (adapter === "postgres") {
    return new NodePostgresAdapter(adapter, config).instance;
  }
  throw new ReferenceError(`No adapter config available for ${adapter}`);
}

module.exports = getConnectionManager;
