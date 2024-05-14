import debug from "debug";
import express from "express";
import { FieldValidationError, validationResult,ValidationError } from "express-validator";
import { type RestErrorBody } from "../../common/index.js";

const log: debug.IDebugger = debug('app:body-validation-middleware');

export const generateErrorBody = (validationErrors: ValidationError[]): RestErrorBody  => {
  const errorsArr: string[] = validationErrors
    .map((entry) => (`${entry.msg}${entry.type === 'field' ? " -- " + entry.path : ""}`));
  if (errorsArr.length > 0) {
    return { error: errorsArr };
  } else {
    return { error: []}
  }
}
export class BodyValidationMiddleware {
  verifyBodyFieldsErrors(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const errorBodyObj = generateErrorBody(validationResult(req).array());
    if (errorBodyObj.error.length > 0) {
      log(`error in request -- sending 400 -- ${JSON.stringify(errorBodyObj)}`);
      return res.status(400).send(errorBodyObj);
    }
    next();
  }
}
