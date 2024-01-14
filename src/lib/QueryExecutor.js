class QueryExecutor {
  constructor (connectionMgr, method, query) {
    this.connectionManager = connectionMgr;
    this.method = method;
    this.query = query;
  }

  get query () { return this.query; }

  async run () { }
}

module.exports = { QueryExecutor };
