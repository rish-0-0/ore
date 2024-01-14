const { QueryExecutor } = require("./QueryExecutor");

class Model {
  constructor (connectionMgr, {
    tableName = this.constructor.name
  } = {}) {
    this.connectionMgr = connectionMgr;
    this.tableName = tableName;
  }

  async findAll () {
    return new QueryExecutor(this.connectionMgr, "findAll", `SELECT * FROM ${this.tableName};`);
  }

  async findOne () {
    return new QueryExecutor(this.connectionMgr, "findOne", `SELECT * FROM ${this.tableName} LIMIT 1 ORDER BY ID;`);
  }

  async insertOne (object) {
    const cols = Object.keys(object).sort();
    const row = cols.reduce((acc, curr) => acc.push(object[curr]), []);
    return new QueryExecutor(
      this.connectionMgr,
      "insertOne",
      `INSERT INTO ${this.tableName} (${cols.map(col => `"${col}"`).join()}) VALUES (${row.map(cell => `'${cell}'`).join()})`
    );
  }

  async bulkInsert () {

  }

  async deleteOne () {

  }

  async bulkDelete () {

  }

  async update () {

  }
}

module.exports = { Model };
