import debug from "debug";
import express from "express";
import { FieldValidationError, validationResult } from "express-validator";
import { RestErrorBody } from "../../common/interface/RestErrorBody";

const log: debug.IDebugger = debug('app:body-validation-middleware');

class BodyValidationMiddleware {
  verifyBodyFieldsErrors(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const errorsArr: string[] = validationResult(req).array()
      .map((entry) => (`${entry.msg}${entry.type === 'field' ? " -- " + entry.path : ""}`));
    if (errorsArr.length > 0) {
      //   const errorsCombined = errors
      //     .map((entry) => (`${entry.msg}${entry.type === 'field' ? " -- " + entry.path : ""}`))
      //     .join(", ");
      //   log(errsString);
      log(`error array -- ${JSON.stringify(errorsArr)}`);
      const bodyObj: RestErrorBody = { error: errorsArr };
      log(`error in request -- sending 400 -- ${JSON.stringify(bodyObj)}`);
      return res.status(400).send(bodyObj);
    }
    next();
  }
}
export default new BodyValidationMiddleware();