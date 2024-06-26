import express from "express";
import {membersService} from "../../services/index.js";
import debug from "debug";
import { RestErrorBody } from "../../common/index.js";

const log: debug.IDebugger = debug('app:members-middleware');

export class MembersMiddleware {
  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body?.email !== undefined && req.body.email !== "") {
      log(`validateSameEmailDoesntExist ${req.body.email}`);
      const member = await membersService.getMemberByEmail(req.body.email);
      log(`validateSameEmailDoesntExist ${member}`);
      if (member) {
        const errBody: RestErrorBody = { error: ['member already exists with provided email -- email'] }
        res.status(400).send(errBody);
      } else {
        next();
      }
    } else {
      next();
    }
  }
  async validateSameEmailBelongToSameMember(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body?.email !== undefined && req.body.email !== "") {
      const member = await membersService.getMemberByEmail(req.body.email);
      if (member && member._id === req.params.memberId) {
        next()
      } else {
        const errBody: RestErrorBody = { error: ['email supplied for the member different -- email'] }
        res.status(400).send(errBody);
      }
    } else {
      next()
    }
  }
  validatePatchEmail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (req.body.email) {
      log('validating email')
      this.validateSameEmailDoesntExist(req, res, next);
    } else {
      next();
    }
  }

  async validateMemberExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    const member = await membersService.readById(req.params.memberId);
    if (member) {
      next();
    } else {
      res.status(404).send({
        error: [`Member "${req.params.memberId}" not found -- memberId`]
      })
    }
  }

  extractMemberId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    req.body.id = req.params.memberId;
    next();
  }

}


