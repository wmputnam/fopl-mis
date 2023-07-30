import debug from "debug";
import express from "express";
import { FieldValidationError, validationResult } from "express-validator";

const log: debug.IDebugger = debug('app:body-validation-middleware');

class BodyValidationMiddleware {
  verifyBodyFieldsErrors(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let errsString = "";
      errsString = errors.array()
        .map((entry) => (`${entry.msg}${entry.type === 'field' ? " -- " + entry.path : ""}`))
        .join(", ");
      log(errsString);
      return res.status(400).send({ errors: `${errsString}` });
    }
    next();
  }
}
export default new BodyValidationMiddleware();