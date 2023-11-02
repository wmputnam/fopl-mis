import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug('app:mongoose-service');
const DEFAULT_SCHEME = "mongodb:";
const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = "27017";
const DEFAULT_DATABASE = "api-db";
const DEFAULT_DATABASE_TABLE = "members";

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 5000,
  };
  private dbServerScheme: string;
  private dbServerHost: string;
  private dbServerPort: string;
  private dbDatabase: string;
  private dbTable: string;
  constructor() {
    this.dbServerScheme = DEFAULT_SCHEME;
    this.dbServerHost = DEFAULT_HOST;
    this.dbServerPort = DEFAULT_PORT
    this.dbDatabase = DEFAULT_DATABASE;
    this.dbTable = DEFAULT_DATABASE_TABLE;

    const envDbConfig = process.env.FOPLMIS_DB;
    if (envDbConfig !== undefined && envDbConfig !== null && envDbConfig !== "") {
      const dbConfigParts = envDbConfig.split("/");
      // validate dbConfigParts
      // expecting env value to be scheme://somehost:someport/somepath
      // [0] to be in form scheme: as in mongodb:
      // [1] to be empty string due to //
      // [2] to be in the form somehost:someport as in localhost:27017
      // [3] to be in the form somepath as in api-db
      // TODO make allowances for the route to the servive to be longer
      if (dbConfigParts.length === 4) {
        const schemeRegex = new RegExp(/[a-z]+:/);
        const hostPortRegex = new RegExp(/[a-zA-z0-9.~_-]+:\d+/);
        const hostNoPortRegex = new RegExp(/[a-zA-z0-9.~_-]+/);

        const schemeTestMatches = schemeRegex.exec(dbConfigParts[0]);
        const schemeTest = schemeTestMatches && schemeTestMatches[0] === dbConfigParts[0];
        const dblSlashTest = dbConfigParts[1] === "";
        const hostPortHasPort = dbConfigParts[2].indexOf(':') >= 0;
        const hostPortTestMatches = hostPortHasPort ? hostPortRegex.exec(dbConfigParts[2]) : hostNoPortRegex.exec(dbConfigParts[2])
        const hostPortTest = hostPortTestMatches && hostPortTestMatches[0] === dbConfigParts[2]
        const pathTest = dbConfigParts[3] !== "";

        if (schemeTest) {
          this.dbServerScheme = dbConfigParts[0];
        }
        if (hostPortTest) {
          if (hostPortHasPort) {
            const indx = dbConfigParts[2].indexOf(':')
            this.dbServerHost = dbConfigParts[2].slice(0, indx);
            this.dbServerPort = dbConfigParts[2].slice(indx + 1);
          } else {
            this.dbServerHost = dbConfigParts[2];
          }
        }
        if (pathTest) {
          this.dbDatabase = dbConfigParts[3]
        }
      }
    }

    log(`envDbConfig: ${envDbConfig}, scheme: ${this.dbServerScheme}, host:${this.dbServerHost}, port: ${this.dbServerPort}, path: ${this.dbDatabase}`)
    // process.exit()
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }
  connectWithRetry = () => {
    log('Attempting MongoDB connection (will retry if needed)');

    const connectionUrl = `${this.dbServerScheme}//${this.dbServerHost}:${this.dbServerPort}/${this.dbDatabase}`;
    log(`connectionUrl ${connectionUrl}`);
    mongoose
      .connect(connectionUrl,
        this.mongooseOptions)
      .then(() => {
        log(`MongoDB connected - ${connectionUrl}`);
      })
      .catch((err) => {
        const retrySeconds = 5;
        log(`MongoDb connection unsuccessful (will retry #${++this.count} after ${retrySeconds}): `, err);
        setTimeout(this.connectWithRetry, retrySeconds * 1000)
      });
  };
}
export default new MongooseService();