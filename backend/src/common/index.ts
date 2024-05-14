import {CommonRoutesConfig} from "./common.routes.config.js";
import { MongooseService } from "./services/mongoose.service.js";
import { type RestErrorBody } from "./interface/RestErrorBody.js";
import { BodyValidationMiddleware } from "./middleware/body.validation.middleware.js";
import {type CRUD} from "./interface/crud.interface.js";
const bodyValidationMiddleware = new BodyValidationMiddleware();

const mongooseService = new MongooseService();

export {
  bodyValidationMiddleware,
  mongooseService,
  CommonRoutesConfig,
  type RestErrorBody,
  type CRUD,
}