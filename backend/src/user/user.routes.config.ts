import express from "express";
// import { ExpressValidator } from "express-validator";
import debug from "debug";
import { body } from "express-validator";
import { bodyValidationMiddleware } from "../common/index.js";
import { CommonRoutesConfig } from "../common/index.js";
import { userController } from "../controllers/index.js";
// import { membersMiddleware } from "./index.js";

const log: debug.IDebugger = debug("user-routes");


export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    log("constructing UserRoutes");
    super(app, 'UserRoutes');
  }

  configureRoutes(): express.Application {
    log("configuring routes")

    /* jscpd:ignore-start */
    this.app.route(`/v1/user/login`)
      .post(
        userController.loginAction
      );
    /* jscpd:ignore-end */

    /* jscpd:ignore-start */
    this.app.route(`/v1/user/logout`)
      .post(
        userController.logoutAction
      );
    /* jscpd:ignore-end */

    /* jscpd:ignore-start */
    this.app.route(`/v1/user/info`)
      .get(
        userController.userInfoAction
      );
    /* jscpd:ignore-end */
    return this.app;
  }
}