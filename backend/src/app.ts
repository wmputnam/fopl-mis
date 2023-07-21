import express, { NextFunction } from "express";
import * as http from "http";

import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { MembersRoutes } from "./members/members.routes.config";
import debug from "debug";
import mongooseService from "./common/services/mongoose.service";


const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3030;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

app.use(express.json());
app.use(cors());


const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
    ,)
};
if (!process.env.DEBUG) {
  loggerOptions.meta = false;
  if (typeof global.it === 'function') {
    loggerOptions.level = 'http'; // squelch entirely for non-debug runs
  }
}
app.use(expressWinston.logger(loggerOptions));
const m = mongooseService.getMongoose();

routes.push(new MembersRoutes(app));

const runningMessage = `Server running on http://localhost:${port}<br>\nMongoose is ${m.connection.readyState}`;
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});

server.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName}`);
  });
  console.log(runningMessage);
  debugLog(runningMessage);
})

export default app;
