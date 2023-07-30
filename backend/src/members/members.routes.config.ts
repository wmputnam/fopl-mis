import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import { body } from "express-validator";
import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import membersController from "../controllers/members.controller";
import membersMiddleware from "./middleware/members.middleware";
import { ExpressValidator } from "express-validator";
// import debug from "debug";

// const debugLog: debug.IDebugger = debug("members");


export class MembersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MembersRoutes');
  }
  configureRoutes(): express.Application {

    this.app.route(`/members`)
      .get(membersController.listMembers)
      .post(
        // membersMiddleware.validateRequiredMemberBodyFields,
        body('email').normalizeEmail({ gmail_remove_subaddress: true }).isEmail(),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        membersMiddleware.validateSameEmailDoesntExist,
        membersController.createMember
      );

    this.app.param('memberId', membersMiddleware.extractMemberId);

    this.app.route(`/members/:memberId`)
      .all(membersMiddleware.validateMemberExists)
      .get(membersController.getMemberById)
      .delete(membersController.removeMember);

    this.app.put(`/members/:memberId`, [
      // membersMiddleware.validateRequiredMemberBodyFields,
      body('email').isEmail(),
      body('firstName').isString(),
      body('lastName').isString(),
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      membersMiddleware.validateMemberExists,
      membersMiddleware.validateSameEmailBelongToSameMember,
      membersController.put
    ]);

    this.app.patch(`/members/:memberId`, [
      // membersMiddleware.validateRequiredMemberBodyFields,
      body('email').isEmail(),
      body('firstName').isString(),
      body('lastName').isString(),
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      // membersMiddleware.validatePatchEmail,
      membersController.patch
    ]);

    return this.app;
  }
}