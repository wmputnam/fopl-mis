import {CommonRoutesConfig} from "./common.routes.config"
import { MongooseService } from "./services/mongoose.service";
import { type RestErrorBody } from "./interface/RestErrorBody"
import { BodyValidationMiddleware } from "./middleware/body.validation.middleware"
import {type CRUD} from "./interface/crud.interface";
const bodyValidationMiddleware = new BodyValidationMiddleware();

const mongooseService = new MongooseService();

export {
  bodyValidationMiddleware,
  mongooseService,
  CommonRoutesConfig,
  type RestErrorBody,
  type CRUD,
}