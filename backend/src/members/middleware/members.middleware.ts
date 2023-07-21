import express from "express";
import membersService from "../../services/members.service";
import debug from "debug";

const log: debug.IDebugger = debug('app:members-middleware');

class MembersMiddleware {
  // async validateRequiredMemberBodyFields(
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) {
  //   if( req.body && req.body.firstName && req.body.lastName && req.body.email) {
  //     next();
  //   } else {
  //     res.status(400).send({
  //       error: `Missing required field(s) in [firstName, lastName,email]`
  //     });
  //   }
  // }
  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const member = await membersService.getMemberByEmail(req.body.email);
    if( member ) {
      res.status(400).send({
        error: `member already exists with proved email`
      });
     } else {
      next();
    }
  }
  async validateSameEmailBelongToSameMember(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const member = await membersService.getMemberByEmail(req.body.email);
    if( member && member._id === req.params.memberId ) {
      next()
    } else {
       res.status(400).send({
         error: `invalid email`
       });
    }
  }
  validatePatchEmail = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (req.body.email) {
      log('validating email')
      this.validateSameEmailDoesntExist(req,res,next);
    } else {
      next();
    }
  }

  async validateMemberExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ):Promise<any> {
    const member = await membersService.readById(req.params.memberId);
    if (member) {
      next();
    } else {
      res.status(404).send({
        error:`Member ${req.params.memberId} not found`
      })
    }
  }

  extractMemberId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ):void {
    req.body.id = req.params.memberId;
    next();
  }
}

export default new MembersMiddleware();
