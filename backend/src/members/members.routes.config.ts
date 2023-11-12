import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import { body } from "express-validator";
import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import membersController from "../controllers/members.controller";
import membersMiddleware from "./middleware/members.middleware";
import { ExpressValidator } from "express-validator";
import debug from "debug";

const debugLog: debug.IDebugger = debug("members");


export class MembersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MembersRoutes');
  }
  configureRoutes(): express.Application {

    /* jscpd:ignore-start */
    this.app.route(`/members`)
      .get(membersController.listMembers)
      .post(
        body("firstName", "firstname is a required field").exists(),
        body("firstName", "firstname cannot be empty").isLength({ min: 1 }),
        body("lastName", "lastname is a required field").exists(),
        body("lastName", "lastname cannot be empty").isLength({ min: 1 }),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        membersMiddleware.validateSameEmailDoesntExist,
        membersController.createMember
      );
    /* jscpd:ignore-end */

    /* jscpd:ignore-start */
    this.app.route(`/v1/members`)
      .get(membersController.listMembersV1)
      .post(
        body("firstName", "firstname is a required field").exists(),
        body("firstName", "firstname cannot be empty").isLength({ min: 1 }),
        body("lastName", "lastname is a required field").exists(),
        body("lastName", "lastname cannot be empty").isLength({ min: 1 }),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        membersMiddleware.validateSameEmailDoesntExist,
        membersController.createMember
      );
    /* jscpd:ignore-end */

    this.app.route('/v1/reports/members/new')
      .get(membersController.listNewMembersV1)

    this.app.param('memberId', membersMiddleware.extractMemberId);

    this.app.route(`/members/:memberId`)
      .all(membersMiddleware.validateMemberExists)
      .get(membersController.getMemberById)
      .delete(membersController.removeMember);

    this.app.put(`/members/:memberId`, [
      body("firstName", "firstname is a required field").exists(),
      body("firstName", "firstname cannot be empty").isLength({ min: 1 }),
      body("lastName", "lastname is a required field").exists(),
      body("lastName", "lastname cannot be empty").isLength({ min: 1 }),
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      membersMiddleware.validateMemberExists,
      membersController.put
    ]);

    this.app.patch(`/members/:memberId`, [
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      membersController.patch
    ]);

    /**
     * request body: {
     *   status: {
     *     active?: boolean,
     *     postMail?: boolean,
     *     email?: boolean,
     *     newsletter?: 'email'|'post'|'none',
     *   }
     * }
     * 
     * response success body: {
     *  status: {
     *    active: true/false,
     *    postMail: true/false,
     *    email: true/false
     *    newsletter: 'email'|'post'|'none',
     *  }
     * }
     * response error body: {
     *  error: string[]
     */
    this.app.patch(`/members/:memberId/status`, [
      body('status', "status cannot be empty").isObject(),
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      membersMiddleware.validateMemberExists,
      membersController.patchStatus
    ]);

    return this.app;
  }
}