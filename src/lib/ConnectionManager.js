const { Pool } = require("pg");

// singleton
globalThis.pgConnectionMgr = null;

// abstract class
class ConnectionManager {
  // Classes which extend this one will be singletons
  constructor(configuration) {
    if (!configuration) {
      throw new TypeError(`Invalid configuration of type ${typeof configuration} provided`);
    }
    this.connections = new Map();
  }

  // abstract method
  async query (identifier, queryObj, additionalOptions, transaction) {

  }

  // abstract method
  async transactionBegin () {

  }

  // abstract method
  async transactionCommit () {

  }

  // abstract method
  async transactionRollback () {

  }
}


class PostgresConnectionManager extends ConnectionManager {
  constructor(configuration) {
    super(configuration);
    if (globalThis.pgConnectionMgr) {
      throw new ReferenceError(`Only one instance of ${this.constructor.name} is allowed`);
    }

    Object.entries(configuration)
      .forEach(([key, config]) => {
        this.connections.set(key, new Pool(config));
      })
  }

  // abstract method
  async query (identifier, queryObj, additionalOptions, transaction) {
    if (transaction != null) {
      await client.query(queryObj, additionalOptions);
      return;
    }
    // find the associated pool
    const connection = this.connections.get(identifier);
    
    // await pool.query()
    return await connection.query(queryObj, additionalOptions);
  }

  // abstract method
  async transactionBegin (identifier) {
    const client = await this.connections.get(identifier).connect();
    await client.query("BEGIN");
    return client;
  }

  // abstract method
  async transactionCommit (client) {
    await client.query("COMMIT");
    await client.release();
  }

  // abstract method
  async transactionRollback (client) {
    await client.query("ROLLBACK");
    await client.release();
  }
}

module.exports = {PostgresConnectionManager}